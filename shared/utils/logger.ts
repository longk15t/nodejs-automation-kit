import { loggerConfig } from '@shared/config/logger.config';

export class Logger {
  info(message: string, ...args: unknown[]) {
    if (loggerConfig.enabled) console.log(`[INFO] ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    if (loggerConfig.enabled) console.warn(`[WARN] ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]) {
    if (loggerConfig.enabled) console.error(`[ERROR] ${message}`, ...args);
  }
}

export const logger = new Logger();
