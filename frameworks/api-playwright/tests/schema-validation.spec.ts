import { test, expect } from '@shared/fixtures/fixture';
import { PetSchema } from '../schemas/pet';

test.describe('Response schema validation test suite', () => {
  const createdPetId: number = Math.floor(1000000000 + Math.random() * 9000000000);

  test.beforeEach(async ({ petApi }) => {
    await petApi.createContext();
  });

  test('Check response schema when create new pet', async ({ petApi }) => {
    const newPet = {
      id: createdPetId,
      name: 'TestPet-' + Date.now(),
      photoUrls: ['http://example.com/photo1'],
      status: 'available',
    };
    const resp = await petApi.createPet(newPet);
    expect(resp.ok()).toBeTruthy();
    await petApi.printResponse(resp);

    const body = await resp.json();
    const validation = PetSchema.safeParse(body);
    expect(validation.success).toBeTruthy();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe(newPet.name);
  });
});
