import path from "path";
import dotenv from "dotenv";

const environmentName = process.env.NODE_ENV || "dev";
console.log(`Running tests on ${environmentName} environment`);
const envFile = `../../.env.${environmentName}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export interface AppEnv {
  envName: string;
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  logLevel: string;
}

export const env: AppEnv = {
  envName: environmentName,
  baseUrl: process.env.WEB_BASE_URL ?? "",
  apiUrl: process.env.API_BASE_URL ?? "",
  timeout: Number(process.env.TEST_TIMEOUT ?? 30000),
  logLevel: process.env.LOG_LEVEL ?? "info",
};
