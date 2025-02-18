import {
  Body,
  Controller,
  ForbiddenException,
  Headers,
  Logger,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

import {
  AuthPostLoginSwagger,
  AuthPostOtpRequestSwagger,
  AuthPostOtpVerifySwagger,
  AuthPostRefreshTokenSwagger,
} from "../../shared/decorators/auth/auth.decorators";
import { UserRoleEnum } from "../../shared/enums";
import { IApiResponse } from "../../shared/interface";
import { AuthService } from "./auth.service";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post("otp/request")
  @AuthPostOtpRequestSwagger()
  async requestOtp(
    @Body("phoneNumber") phoneNumber: string,
  ): Promise<IApiResponse<null>> {
    this.logger.debug(
      `AuthController.requestOtp: Requesting OTP for ${phoneNumber}`,
    );
    await this.authService.requestOtp(phoneNumber);

    this.logger.log(
      `AuthController.requestOtp: OTP sent successfully to ${phoneNumber}`,
    );
    return { success: true, message: "OTP sent successfully.", data: null };
  }

  @Post("otp/verify")
  @AuthPostOtpVerifySwagger()
  async verifyOtp(
    @Body() body: { phoneNumber: string; otp: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { phoneNumber, otp } = body;
    this.logger.debug(`Verifying OTP for ${phoneNumber}`);

    const { status, accessToken, refreshToken, agentId, user } =
      await this.authService.verifyOtpAndLogin(phoneNumber, otp);

    if (user) {
      const responseData: {
        status: "existing_user" | "new_user";
        userId: number;
        accessToken: string;
        refreshToken: string;
        agentId?: number;
      } = {
        status,
        userId: user.id,
        accessToken,
        refreshToken,
      };

      if (agentId !== undefined) {
        responseData.agentId = agentId;
      }

      response.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: this.configService.get<string>("ENVIRONMENT") === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });

      response.json({
        success: true,
        message: "Login successful.",
        data: responseData,
      });
    } else {
      response.json({
        success: true,
        message: "New user detected.",
        data: { status },
      });
    }
  }

  @Post("login")
  @AuthPostLoginSwagger()
  async login(
    @Body() body: { phoneNumber: string; otp: string },
    @Query("role") role: UserRoleEnum,
    @Res() response: Response,
  ): Promise<void> {
    const { phoneNumber, otp } = body;
    const { accessToken, refreshToken, userId, agentId } =
      await this.authService.login(phoneNumber, otp, role);

    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>("ENVIRONMENT") === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    });

    this.logger.log(
      `AuthController.login: Login successful for ${phoneNumber}`,
    );
    response.json({
      success: true,
      message: "Login successful.",
      data: {
        accessToken,
        userId,
        ...(agentId !== undefined && { agentId }),
      },
    });
  }

  @Post("refresh-token")
  @AuthPostRefreshTokenSwagger()
  async refreshToken(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const refreshToken = request.cookies["refresh_token"];
    if (!refreshToken) {
      throw new ForbiddenException("Refresh token not found.");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    response.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>("ENVIRONMENT") === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    });

    this.logger.log(
      "AuthController.refreshToken: Tokens refreshed successfully",
    );

    response.json({
      success: true,
      message: "Tokens refreshed successfully.",
      data: { accessToken },
    });
  }
}
