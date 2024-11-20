import {
  Controller,
  Post,
  Body,
  Res,
  Headers,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { UserRoleEnum } from 'src/shared/enums';
import { logger } from 'src/logger';
import { ApiResponse } from 'src/shared/interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('otp/request')
  async requestOtp(@Body('phoneNumber') phoneNumber: string): Promise<ApiResponse<null>> {
    logger.debug(`AuthController.requestOtp: Received OTP request for phoneNumber: ${phoneNumber}`);
    await this.authService.requestOtp(phoneNumber);
    logger.debug('AuthController.requestOtp: OTP sent successfully');

    return { success: true, message: 'OTP sent successfully.', data: null };
  }

  @Post('otp/verify')
  async verifyOtp(
    @Body() body: { phoneNumber: string; otp: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<null>> {
    const { phoneNumber, otp } = body;
    logger.debug(`AuthController.verifyOtp: Verifying OTP for phoneNumber: ${phoneNumber}`);
    const onboardingToken = await this.authService.signupInitiate(phoneNumber, otp);
    logger.debug('AuthController.verifyOtp: OTP verification successful, setting onboarding token header');
    res.setHeader('x-onboarding-token', onboardingToken);

    return { success: true, message: 'OTP verified successfully.', data: null };
  }

  @Post('login')
  async login(
    @Body() body: { phoneNumber: string; otp: string },
    @Headers('role') role: UserRoleEnum,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<null>> {
    const { phoneNumber, otp } = body;
    logger.debug(`AuthController.login: Login request for phoneNumber: ${phoneNumber}, role: ${role}`);
    const { accessToken, refreshToken } = await this.authService.login(phoneNumber, otp, role);
    logger.debug('AuthController.login: Login successful, setting access and refresh token cookies');

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMEMNT === 'production',
      maxAge: 60 * 60 * 1000, 
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMEMNT === 'production',
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    return { success: true, message: 'Login successful.', data: null };
  }

  @Post('refresh-token')
  async refreshToken(@Res({ passthrough: true }) res: Response, @Req() req: Request): Promise<ApiResponse<null>> {
    const refreshToken = req.cookies['refresh_token'];
 
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not found.');
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.authService.refreshToken(refreshToken);
    logger.debug('AuthController.refreshToken: Refresh token validated, setting new tokens in cookies');

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMEMNT === 'production',
      maxAge: 60 * 60 * 1000, 
    });
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMEMNT === 'production',
      maxAge: 60 * 60 * 24 * 7 * 1000, 
    });

    return { success: true, message: 'Tokens refreshed successfully.', data: null };
  }
}
