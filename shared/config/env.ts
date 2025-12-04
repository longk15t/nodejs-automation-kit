import path from "path";
import dotenv from "dotenv";

const environmentName = process.env.NODE_ENV || "dev";
const envFile = `../../.env.${environmentName}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile), quiet: true });

export interface AppEnv {
  envName: string;
  baseUrl: string;
  apiUrl: string;
  graphQLUrl: string;
  timeout: number;
  logLevel: string;
}

export const env: AppEnv = {
  envName: environmentName,
  baseUrl: process.env.WEB_BASE_URL ?? "",
  apiUrl: process.env.REST_API_URL ?? "",
  graphQLUrl: process.env.GRAPHQL_URL ?? "",
  timeout: Number(process.env.TEST_TIMEOUT) * 1000,
  logLevel: process.env.LOG_LEVEL ?? "info",
};
