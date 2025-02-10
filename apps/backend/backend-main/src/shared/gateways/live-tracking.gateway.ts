import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class LiveTrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket): void {
    //   console.log(`Client connected: ${client.id}`);
    client.emit("connection", {
      message: "Connected to Live Tracking Gateway",
    });
  }

  handleDisconnect(client: Socket): void {
    //   console.log(`Client disconnected: ${client.id}`);
    client.disconnect();
  }

  sendLocationUpdate(riderId: string, location: any): void {
    // Emit a location update event to all connected clients.
    this.server.emit("locationUpdate", { riderId, location });
  }
}
