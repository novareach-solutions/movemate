import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";

import { LocationService } from "./location.service";
import {
  IAssignOrderDto,
  ILocationResponse,
  IUpdateLocationDto,
} from "./location.types";

@Controller("tracking")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post("update-location")
  async updateLocation(
    @Body() body: IUpdateLocationDto,
  ): Promise<{ message: string; data: ILocationResponse }> {
    try {
      const location = await this.locationService.updateLocation(body);
      return { message: "Location updated successfully", data: location };
    } catch (error) {
      throw new InternalServerErrorException(
        "Failed to update location",
        error,
      );
    }
  }

  @Get("location/:riderId")
  async getLocation(
    @Param("riderId") riderId: string,
  ): Promise<{ data: ILocationResponse } | { message: string }> {
    try {
      const location = await this.locationService.getLocation(riderId);
      if (!location) {
        throw new NotFoundException("Rider not found");
      }
      return { data: location };
    } catch (error) {
      throw new InternalServerErrorException("Failed to get location", error);
    }
  }

  @Post("assign-order")
  async assignOrder(
    @Body() body: IAssignOrderDto,
  ): Promise<{ assignedToRiderId?: string; message?: string }> {
    try {
      const riderId = await this.locationService.assignNearestRider(body);
      if (!riderId) {
        return { message: "No riders available" };
      }
      return { assignedToRiderId: riderId };
    } catch (error) {
      throw new InternalServerErrorException("Failed to assign order", error);
    }
  }
}
