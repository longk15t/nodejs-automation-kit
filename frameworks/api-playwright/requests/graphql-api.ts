import { env } from '@shared/config/env';
import { BaseApi } from './base-api';
import { APIRequestContext, APIResponse } from '@shared/fixtures/fixture';

export class GraphQLClientApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async send(query: string, variables?: Record<string, any>): Promise<APIResponse> {
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
}
