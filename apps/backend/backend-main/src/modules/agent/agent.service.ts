import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { DeleteResult, In, QueryRunner, UpdateResult } from "typeorm";

import { Agent } from "../../entity/Agent";
import { AgentDocument } from "../../entity/AgentDocument";
import { RequiredDocument } from "../../entity/RequiredDocument";
import { SendPackageOrder } from "../../entity/SendPackageOrder";
import { User } from "../../entity/User";
import { logger } from "../../logger";
import {
  AgentStatusEnum,
  AgentTypeEnum,
  ApprovalStatusEnum,
  OrderStatusEnum,
} from "../../shared/enums";
import { SendPackageAgentAcceptError } from "../../shared/errors/sendAPackage";
import {
  UserAccessDeniedError,
  UserAlreadyExistsError,
  UserInvalidDocumentError,
  UserNotFoundError,
} from "../../shared/errors/user";
import { AgentNotificationGateway } from "../../shared/gateways/agent.notification.gateway";
import { filterEmptyValues } from "../../utils/filter";
import { TokenService } from "../auth/utils/generateTokens";
import { dbReadRepo, dbRepo } from "../database/database.service";
import { MediaService } from "../media/media.service";
import { RedisService } from "../redis/redis.service";
import {
  DocumentError,
  TAgent,
  TAgentDocument,
  TAgentPartial,
} from "./agent.types";
import { radii } from "./agents.constants";

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly agentNotificationGateway: AgentNotificationGateway,
    private readonly tokenService: TokenService,
    private readonly mediaService: MediaService,
  ) {}

  async createAgent(
    agent: TAgent,
  ): Promise<{ agent: Agent; accessToken: string; refreshToken: string }> {
    const { abnNumber, user } = agent;
    const queryRunner: QueryRunner =
      dbRepo(Agent).manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      this.logger.debug(
        `AgentService.createAgent: Checking if agent with ABN ${abnNumber} exists.`,
      );
      const existingAgent = await queryRunner.manager.findOne(Agent, {
        where: { abnNumber },
      });
      if (existingAgent) {
        this.logger.error(
          `AgentService.createAgent: Agent with ABN ${abnNumber} already exists.`,
        );
        throw new UserAlreadyExistsError(
          `Agent with ABN number ${abnNumber} already exists.`,
        );
      }

      this.logger.debug(
        `AgentService.createAgent: Checking if user with phone ${user.phoneNumber} or email ${user.email} exists.`,
      );
      const existingUserByPhone = await queryRunner.manager.findOne(User, {
        where: { phoneNumber: user.phoneNumber },
      });
      const existingUserByEmail = await queryRunner.manager.findOne(User, {
        where: { email: user.email },
      });

      if (existingUserByPhone || existingUserByEmail) {
        this.logger.error(
          `AgentService.createAgent: User with phone ${user.phoneNumber} or email ${user.email} already exists.`,
        );
        throw new UserAlreadyExistsError(
          `User with phone number or email already exists.`,
        );
      }

      this.logger.debug(
        `AgentService.createAgent: Creating user and agent records.`,
      );
      const newUser = queryRunner.manager.create(User, user);
      const savedUser = await queryRunner.manager.save(User, newUser);

      const newAgent = queryRunner.manager.create(Agent, {
        agentType: agent.agentType,
        abnNumber: agent.abnNumber,
        vehicleMake: agent.vehicleMake,
        vehicleModel: agent.vehicleModel,
        vehicleYear: agent.vehicleYear,
        profilePhoto: agent.profilePhoto,
        status: AgentStatusEnum.OFFLINE,
        approvalStatus: ApprovalStatusEnum.PENDING,
        userId: savedUser.id,
      });

      const savedAgent = await queryRunner.manager.save(Agent, newAgent);

      const accessToken = this.tokenService.generateAccessToken(
        savedUser.id,
        savedUser.phoneNumber,
        savedUser.role,
      );
      const refreshToken = this.tokenService.generateRefreshToken(savedUser.id);

      this.logger.debug(
        `AgentService.createAgent: Agent with ID ${savedAgent.id} created successfully.`,
      );
      await queryRunner.commitTransaction();

      return { agent: savedAgent, accessToken, refreshToken };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`AgentService.createAgent: Error occurred - ${error}`);
      throw new InternalServerErrorException(
        `Failed to create agent: ${error}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getOngoingOrder(agentId: number): Promise<SendPackageOrder | null> {
    return await dbReadRepo(SendPackageOrder).findOne({
      where: {
        agentId,
        status: In([
          OrderStatusEnum.ACCEPTED,
          OrderStatusEnum.IN_PROGRESS,
          OrderStatusEnum.PICKEDUP_ORDER,
        ]),
      },
      relations: ["pickupLocation", "dropLocation", "customer"],
    });
  }
  async getAgentById(agentId: number): Promise<Agent> {
    this.logger.debug(
      `AgentService.getAgentById: Fetching agent with ID ${agentId}.`,
    );
    const agent = await dbReadRepo(Agent).findOne({
      where: { id: agentId },
      relations: ["user"],
    });

    if (!agent) {
      this.logger.error(
        `AgentService.getAgentById: Agent with ID ${agentId} not found.`,
      );
      throw new UserNotFoundError(`Agent not found for ID ${agentId}`);
    }

    return agent;
  }

  async getAllAgents(): Promise<Agent[]> {
    this.logger.debug(`AgentService.getAllAgents: Fetching all agents.`);
    return await dbReadRepo(Agent).find({ relations: ["user"] });
  }

  async updateAgentProfile(
    agentId: number,
    updateAgent: TAgentPartial,
    isAdmin: boolean = false,
  ): Promise<UpdateResult> {
    this.logger.debug(
      `AgentService.updateAgentProfile: Updating agent ID ${agentId}.`,
    );
    const agent = await dbReadRepo(Agent).findOne({ where: { id: agentId } });

    if (!agent) {
      this.logger.error(
        `AgentService.updateAgentProfile: Agent with ID ${agentId} not found.`,
      );
      throw new UserNotFoundError(`Agent with ID ${agentId} not found.`);
    }

    if (!isAdmin && agent.approvalStatus !== ApprovalStatusEnum.APPROVED) {
      logger.error(
        `AgentService.setAgentStatus: Cannot update. Agent ID ${agentId} not approved.`,
      );
      throw new UserAccessDeniedError("Cannot update. Agent is not approved.");
    }

    const filteredUpdateAgent = filterEmptyValues(updateAgent);
    if (!isAdmin) {
      delete filteredUpdateAgent.approvalStatus;
    }

    this.logger.debug(
      `AgentService.updateAgentProfile: Update data - ${JSON.stringify(filteredUpdateAgent)}.`,
    );
    return await dbRepo(Agent).update(agentId, filteredUpdateAgent);
  }

  async deleteAgent(agentId: number): Promise<DeleteResult> {
    this.logger.debug(
      `AgentService.deleteAgent: Deleting agent with ID ${agentId}.`,
    );
    return await dbRepo(Agent).softDelete(agentId);
  }

  async submitDocument(
    agentId: number,
    document: TAgentDocument,
  ): Promise<TAgentDocument> {
    this.logger.debug(
      `AgentService.submitDocument: Submitting document for agent ID ${agentId}.`,
    );

    const existingDoc = await dbReadRepo(AgentDocument).findOne({
      where: { agentId },
    });

    if (existingDoc) {
      logger.debug(
        `AgentService.submitDocument: Document already exists for agent ID ${agentId}. Replacing it.`,
      );

      try {
        existingDoc.name = document.name;
        existingDoc.description = document.description;
        existingDoc.url = document.url;
        existingDoc.expiry = document.expiry || null;

        const updatedDocument = await dbRepo(AgentDocument).save(existingDoc);

        logger.debug(
          `AgentService.submitDocument: Document ${document.name} updated successfully for agent ID ${agentId}.`,
        );

        return {
          name: updatedDocument.name,
          description: updatedDocument.description,
          url: updatedDocument.url,
        };
      } catch (error) {
        const key = this.extractKeyFromUrl(document.url);
        if (key) {
          await this.mediaService.deleteFile(key);
        }
        logger.error(
          `AgentService.submitDocument: Failed to update document for agent ID ${agentId}. Error: ${error}`,
        );
        throw new InternalServerErrorException(
          "An error occurred while updating the document.",
          error,
        );
      }
    }

    try {
      const newDocument = dbRepo(AgentDocument).create({
        name: document.name,
        description: document.description,
        url: document.url,
        agentId: agentId,
        expiry: document.expiry || null,
      });

      const savedDocument = await dbRepo(AgentDocument).save(newDocument);

      logger.debug(
        `AgentService.submitDocument: Document ${document.name} saved successfully for agent ID ${agentId}.`,
      );

      return {
        name: savedDocument.name,
        description: savedDocument.description,
        url: savedDocument.url,
      };
    } catch (error) {
      const key = this.extractKeyFromUrl(document.url);
      if (key) {
        await this.mediaService.deleteFile(key);
      }
      logger.error(
        `AgentService.submitDocument: Failed to save document ${document.name} for agent ID ${agentId}. Error: ${error}`,
      );
      throw new InternalServerErrorException(
        "An error occurred while saving the document.",
        error,
      );
    }
  }

  async removeDocument(agentId: number, documentId: number): Promise<void> {
    this.logger.debug(
      `AgentService.removeDocument: Removing document ID ${documentId} for agent ID ${agentId}.`,
    );
    const document = await dbReadRepo(AgentDocument).findOne({
      where: { id: documentId, agentId },
    });

    if (!document) {
      this.logger.error(
        `AgentService.removeDocument: Document ID ${documentId} not found.`,
      );
      throw new UserNotFoundError(`Document with ID ${documentId} not found.`);
    }

    await dbRepo(AgentDocument).delete(documentId);
    this.logger.debug(
      `AgentService.removeDocument: Document ID ${documentId} removed for agent ID ${agentId}.`,
    );
  }

  async getAgentDocuments(agentId: number): Promise<AgentDocument[]> {
    const documents = await dbReadRepo(AgentDocument).find({
      where: { agentId },
    });
    return documents;
  }

  async setAgentStatus(
    agentId: number,
    status: AgentStatusEnum,
  ): Promise<UpdateResult | { errors: DocumentError[] }> {
    this.logger.debug(
      `AgentService.setAgentStatus: Setting status for agent ID ${agentId} to ${status}.`,
    );
    if (status === AgentStatusEnum.ONLINE) {
      const documents = await this.getAgentDocuments(agentId);
      const unapprovedDocs = documents.filter(
        (doc) => doc.approvalStatus !== ApprovalStatusEnum.APPROVED,
      );
      if (unapprovedDocs.length > 0) {
        const errors = unapprovedDocs.map((doc) => ({
          id: "document",
          heading: `${doc.name} Not ${doc.approvalStatus}`,
          text: `Your ${doc.name} is ${doc.approvalStatus.toLowerCase()}. Please reupload.`,
        }));
        return { errors };
      }
    }

    this.logger.debug(
      `AgentService.setAgentStatus: Updating status in database for agent ID ${agentId}.`,
    );
    return await dbRepo(Agent).update(agentId, { status });
  }

  async updateAgentLocation(
    agentId: number,
    latitude: number,
    longitude: number,
  ): Promise<void> {
    logger.debug(`Updating location for agent ID ${agentId}`);
    const agent = await this.getAgentById(agentId);

    if (agent.approvalStatus !== ApprovalStatusEnum.APPROVED) {
      logger.error(
        `AgentService.setAgentStatus: Cannot update location. Agent ID ${agentId} not approved.`,
      );
      throw new UserAccessDeniedError(
        "Cannot update location. Agent is not approved.",
      );
    }

    if (!longitude || !latitude || isNaN(latitude) || isNaN(longitude)) {
      throw new InternalServerErrorException(
        "Invalid latitude or longitude values.",
      );
    }

    if (!agentId || isNaN(agentId)) {
      throw new InternalServerErrorException("Invalid agentId.");
    }

    await this.redisService
      .getGeneralClient()
      .geoadd("agents:locations", longitude, latitude, `agent:${agentId}`);
    await this.redisService.set(
      `agent:${agentId}:status`,
      AgentStatusEnum.ONLINE,
      "EX",
      3600,
    );
  }

  async getNearbyAgents(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<{ agentId: number; distance: number }[]> {
    this.logger.debug(
      `AgentService.getNearbyAgents: Fetching agents within ${radiusKm} km of (${latitude}, ${longitude}).`,
    );
    const radiusMeters = radiusKm * 1000;
    const results = (await this.redisService
      .getGeneralClient()
      .georadius(
        "agents:locations",
        longitude,
        latitude,
        radiusMeters,
        "m",
        "WITHDIST",
        "ASC",
      )) as [string, string][];
    this.logger.debug(
      `AgentService.getNearbyAgents: Found ${results.length} agents within ${radiusKm} km.`,
    );
    return results.map((result) => ({
      agentId: parseInt(result[0].split(":")[1], 10),
      distance: parseFloat(result[1]),
    }));
  }

  async assignRider(
    pickupLatitude: number,
    pickupLongitude: number,
    orderId: string,
  ): Promise<number | null> {
    try {
      logger.debug(
        `Assigning rider for order ID ${orderId} at location (${pickupLatitude}, ${pickupLongitude})`,
      );

      const orderIdNum = parseInt(orderId, 10);
      if (isNaN(orderIdNum)) {
        logger.error(`Invalid orderId received: ${orderId}`);
        throw new InternalServerErrorException("Invalid order ID provided.");
      }

      const order = await dbReadRepo(SendPackageOrder).findOne({
        where: { id: orderIdNum },
        relations: ["pickupLocation", "dropLocation"],
      });

      if (!order) {
        logger.error(`Order not found for order ID ${orderId}`);
        throw new UserNotFoundError(`Order with ID ${orderId} not found.`);
      }

      if (order.agentId) {
        logger.warn(
          `Order ${orderId} already assigned to agent ${order.agentId}`,
        );
        throw new SendPackageAgentAcceptError(
          `This Order cannot be assigned as it is already accepted`,
        );
      }

      const pickupAddress = order.pickupLocation?.addressLine1 || "N/A";
      const dropAddress = order.dropLocation?.addressLine1 || "N/A";
      const estimatedDistance = order.estimatedDistance || 0;
      const estimatedTime = order.estimatedTime || "00:00:00";

      const notifiedAgents = new Set<number>();

      for (const { km, limit } of radii) {
        logger.debug(
          `Searching for agents within ${km} km for order ID ${orderId}`,
        );

        const currentOrder = await dbReadRepo(SendPackageOrder).findOne({
          where: { id: orderIdNum },
        });

        if (currentOrder?.agentId) {
          logger.info(
            `Order ${orderId} already accepted by agent ${currentOrder.agentId}`,
          );
          return currentOrder.agentId;
        }

        const nearbyAgents = await this.getNearbyAgents(
          pickupLatitude,
          pickupLongitude,
          km,
        );

        logger.debug(
          `Found ${nearbyAgents.length} nearby agents within ${km} km for order ${orderId}`,
        );

        const availableAgents = await Promise.all(
          nearbyAgents.map(async (agent) => {
            if (notifiedAgents.has(agent.agentId)) {
              logger.info(
                `Agent ${agent.agentId} already notified for order ${orderId}`,
              );
              return null;
            }

            const status = await this.redisService.get(
              `agent:${agent.agentId}:status`,
            );

            if (status === AgentStatusEnum.ONLINE) {
              logger.debug(
                `Agent ${agent.agentId} is ONLINE and eligible for order ${orderId}`,
              );
              return agent;
            } else {
              logger.debug(
                `Agent ${agent.agentId} is NOT ONLINE for order ${orderId}`,
              );
              return null;
            }
          }),
        ).then((results) => results.filter((agent) => agent !== null));

        logger.debug(
          `Available agents for order ${orderId}: ${JSON.stringify(
            availableAgents,
          )}`,
        );

        const selectedAgents = availableAgents.slice(0, limit);
        logger.info(
          `Notifying ${selectedAgents.length} agents for order ${orderId}`,
        );

        if (selectedAgents.length > 0) {
          selectedAgents.forEach((agent) => notifiedAgents.add(agent.agentId));

          selectedAgents.forEach((agent) => {
            logger.debug(
              `Notifying agent ${agent.agentId} for order ${orderId}`,
            );
            this.agentNotificationGateway.sendMessageToAgent(
              agent.agentId,
              "newRequest",
              {
                orderId,
                pickupAddress,
                dropAddress,
                estimatedDistance,
                estimatedTime,
              },
            );
          });
        } else {
          logger.warn(
            `No agents available to notify within ${km} km for order ${orderId}`,
          );
        }

        logger.debug(
          `Waiting for acceptance for order ${orderId} after notifying agents within ${km} km`,
        );
        const assignedAgentId = await this.waitForAcceptance(orderId, 40000);

        if (assignedAgentId) {
          logger.info(`Order ${orderId} accepted by agent ${assignedAgentId}`);
          return assignedAgentId;
        } else {
          logger.warn(
            `No agent accepted order ${orderId} within ${km} km radius`,
          );
        }
      }

      logger.warn(
        `No agents accepted order ${orderId} after checking all radii`,
      );
      return null;
    } catch (error) {
      logger.error(`Error in assignRider for order ${orderId}:`, error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async acceptOrder(orderId: string, agentId: number): Promise<void> {
    this.logger.debug(
      `AgentService.acceptOrder: Agent ID ${agentId} is accepting order ID ${orderId}.`,
    );
    await this.setAgentStatus(agentId, AgentStatusEnum.BUSY);

    const acceptanceData = { orderId, agentId };
    this.logger.debug(
      `AgentService.acceptOrder: Publishing acceptance data to Redis for order ID ${orderId}.`,
    );
    await this.redisService
      .getGeneralClient()
      .publish(`acceptance:${orderId}`, JSON.stringify(acceptanceData));

    // Optionally notify other agents that the order has been taken
    // logger.debug(
    //   `AgentService.acceptOrder: Notifying other agents that order ID ${orderId} is taken by agent ID ${agentId}.`,
    // );
    // this.agentNotificationGateway.sendMessageToRoom(
    //   "agents",
    //   "ORDER_TAKEN",
    //   { orderId, agentId },
    // );
  }

  async createRequiredDocument(createRequiredDocumentDto: {
    name: string;
    description?: string;
    agentType: AgentTypeEnum;
    isRequired: boolean;
    isExpiry: boolean;
  }): Promise<RequiredDocument> {
    const { name, description, agentType, isRequired, isExpiry } =
      createRequiredDocumentDto;

    logger.debug(
      `AgentService.createRequiredDocument: Checking if document with name ${name} already exists for agent type ${agentType}.`,
    );

    const existingDocument = await dbReadRepo(RequiredDocument).findOne({
      where: { name, agentType },
    });

    if (existingDocument) {
      logger.error(
        `AgentService.createRequiredDocument: Document with name ${name} already exists for agent type ${agentType}.`,
      );
      throw new UserAlreadyExistsError(
        `Document with name ${name} already exists for agent type ${agentType}.`,
      );
    }

    logger.debug(
      `AgentService.createRequiredDocument: Creating new required document.`,
    );

    const newDocument = dbRepo(RequiredDocument).create({
      name,
      description,
      agentType,
      isRequired,
      isExpiry,
    });

    const savedDocument = await dbRepo(RequiredDocument).save(newDocument);

    logger.debug(
      `AgentService.createRequiredDocument: Required document with ID ${savedDocument.id} created successfully.`,
    );
    return savedDocument;
  }

  async updateDocumentApprovalStatus(
    agentId: number,
    documentId: number,
    approvalStatus: ApprovalStatusEnum,
  ): Promise<void> {
    if (!["APPROVED", "REJECTED"].includes(approvalStatus)) {
      throw new UserInvalidDocumentError("Invalid approval status provided.");
    }

    const document = await dbReadRepo(AgentDocument).findOne({
      where: { id: documentId, agentId },
    });

    if (!document) {
      throw new UserNotFoundError(
        `Document with ID ${documentId} not found for agent ID ${agentId}.`,
      );
    }

    document.approvalStatus = approvalStatus;
    await dbRepo(AgentDocument).save(document);
  }

  private extractKeyFromUrl(fileUrl: string): string {
    const urlParts = fileUrl.split("/");
    return urlParts[urlParts.length - 1];
  }

  private waitForAcceptance(
    orderId: string,
    timeoutMs: number,
  ): Promise<number | null> {
    return new Promise((resolve) => {
      const subscriber = this.redisService.getSubscriberClient();
      const channel = `acceptance:${orderId}`;

      const onMessage = (msgChannel: string, message: string): void => {
        if (msgChannel !== channel) {
          return;
        }

        try {
          const data = JSON.parse(message);
          if (data.orderId === orderId && typeof data.agentId === "number") {
            logger.debug(
              `waitForAcceptance: Received acceptance from agent ID ${data.agentId} for order ID ${orderId}.`,
            );
            clearTimeout(timeoutHandle);
            subscriber.removeListener("message", onMessage);
            void subscriber.unsubscribe(channel).catch((err) => {
              logger.error(
                `waitForAcceptance: Failed to unsubscribe from ${channel}: ${err}`,
              );
            });
            resolve(data.agentId);
          }
        } catch (err) {
          logger.error(
            `waitForAcceptance: Error parsing message on ${channel}: ${err}`,
          );
        }
      };

      subscriber.on("message", onMessage);

      // Handle the Promise returned by subscribe
      subscriber
        .subscribe(channel)
        .then(() => {
          logger.debug(`waitForAcceptance: Subscribed to ${channel}.`);
        })
        .catch((err) => {
          logger.error(
            `waitForAcceptance: Failed to subscribe to ${channel}: ${err}`,
          );
          subscriber.removeListener("message", onMessage);
          resolve(null);
        });

      logger.debug(
        `waitForAcceptance: Waiting for acceptance for order ID ${orderId} with timeout of ${timeoutMs} ms.`,
      );

      const timeoutHandle = setTimeout(() => {
        logger.debug(
          `waitForAcceptance: Timeout reached for order ID ${orderId}.`,
        );
        subscriber.removeListener("message", onMessage);
        void subscriber.unsubscribe(channel).catch((err) => {
          logger.error(
            `waitForAcceptance: Failed to unsubscribe from ${channel} after timeout: ${err}`,
          );
        });
        resolve(null);
      }, timeoutMs);
    });
  }
}
