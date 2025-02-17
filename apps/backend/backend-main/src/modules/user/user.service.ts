import { Injectable, Logger } from "@nestjs/common";
import { DeleteResult, In, UpdateResult } from "typeorm";

import { SavedAddress } from "../../entity/SavedAddress";
import { SendPackageOrder } from "../../entity/SendPackageOrder";
import { User } from "../../entity/User";
import { OrderStatusEnum } from "../../shared/enums";
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../../shared/errors/user";
import { filterEmptyValues } from "../../utils/filter";
import { TokenService } from "../auth/utils/generateTokens";
import { dbReadRepo, dbRepo } from "../database/database.service";
import {
  TCreateSavedAddress,
  TCreateUser,
  TGetUserProfile,
  TUpdateSavedAddress,
  TUpdateUser,
} from "./user.types";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly tokenService: TokenService) {}

  /**
   * Create a new user.
   * @param createUserDto Data Transfer Object for creating a user.
   * @returns The created user entity.
   */
  async createUser(
    createUserDto: TCreateUser,
  ): Promise<{ accessToken: string; refreshToken: string; userId: number }> {
    const { email, phoneNumber, role } = createUserDto;

    const existingUser = await dbReadRepo(User).findOne({
      where: { email, phoneNumber },
    });

    if (existingUser) {
      this.logger.error(
        `UserService.createUser: User with email ${email} or phone number ${phoneNumber} already exists.`,
      );
      throw new UserAlreadyExistsError(
        `User with the provided email ${email} or phone number ${phoneNumber} already exists.`,
      );
    }

    const user: Pick<User, "id"> = await dbRepo(User).save(createUserDto);

    const accessToken = this.tokenService.generateAccessToken(
      user.id,
      phoneNumber,
      role,
    );
    const refreshToken = this.tokenService.generateRefreshToken(user.id);

    return { accessToken, refreshToken, userId: user.id };
  }

  /**
   * Get a user by ID.
   * @param id User ID.
   * @returns The user entity.
   */
  async getUserById(id: number): Promise<User> {
    return await dbReadRepo(User).findOneOrFail({ where: { id } });
  }

  /**
   * Get a user profile based on specific criteria.
   * @param getUserProfileDto Data Transfer Object for retrieving user profile.
   * @returns The user entity.
   */
  async getUserProfile(getUserProfileDto: TGetUserProfile): Promise<User> {
    const filteredInput = filterEmptyValues(getUserProfileDto);
    return await dbReadRepo(User).findOneOrFail({ where: filteredInput });
  }

  /**
   * Retrieve all users.
   * @returns An array of user entities.
   */
  async getAllUsers(): Promise<User[]> {
    return await dbReadRepo(User).find();
  }

  /**
   * Update a user's profile.
   * @param id User ID.
   * @param updateUserDto Data Transfer Object for updating user.
   * @returns The result of the update operation.
   */
  async updateUser(
    id: number,
    updateUserDto: TUpdateUser,
  ): Promise<UpdateResult> {
    const user = await dbReadRepo(User).findOne({ where: { id } });

    if (!user) {
      this.logger.error(
        `UserService.updateUser: User with ID ${id} not found.`,
      );
      throw new UserNotFoundError(`User with ID ${id} not found.`);
    }

    const filteredUpdateUser = filterEmptyValues(updateUserDto);
    this.logger.debug(
      `UserService.updateUser: Updating user with ID ${id} with data: ${JSON.stringify(
        filteredUpdateUser,
      )}`,
    );

    return await dbRepo(User).update(id, filteredUpdateUser);
  }

  /**
   * Delete a user.
   * @param id User ID.
   * @returns The result of the delete operation.
   */
  async deleteUser(id: string): Promise<DeleteResult> {
    this.logger.debug(`UserService.deleteUser: Deleting user with ID ${id}`);
    return await dbRepo(User).softDelete(id);
  }

  async getCurrentOrder(userId: number): Promise<SendPackageOrder | null> {
    this.logger.debug(
      `UserService.getCurrentOrder: Fetching ongoing order for user ID: ${userId}`,
    );

    const ongoingOrder = await dbReadRepo(SendPackageOrder).findOne({
      where: {
        customer: { id: userId },
        status: In([
          OrderStatusEnum.PENDING,
          OrderStatusEnum.ACCEPTED,
          OrderStatusEnum.IN_PROGRESS,
          OrderStatusEnum.PICKEDUP_ORDER,
        ]), // Use In operator here
      },
      relations: [
        "pickupLocation",
        "dropLocation",
        "customer",
        "agent",
        "report",
        "review",
      ],
    });

    return ongoingOrder;
  }

  async createSavedAddress(
    userId: number,
    createAddressDto: TCreateSavedAddress,
  ): Promise<SavedAddress> {
    const existing = await dbReadRepo(SavedAddress).findOne({
      where: { user: { id: userId }, title: createAddressDto.title },
    });
    if (existing) {
      throw new UserAlreadyExistsError(
        `Address with title ${createAddressDto.title} already exists for this user.`,
      );
    }
    const newAddress = dbRepo(SavedAddress).create({
      ...createAddressDto,
      user: { id: userId },
    });
    return await dbRepo(SavedAddress).save(newAddress);
  }

  async updateSavedAddress(
    userId: number,
    addressId: number,
    updateAddressDto: TUpdateSavedAddress,
  ): Promise<UpdateResult> {
    if (updateAddressDto.title) {
      const existing = await dbReadRepo(SavedAddress).findOne({
        where: { user: { id: userId }, title: updateAddressDto.title },
      });
      if (existing && existing.id !== addressId) {
        throw new UserAlreadyExistsError(
          `Address with title ${updateAddressDto.title} already exists for this user.`,
        );
      }
    }
    return await dbRepo(SavedAddress).update(
      { id: addressId, user: { id: userId } },
      updateAddressDto,
    );
  }

  async deleteSavedAddress(
    userId: number,
    addressId: number,
  ): Promise<DeleteResult> {
    return await dbRepo(SavedAddress).delete({
      id: addressId,
      user: { id: userId },
    });
  }

  async getSavedAddresses(userId: number): Promise<SavedAddress[]> {
    return await dbReadRepo(SavedAddress).find({
      where: { user: { id: userId } },
    });
  }
}
