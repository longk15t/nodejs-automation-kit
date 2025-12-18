import { env } from '@shared/config/env';
import { BaseApi } from './base-api';
import { APIRequestContext, APIResponse, request } from '@shared/fixtures/fixture';
import { Pet } from '../models/pet';

export class PetApi extends BaseApi {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async createContext(token?: string): Promise<void> {
    this.requestContext = await request.newContext({
      baseURL: `${env.apiUrl}`,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createPet(petData: Pet): Promise<APIResponse> {
    return this.requestContext.post('/v2/pet', {
      headers: { 'Content-Type': 'application/json' },
      data: petData,
    });
  }

  async getPet(petId: number): Promise<APIResponse> {
    return this.requestContext.get(`/v2/pet/${petId}`);
  }

  async updatePet(petData: Pet): Promise<APIResponse> {
    return this.requestContext.put('/v2/pet', {
      headers: { 'Content-Type': 'application/json' },
      data: petData,
    });
  }

  async deletePet(petId: number): Promise<APIResponse> {
    return this.requestContext.delete(`/v2/pet/${petId}`);
  }
}
