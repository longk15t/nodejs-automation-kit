import { env } from "./env";

export const loggerConfig = {
  level: env.logLevel,
  enabled: env.logLevel !== "off",
};
