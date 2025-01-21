// import { Injectable } from '@nestjs/common';
// // import { InjectRedis } from '@nestjs-modules/ioredis';
// import { Redis } from 'ioredis';

// // import { LiveTrackingGateway } from '../../shared/gateways';
// import { AssignOrderDto,LocationResponse, UpdateLocationDto } from './location.types';

// @Injectable()
// export class LocationService {
//   constructor(
//     @InjectRedis() private readonly redis: Redis,
//     private readonly liveTrackingGateway: LiveTrackingGateway
//   ) {}

//   async updateLocation(data: UpdateLocationDto): Promise<LocationResponse> {
//     const timestamp = new Date().toISOString();
//     const location = { ...data, timestamp };

//     // Store in Redis with 1-hour TTL
//     await this.redis.set(
//       `rider:${data.riderId}`,
//       JSON.stringify(location),
//       'EX',
//       3600
//     );

//     // Broadcast location update via WebSocket
//     this.liveTrackingGateway.sendLocationUpdate(data.riderId, location);

//     return location;
//   }

//   async getLocation(riderId: string): Promise<LocationResponse | null> {
//     const data = await this.redis.get(`rider:${riderId}`);
//     return data ? JSON.parse(data) : null;
//   }

//   async assignNearestRider(data: AssignOrderDto): Promise<string | null> {
//     const keys = await this.redis.keys('rider:*');
//     let nearestRider = null;
//     let shortestDistance = Infinity;

//     for (const key of keys) {
//       const riderData = JSON.parse(await this.redis.get(key));
//       const distance = this.calculateDistance(
//         data.pickupLocation,
//         { lat: riderData.lat, lng: riderData.lng }
//       );

//       if (distance < shortestDistance) {
//         shortestDistance = distance;
//         nearestRider = key.split(':')[1];
//       }
//     }

//     return nearestRider;
//   }

//   async findAvailableRiders(pickupLocation: { lat: number; lng: number }): Promise<string[]> {
//     const keys = await this.redis.keys('rider:*');
//     const availableRiders = [];

//     for (const key of keys) {
//       const riderData = JSON.parse(await this.redis.get(key));
//       if (riderData.status !== 'idle') continue;

//       const distance = this.calculateDistance(pickupLocation, {
//         lat: riderData.lat,
//         lng: riderData.lng
//       });

//       // Only notify riders within reasonable distance (e.g., 5km)
//       if (distance <= 5) {
//         availableRiders.push(key.split(':')[1]);
//       }
//     }

//     return availableRiders;
//   }

//   private calculateDistance(
//     loc1: { lat: number; lng: number },
//     loc2: { lat: number; lng: number }
//   ): number {
//     const R = 6371; // Earth's radius in km
//     const dLat = this.toRadians(loc2.lat - loc1.lat);
//     const dLng = this.toRadians(loc2.lng - loc1.lng);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(this.toRadians(loc1.lat)) *
//       Math.cos(this.toRadians(loc2.lat)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//     return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
//   }

//   private toRadians(degrees: number): number {
//     return degrees * (Math.PI / 180);
//   }
// }
