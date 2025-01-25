import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { TrackingService } from "./tracking.service";

@Controller("tracking")
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post("update-location/:riderId")
  async updateLocation(
    @Param("riderId") riderId: string,
    @Body() body: { lat: number; lng: number },
  ): Promise<{ riderId: string; lat: number; lng: number }> {
    return await this.trackingService.updateLocation(
      riderId,
      body.lat,
      body.lng,
    );
  }

  @Get("location/:riderId")
  async getLocation(
    @Param("riderId") riderId: string,
  ): Promise<{ lat: number; lng: number } | null> {
    return await this.trackingService.getRiderLocation(riderId);
  }

  @Post("notify-riders")
  async notifyRiders(
    @Body()
    body: {
      orderId: string;
      lat: number;
      lng: number;
      riders: string[];
    },
  ): Promise<string[]> {
    return await this.trackingService.notifyNearestRiders(
      body.orderId,
      { lat: body.lat, lng: body.lng },
      body.riders,
    );
  }

  @Get("nearby-riders")
  async getNearbyRiders(
    @Body() body: { lat: number; lng: number; radius: number },
  ): Promise<{ riderId: string; distance: number }[]> {
    return await this.trackingService.getNearbyRiders(
      body.lat,
      body.lng,
      body.radius,
    );
  }
}
