import { APIRequestContext, APIResponse } from '@shared/fixtures/fixture';
import logger from '@shared/utils/logger';

export class BaseApi {
  public requestContext: APIRequestContext;
  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async printResponse(res: APIResponse): Promise<void> {
    try {
      logger.info(JSON.stringify(await res.json(), null, 2));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If response.json() fails, it's likely not valid JSON, so print as text
      logger.info(await res.text());
    }
  }
}
