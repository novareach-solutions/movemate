export interface IUpdateLocationDto {
  lat: number;
  lng: number;
  riderId: string;
}

export interface ILocationResponse {
  lat: number;
  lng: number;
  riderId: string;
  timestamp: string;
}

export interface IAssignOrderDto {
  pickupLocation: { lat: number; lng: number };
}
