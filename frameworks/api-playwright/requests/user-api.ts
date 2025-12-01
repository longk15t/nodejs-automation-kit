import { BaseApi } from './base-api';
import { APIRequestContext } from '@shared/fixtures/fixture';

export class UserApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }
}