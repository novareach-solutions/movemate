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
import { DeleteResult, UpdateResult } from "typeorm";

import { SavedAddress } from "../../entity/SavedAddress";
import { User } from "../../entity/User";
import { Roles } from "../../shared/decorators/roles.decorator";
import {
  UserDeleteProfileByIdSwagger,
  UserGetByIdSwagger,
  UserGetProfileByIdSwagger,
  UserPatchProfileByIdSwagger,
  UserPostSignUpSwagger,
} from "../../shared/decorators/user/user.decorators";
import { UserRoleEnum } from "../../shared/enums";
import { UnauthorizedError } from "../../shared/errors/authErrors";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { OnboardingGuard } from "../../shared/guards/onboarding.guard";
import { RoleGuard } from "../../shared/guards/roles.guard";
import { IApiResponse, ICustomRequest } from "../../shared/interface";
import { UserService } from "./user.service";
import {
  TCreateSavedAddress,
  TCreateUser,
  TGetUserProfile,
  TUpdateSavedAddress,
  TUpdateUser,
} from "./user.types";

@ApiTags("User")
@Controller("user")
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Create a new user.
   * POST /user/signup
   */
  @Post("signup")
  @UserPostSignUpSwagger()
  async createUser(
    @Body() createUserDto: TCreateUser,
    @Req() request: ICustomRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IApiResponse<{ accessToken: string; userId: number }>> {
    createUserDto.role = UserRoleEnum.CUSTOMER;

    this.logger.debug(
      `UserController.createUser: Creating user with data: ${JSON.stringify(
        createUserDto,
      )}`,
    );

    const { accessToken, refreshToken, userId } =
      await this.userService.createUser(createUserDto);

    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>("ENVIRONMENT") === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    });

    return {
      success: true,
      message: "User created successfully.",
      data: { accessToken, userId },
    };
  }

  /**
   * Get the authenticated user's profile.
   * GET /user/me
   */
  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.CUSTOMER)
  @UserGetByIdSwagger()
  async getCurrentUser(
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<User>> {
    const userId = request.user.id;

    this.logger.debug(
      `UserController.getCurrentUser: Retrieving user profile for user ID: ${userId}`,
    );

    const user = await this.userService.getUserById(userId);

    if (!user) {
      this.logger.error(
        `UserController.getCurrentUser: User with ID ${userId} not found.`,
      );
      throw new UnauthorizedError(`User with ID ${userId} not found.`);
    }

    return {
      success: true,
      message: "User profile retrieved successfully.",
      data: user,
    };
  }

  /**
   * Get user profile by ID. This controller is for admin
   * GET /user/profile/:id
   */
  @Get("profile/:id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @UserGetProfileByIdSwagger()
  async getUserById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<IApiResponse<User>> {
    this.logger.debug(
      `UserController.getUserById: Retrieving user with ID ${id}`,
    );
    const user = await this.userService.getUserById(id);
    if (!user) {
      this.logger.error(
        `UserController.getUserById: User with ID ${id} not found.`,
      );
      throw new UnauthorizedError(`User with ID ${id} not found.`);
    }
    this.logger.log(
      `UserController.getUserById: User with ID ${id} retrieved successfully.`,
    );
    return {
      success: true,
      message: "User profile retrieved successfully.",
      data: user,
    };
  }

  /**
   * Get user profile by specific criteria.
   * POST /user/profile
   */
  @Post("profile")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @UserGetProfileByIdSwagger()
  async getUserProfile(
    @Body() getUserProfileDto: TGetUserProfile,
  ): Promise<IApiResponse<User>> {
    this.logger.debug(
      `UserController.getUserProfile: Retrieving user profile with data: ${JSON.stringify(
        getUserProfileDto,
      )}`,
    );
    const user = await this.userService.getUserProfile(getUserProfileDto);
    if (!user) {
      this.logger.error(
        `UserController.getUserProfile: User with criteria ${JSON.stringify(
          getUserProfileDto,
        )} not found.`,
      );
      throw new UnauthorizedError(`User not found.`);
    }
    this.logger.log(
      `UserController.getUserProfile: User profile retrieved successfully.`,
    );
    return {
      success: true,
      message: "User profile retrieved successfully.",
      data: user,
    };
  }

  /**
   * Get all users.
   * GET /user/list
   */
  @Get("list")
  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(UserRoleEnum.ADMIN)
  async getAllUsers(): Promise<IApiResponse<User[]>> {
    this.logger.debug(`UserController.getAllUsers: Retrieving all users.`);
    const users = await this.userService.getAllUsers();
    this.logger.log(
      `UserController.getAllUsers: All users retrieved successfully.`,
    );
    return {
      success: true,
      message: "All users retrieved successfully.",
      data: users,
    };
  }

  /**
   * Update user profile.
   * PUT /user/profile/:id
   */
  @Patch("profile/:id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @UserPatchProfileByIdSwagger()
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: TUpdateUser,
  ): Promise<IApiResponse<UpdateResult>> {
    this.logger.debug(
      `UserController.updateUser: Updating user with ID ${id} with data: ${JSON.stringify(
        updateUserDto,
      )}`,
    );
    const result = await this.userService.updateUser(id, updateUserDto);
    this.logger.log(
      `UserController.updateUser: User profile updated successfully for user ID ${id}.`,
    );
    return {
      success: true,
      message: "User profile updated successfully.",
      data: result,
    };
  }

  /**
   * Delete a user.
   * DELETE /user/profile/:id
   */
  @Delete("profile/:id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.ADMIN)
  @UserDeleteProfileByIdSwagger()
  async deleteUser(
    @Param("id", ParseIntPipe) id: string,
  ): Promise<IApiResponse<DeleteResult>> {
    this.logger.debug(`UserController.deleteUser: Deleting user with ID ${id}`);
    const result = await this.userService.deleteUser(id);
    this.logger.log(
      `UserController.deleteUser: User deleted successfully for user ID ${id}.`,
    );
    return {
      success: true,
      message: "User deleted successfully.",
      data: result,
    };
  }

  @Get("currentstatus")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.CUSTOMER)
  async getCurrentOrder(
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<{ order: any | null }>> {
    const userId = request.user.id;

    this.logger.debug(
      `UserController.getCurrentOrder: Checking ongoing orders for user ID: ${userId}`,
    );

    const ongoingOrder = await this.userService.getCurrentOrder(userId);

    if (ongoingOrder) {
      this.logger.log(
        `UserController.getCurrentOrder: Ongoing order found for user ID: ${userId}`,
      );
      return {
        success: true,
        message: "Ongoing order found.",
        data: { order: ongoingOrder },
      };
    } else {
      this.logger.log(
        `UserController.getCurrentOrder: No ongoing order found for user ID: ${userId}`,
      );
      return {
        success: true,
        message: "No ongoing order found.",
        data: { order: null },
      };
    }
  }

  @Post("address")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.CUSTOMER)
  async createAddress(
    @Body() createAddressDto: TCreateSavedAddress,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<SavedAddress>> {
    const userId = request.user.id;
    const address = await this.userService.createSavedAddress(
      userId,
      createAddressDto,
    );
    return {
      success: true,
      message: "Address created successfully.",
      data: address,
    };
  }

  @Patch("address/:id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.CUSTOMER)
  async updateAddress(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAddressDto: TUpdateSavedAddress,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<UpdateResult>> {
    const userId = request.user.id;
    const result = await this.userService.updateSavedAddress(
      userId,
      id,
      updateAddressDto,
    );
    return {
      success: true,
      message: "Address updated successfully.",
      data: result,
    };
  }

  @Delete("address/:id")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.CUSTOMER)
  async deleteAddress(
    @Param("id", ParseIntPipe) id: number,
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<DeleteResult>> {
    const userId = request.user.id;
    const result = await this.userService.deleteSavedAddress(userId, id);
    return {
      success: true,
      message: "Address deleted successfully.",
      data: result,
    };
  }

  @Get("address")
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoleEnum.CUSTOMER)
  async getAddresses(
    @Req() request: ICustomRequest,
  ): Promise<IApiResponse<SavedAddress[]>> {
    const userId = request.user.id;
    const addresses = await this.userService.getSavedAddresses(userId);
    return {
      success: true,
      message: "Addresses retrieved successfully.",
      data: addresses,
    };
  }
}
