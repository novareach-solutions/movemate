import { ConfigService } from "@nestjs/config";
import * as winston from "winston";

const configService = new ConfigService();

export const logger = winston.createLogger({
  level:
    configService.get<string>("environment") === "production" ? "warn" : "info",
  format: winston.format.cli(),
  defaultMeta: { environment: configService.get<string>("environment") },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});
