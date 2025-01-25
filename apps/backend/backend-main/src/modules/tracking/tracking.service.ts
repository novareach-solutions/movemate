import { Injectable, OnModuleInit } from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class TrackingService implements OnModuleInit {
  private redisClient;

  onModuleInit(): void {
    this.redisClient = createClient({ url: "redis://localhost:6379" });
    this.redisClient.connect();
    setInterval(() => {
      const demoRiderId = "demo-rider";
      const location = { lat: Math.random() * 90, lng: Math.random() * 180 };
      this.redisClient.set(demoRiderId, JSON.stringify(location));
    }, 5000);
  }

  async updateLocation(
    riderId: string,
    lat: number,
    lng: number,
  ): Promise<{ riderId: string; lat: number; lng: number }> {
    const locationData = { riderId, lat, lng };
    await this.redisClient.set(riderId, JSON.stringify(locationData));
    return locationData;
  }

  async getRiderLocation(
    riderId: string,
  ): Promise<{ lat: number; lng: number } | null> {
    const data = await this.redisClient.get(riderId);
    return data ? JSON.parse(data) : null;
  }

  async notifyNearestRiders(
    _orderId: string,
    customerLoc: { lat: number; lng: number },
    riders: string[],
  ): Promise<string[]> {
    const sorted = await this.sortRidersByDistance(customerLoc, riders);
    for (const _rider of sorted) {
      // Hypothetical acceptance check
      // if (await this.riderAccepts(rider, orderId)) {
      //   this.assignOrder(orderId, rider);
      //   break;
      // }
    }
    return sorted;
  }

  async getNearbyRiders(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<{ riderId: string; distance: number }[]> {
    const keys = await this.redisClient.keys("*rider*");
    const results = [];
    for (const key of keys) {
      const location = await this.getRiderLocation(key);
      if (location) {
        const dist = this.distance({ lat, lng }, location);
        if (dist <= radius) {
          results.push({ riderId: key, distance: dist });
        }
      }
    }
    return results.sort((a, b) => a.distance - b.distance);
  }

  private async sortRidersByDistance(
    customerLoc: { lat: number; lng: number },
    riders: string[],
  ): Promise<string[]> {
    const array = [];
    for (const rider of riders) {
      const loc = await this.getRiderLocation(rider);
      if (loc) {
        const dist = this.distance(customerLoc, loc);
        array.push({ rider, dist });
      }
    }
    array.sort((a, b) => a.dist - b.dist);
    return array.map((o) => o.rider);
  }

  private distance(
    p1: { lat: number; lng: number },
    p2: { lat: number; lng: number },
  ): number {
    const R = 6371;
    const dLat = this.deg2rad(p2.lat - p1.lat);
    const dLng = this.deg2rad(p2.lng - p1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.deg2rad(p1.lat)) *
        Math.cos(this.deg2rad(p2.lat)) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
