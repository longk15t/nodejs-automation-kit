import { APIRequestContext, APIResponse } from '@shared/fixtures/fixture';

export class BaseApi {
  public requestContext: APIRequestContext;
  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async printResponse(res: APIResponse): Promise<void> {
    try {
      console.log(JSON.stringify(await res.json(), null, 2));
    } catch (error) {
      // If response.json() fails, it's likely not valid JSON, so print as text
      console.log(await res.text());
    }
  }
}
