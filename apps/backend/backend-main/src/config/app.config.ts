import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  corsOrigin:
    process.env.CORS_ORIGIN ||
    `http://localhost:${parseInt(process.env.PORT, 10) || 3000}/*`,
}));
