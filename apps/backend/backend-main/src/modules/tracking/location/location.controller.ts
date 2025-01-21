// import { Body, Controller, Get, Param,Post } from '@nestjs/common';

// import { LocationService } from './location.service';
// import { AssignOrderDto,UpdateLocationDto } from './location.types';

// @Controller('tracking')
// export class LocationController {
//   constructor(private readonly locationService: LocationService) {}

//   @Post('update-location')
//   async updateLocation(@Body() body: UpdateLocationDto) {
//     const location = await this.locationService.updateLocation(body);
//     return { message: 'Location updated successfully', data: location };
//   }

//   @Get('location/:riderId')
//   async getLocation(@Param('riderId') riderId: string) {
//     const location = await this.locationService.getLocation(riderId);
//     if (!location) {
//       return { message: 'Rider not found' };
//     }
//     return { data: location };
//   }

//   @Post('assign-order')
//   async assignOrder(@Body() body: AssignOrderDto) {
//     const riderId = await this.locationService.assignNearestRider(body);
//     if (!riderId) {
//       return { message: 'No riders available' };
//     }
//     return { assignedToRiderId: riderId };
//   }
// }
