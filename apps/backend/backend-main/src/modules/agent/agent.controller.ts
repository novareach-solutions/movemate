import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { UpdateResult } from "typeorm";

import { Agent } from "../../entity/Agent";
import { RequiredDocument } from "../../entity/RequiredDocument";
import { SendPackageOrder } from "../../entity/SendPackageOrder";
import {
  AgentDeleteDocumentSwagger,
  AgentGetProfileSwagger,
  AgentPatchProfileSwagger,
  AgentPatchStatusSwagger,
  AgentPostDocumentByIdSwagger,
  AgentSignUpSwagger,
  AgentUpdateLocationSwagger,
} from "../../shared/decorators/agents/agent.decorators";
import { Roles } from "../../shared/decorators/roles.decorator";
import {
  AgentStatusEnum,
  AgentTypeEnum,
  ApprovalStatusEnum,
  UserRoleEnum,
} from "../../shared/enums";
import { UnauthorizedError } from "../../shared/errors/authErrors";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { OnboardingGuard } from "../../shared/guards/onboarding.guard";
import { RoleGuard } from "../../shared/guards/roles.guard";
import { IApiResponse, ICustomRequest } from "../../shared/interface";
import { AgentService } from "./agent.service";
<<<<<<< Updated upstream
import { TAgent, TAgentDocument, TAgentPartial } from "./agent.types";
=======
import { DocumentError, TAgent, TAgentDocument, TAgentPartial } from "./agent.types";
import { AgentDocument } from "../../entity/AgentDocument";
>>>>>>> Stashed changes

@ApiTags("Agent")
@Controller("agent")
export class AgentController {
  private readonly logger = new Logger(AgentController.name);

  constructor(
    private readonly agentService: AgentService,
    private readonly configService: ConfigService,
  ) { }

  // *** Agent Sign Up, Status and List Specific Controllers ***
  @Post("signup")
  @AgentSignUpSwagger()
  async create(
    @Req() request: ICustomRequest,
    @Body() agent: TAgent,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IApiResponse<{ agent: Agent; accessToken: string }>> {
    this.logger.log(
      `AgentController.create: Attempting agent signup for phone number: ${agent.user.phoneNumber}`,
    );

    const {
      agent: createdAgent,
      accessToken,
      refreshToken,
    } = await this.agentService.createAgent(agent);

    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>("ENVIRONMENT") === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    });

    this.logger.log(
      `AgentController.create: Agent successfully created with ID: ${createdAgent.id}`,
    );

