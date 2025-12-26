import { env } from '@shared/config/env';
import { BaseApi } from './base-api';
import { APIRequestContext, APIResponse } from '@shared/fixtures/fixture';

export class PostsApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async send(query: string, variables?: Record<string, unknown>): Promise<APIResponse> {
    const response = await this.requestContext.post(`${env.postsApiUrl}/api`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        query,
        variables,
      },
    });

    return response;
  }
}
