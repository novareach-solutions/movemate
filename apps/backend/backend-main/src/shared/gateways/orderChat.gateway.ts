import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from "@nestjs/websockets";
  import { Socket } from "socket.io";
import { IOrderChatMessageInput, OrderChatService } from "../../modules/orderChat/orderChat.service";
  
  @WebSocketGateway({
    namespace: "order-chat",
    cors: { origin: "*" }, 
  })
  export class OrderChatGateway {
    constructor(private readonly orderChatService: OrderChatService) {}
  
    @SubscribeMessage("joinOrderRoom")
    async handleJoinOrderRoom(
      @MessageBody() data: { orderId: number },
      @ConnectedSocket() client: Socket
    ): Promise<void> {
      try {
        const roomId = `order:${data.orderId}`;
        await client.join(roomId);
        client.to(roomId).emit("userJoined", {
          orderId: data.orderId,
          userId: client.id,
          timestamp: new Date(),
        });
      } catch (error) {
        client.emit("error", {
          message: "Failed to join order room",
          error: error.message,
        });
      }
    }
  
    @SubscribeMessage("leaveOrderRoom")
    async handleLeaveOrderRoom(
      @MessageBody() data: { orderId: number },
      @ConnectedSocket() client: Socket
    ): Promise<void> {
      try {
        const roomId = `order:${data.orderId}`;
        await client.leave(roomId);
        client.to(roomId).emit("userLeft", {
          orderId: data.orderId,
          userId: client.id,
          timestamp: new Date(),
        });
      } catch (error) {
        client.emit("error", {
          message: "Failed to leave order room",
          error: error.message,
        });
      }
    }
  
    @SubscribeMessage("sendOrderMessage")
    async handleSendOrderMessage(
      @MessageBody() data: IOrderChatMessageInput,
      @ConnectedSocket() client: Socket
    ): Promise<void> {
      try {
        const message = await this.orderChatService.addMessage(data);
        const roomId = `order:${data.orderId}`;
        client.to(roomId).emit("newOrderMessage", message);
        client.emit("newOrderMessage", message);
      } catch (error) {
        client.emit("error", {
          message: "Failed to send order message",
          error: error.message,
        });
      }
    }
  
    @SubscribeMessage("typing")
    handleTyping(
      @MessageBody() data: { orderId: number; isTyping: boolean },
      @ConnectedSocket() client: Socket
    ): void {
      const roomId = `order:${data.orderId}`;
      client.to(roomId).emit("userTyping", {
        orderId: data.orderId,
        userId: client.id,
        isTyping: data.isTyping,
        timestamp: new Date(),
      });
    }
  }
  