    return {
      success: true,
      message: "Agent created successfully.",
      data: { agent: createdAgent, accessToken },
    };
  }
  @Get("ongoingorder")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.AGENT)
  async getOngoingOrder(
    @Req() request: any,
  ): Promise<IApiResponse<SendPackageOrder | null>> {
    const agentId = request.user.agent?.id;

    const ongoingOrder = await this.agentService.getOngoingOrder(agentId);

    if (!ongoingOrder) {
      return {
        success: true,
        message: "No ongoing order found.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Ongoing order retrieved successfully.",
      data: ongoingOrder,
    };
  }

  @Get("profile")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.AGENT)
  @AgentGetProfileSwagger()
  async getOwnProfile(
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<Agent>> {
    const agentId = request.user.agent.id;
    this.logger.debug(
      `AgentController.getOwnProfile: Retrieving profile for agent ${agentId}`,
    );
    const agent = await this.agentService.getAgentById(agentId);
    this.logger.log(
      `AgentController.getOwnProfile: Profile for agent ${agentId} retrieved successfully.`,
      agent,
    );
    return {
      success: true,
      message: "Agent profile retrieved successfully.",
      data: agent,
    };
  }

  @Patch("profile")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.AGENT)
  @AgentPatchProfileSwagger()
  async updateOwnProfile(
    @Body() updateAgentPartial: TAgentPartial,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<UpdateResult>> {
    const agentId = request.user.agent.id;

    this.logger.debug(
      `AgentController.updateOwnProfile: Updating profile for agent ${agentId}`,
      {
        updatedFields: Object.keys(updateAgentPartial),
      },
    );

    const data = await this.agentService.updateAgentProfile(
      agentId,
      updateAgentPartial,
    );

    this.logger.log(
      `AgentController.updateOwnProfile: Profile for agent ${agentId} updated successfully.`,
      data,
    );
    return {
      success: true,
      message: "Agent profile updated successfully.",
      data,
    };
  }

  @Post("document")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.AGENT)
  async submitOwnDocument(
    @Body() submitDocumentDto: TAgentDocument,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<TAgentDocument>> {
    const agentId = request.user.agent.id;
    const document: TAgentDocument = {
      ...submitDocumentDto,
      agentId,
      url: submitDocumentDto.url,
    };
    const data = await this.agentService.submitDocument(agentId, document);
    return {
      success: true,
      message: "Document submitted successfully.",
      data,
    };
  }

  @Patch("status")
  @UseGuards(AuthGuard)
  @Roles(UserRoleEnum.AGENT)
  @AgentPatchStatusSwagger()
  async setOwnAgentStatus(
    @Body() body: { status: AgentStatusEnum },
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<UpdateResult | DocumentError[]>> {
    const { status } = body;
    const agentId = request.user.agent.id;
    this.logger.debug(`AgentController.setOwnAgentStatus: Setting status for agent ${agentId} to ${status}`);
    const result = await this.agentService.setAgentStatus(agentId, status);
    if ("errors" in result) {
      return {
        success: false,
        message: "Some documents are not approved.",
        data: result.errors,
      };
    }
    this.logger.log(`AgentController.setOwnAgentStatus: Status for agent ${agentId} set to ${status}.`, result);
    return {
      success: true,
      message: `Agent status updated to ${status}.`,
      data: result,
    };
  }



  @Get("profile/:id")
  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.ADMIN)
  async getAgentProfile(
    @Param("id", ParseIntPipe) agentId: number,
  ): Promise<IApiResponse<Agent>> {
    this.logger.debug(
      `AgentController.getAgentProfile: Retrieving profile for agent ${agentId}`,
    );
    const agent = await this.agentService.getAgentById(agentId);
    this.logger.log(
      `AgentController.getAgentProfile: Profile for agent ${agentId} retrieved successfully.`,
      agent,
    );
    return {
      success: true,
      message: "Agent profile retrieved successfully.",
      data: agent,
    };
  }

  @Patch("profile/:id")
  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.ADMIN)
  async updateAgentProfile(
    @Param("id", ParseIntPipe) agentId: number,
    @Body() updateAgentPartial: TAgentPartial,
  ): Promise<IApiResponse<UpdateResult>> {
    this.logger.debug(
      `AgentController.updateAgentProfile: Updating profile for agent ${agentId}`,
    );
    const isAdmin = true;
    const data = await this.agentService.updateAgentProfile(
      agentId,
      updateAgentPartial,
      isAdmin,
    );
    this.logger.log(
      `AgentController.updateAgentProfile: Profile for agent ${agentId} updated successfully.`,
      data,
    );
    return {
      success: true,
      message: "Agent profile updated successfully.",
      data,
    };
  }

  @Delete("document/:documentId")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.AGENT)
  @AgentDeleteDocumentSwagger()
  async removeOwnDocument(
    @Param("documentId", ParseIntPipe) documentId: number,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<null>> {
    const agentId = request.user.agent.id;
    this.logger.debug(
      `AgentController.removeOwnDocument: Removing document ${documentId} for agent ${agentId}`,
    );
    await this.agentService.removeDocument(agentId, documentId);

    this.logger.log(
      `AgentController.removeOwnDocument: Document ${documentId} for agent ${agentId} removed successfully.`,
    );
    return {
      success: true,
      message: "Document removed successfully.",
      data: null,
    };
  }

  @Post("document/:id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @AgentPostDocumentByIdSwagger()
  async submitAgentDocument(
    @Param("id", ParseIntPipe) agentId: number,
    @Body() submitDocumentDto: TAgentDocument,
  ): Promise<IApiResponse<TAgentDocument>> {
    this.logger.debug(
      `AgentController.submitAgentDocument: Submitting document for agent ${agentId}`,
    );
    const document: TAgentDocument = {
      ...submitDocumentDto,
      agentId,
    };
    const data = await this.agentService.submitDocument(agentId, document);

    this.logger.log(
      `AgentController.submitAgentDocument: Document for agent ${agentId} submitted successfully.`,
      data,
    );
    return {
      success: true,
      message: "Document submitted successfully.",
      data,
    };
  }

  // Seperate controller for updating document approval status for ADMIN role
  @Delete("document/:id/:documentId")
  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.ADMIN)
  async removeAgentDocument(
    @Param("id", ParseIntPipe) agentId: number,
    @Param("documentId", ParseIntPipe) documentId: number,
  ): Promise<IApiResponse<null>> {
    await this.agentService.removeDocument(agentId, documentId);
    return {
      success: true,
      message: "Document removed successfully.",
      data: null,
    };
  }

  // *** Other Controllers ***
  @Get("list")
  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.ADMIN)
  async getAllAgents(): Promise<IApiResponse<Agent[]>> {
    this.logger.debug(`AgentController.getAllAgents: Retrieving all agents.`);
    const agents = await this.agentService.getAllAgents();
    this.logger.log(
      `AgentController.getAllAgents: All agents retrieved successfully.`,
      agents,
    );
    return {
      success: true,
      message: "All agents retrieved successfully.",
      data: agents,
    };
  }

  @Patch("location")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.AGENT)
  @AgentUpdateLocationSwagger()
  async updateLocation(
    @Body() body: { latitude: number; longitude: number },
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<null>> {
    const agentId = request.user.agent.id;

    this.logger.debug(
      `AgentController.updateLocation: Updating location for agent ${agentId}`,
    );
    const { latitude, longitude } = body;
    await this.agentService.updateAgentLocation(agentId, latitude, longitude);

    this.logger.log(
      `AgentController.updateLocation: Location for agent ${agentId} updated successfully.`,
    );
    return {
      success: true,
      message: "Location updated successfully.",
      data: null,
    };
  }

  @Post("required-document")
  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.ADMIN)
  async createRequiredDocument(
    @Body()
    createRequiredDocumentDto: {
      name: string;
      description?: string;
      agentType: AgentTypeEnum;
      isRequired: boolean;
      isExpiry: boolean;
    },
  ): Promise<IApiResponse<RequiredDocument>> {
    const requiredDocument = await this.agentService.createRequiredDocument(
      createRequiredDocumentDto,
    );
    return {
      success: true,
      message: "Required document created successfully.",
      data: requiredDocument,
    };
  }

  @Patch(":agentId/document/:documentId/approval-status")
  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.ADMIN)
  async updateDocumentApprovalStatus(
    @Param("agentId", ParseIntPipe) agentId: number,
    @Param("documentId", ParseIntPipe) documentId: number,
    @Body() body: { approvalStatus: ApprovalStatusEnum },
  ): Promise<IApiResponse<null>> {
    const { approvalStatus } = body;

    // Call service method to update the document's approval status
    await this.agentService.updateDocumentApprovalStatus(
      agentId,
      documentId,
      approvalStatus,
    );

    return {
      success: true,
      message: `Document approval status updated to ${approvalStatus}.`,
      data: null,
    };
  }

  @Post("assign-rider/:orderId")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CUSTOMER)
  async assignRider(
    @Param("orderId") orderId: string,
    @Body() body: { pickupLatitude: number; pickupLongitude: number },
  ): Promise<IApiResponse<{ assignedAgentId: number | null }>> {
    const { pickupLatitude, pickupLongitude } = body;

    const assignedAgentId = await this.agentService.assignRider(
      pickupLatitude,
      pickupLongitude,
      orderId,
    );

    if (assignedAgentId) {
      return {
        success: true,
        message: `Rider assigned successfully.`,
        data: { assignedAgentId },
      };
    }

    return {
      success: false,
      message: `No rider could be assigned.`,
      data: { assignedAgentId: null },
    };
  }
}
