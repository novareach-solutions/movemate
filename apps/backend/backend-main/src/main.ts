import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { CustomExceptionFilter } from "./errorFilter";

async function bootstrap(): Promise<void> {
  const logger = new Logger("Bootstrap");

  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "log", "verbose"],
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const docConfig = new DocumentBuilder()
    .setTitle("API Documentation of Vamoose")
    .setDescription("API endpoints for the Vamoose application")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  app.use(
    "/docs",
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  // Configure CORS
  app.enableCors({
    origin: configService.get<string>("app.corsOrigin"),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With","onboarding_token","role"],
  });
  app.use(cookieParser());
  // Configure WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(configService.get<number>("app.port") ?? 3000);

  logger.log(
    `🚩 CORS Origin is running on: ${configService.get<string>("app.corsOrigin")}`,
  );
  logger.log(
    `🚩 Application PORT is running on: ${configService.get<number>("app.port")}`,
  );
  logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
