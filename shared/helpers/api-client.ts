import { request, APIRequestContext } from '@playwright/test';
import { env } from '../config/env';

export class ApiClient {
  private context!: APIRequestContext;

  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: env.apiUrl,
    });
  }

  async get(path: string) {
    const res = await this.context.get(path);
    return res.json();
  }

  async post(path: string, data: unknown) {
    const res = await this.context.post(path, { data });
    return res.json();
  }

  async dispose() {
    await this.context.dispose();
  }
}
