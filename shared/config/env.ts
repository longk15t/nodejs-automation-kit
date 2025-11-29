import path from "path";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "dev"}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export interface AppEnv {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  logLevel: string;
}

export const env: AppEnv = {
  baseUrl: process.env.BASE_URL ?? "",
  apiUrl: process.env.API_URL ?? "",
  timeout: Number(process.env.TEST_TIMEOUT ?? 30000),
  logLevel: process.env.LOG_LEVEL ?? "info",
};
