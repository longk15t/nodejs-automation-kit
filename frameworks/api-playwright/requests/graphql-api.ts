import { env } from '@shared/config/env';
import { BaseApi } from './base-api';
import { APIRequestContext, APIResponse } from '@shared/fixtures/fixture';

export class GraphQLClientApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async sendProducts(query: string, variables?: Record<string, unknown>): Promise<APIResponse> {
    const response = await this.requestContext.post(`${env.graphQLUrl}/content/clv6lwqu7000001w690st4vix/master`, {
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

  async sendPosts(query: string, variables?: Record<string, unknown>): Promise<APIResponse> {
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
