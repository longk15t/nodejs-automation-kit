import { env } from '@shared/config/env';
import { BaseApi } from './base-api';
import { APIRequestContext, request } from '@shared/fixtures/fixture';

export class PetApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async createContext(token?: any): Promise<void> {
    this.requestContext = await request.newContext({
      baseURL: `${env.apiUrl}`,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createPet(petData: any) {
    return this.requestContext.post('/v2/pet', {
      headers: { 'Content-Type': 'application/json' },
      data: petData,
    });
  }

  async getPet(petId: number) {
    return this.requestContext.get(`/v2/pet/${petId}`);
  }

  async updatePet(petData: any) {
    return this.requestContext.put('/v2/pet', {
      headers: { 'Content-Type': 'application/json' },
      data: petData,
    });
  }

  async deletePet(petId: number) {
    return this.requestContext.delete(`/v2/pet/${petId}`);
  }
}