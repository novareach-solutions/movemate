import { Module } from "@nestjs/common";
import { OrderChatService } from "./orderChat.service";
import { OrderChatController } from "./orderChat.controller";

@Module({
    controllers: [OrderChatController],
    providers: [OrderChatService],
    exports: [OrderChatService],
})
export class OrderChatModule { }
