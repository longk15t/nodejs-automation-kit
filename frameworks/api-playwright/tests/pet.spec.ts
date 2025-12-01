// tests/petstore.api.spec.ts
import { test, expect } from '@shared/fixtures/fixture';
import { env } from '@shared/config/env';

test.describe('Petstore API - CRUD for Pet', () => {
  const createdPetId: number = Math.floor(1000000000 + Math.random() * 9000000000);

  test.beforeEach(async ({ petApi }) => {
      await petApi.createContext();
  });

  test('POST /pet – create new pet', async ({ petApi }) => {
    const newPet = {
      id: createdPetId,
      name: 'TestPet-' + Date.now(),
      photoUrls: ['http://example.com/photo1'],
      status: 'available'
    };
    const resp = await petApi.createPet(newPet);
    expect(resp.ok()).toBeTruthy();
    const body = await resp.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe(newPet.name);
  });

  test('GET /pet/{petId} – get created pet', async ({ petApi }) => {
    const resp = await petApi.getPet(createdPetId);
    expect(resp.status()).toBe(200);
    const data = await resp.json();
    expect(data).toHaveProperty('id', createdPetId);
    expect(data.name).toBeDefined();
  });

  test('PUT /pet – update pet', async ({ petApi }) => {
    const updated = {
      id: createdPetId,
      name: 'UpdatedPetName',
      photoUrls: ['http://example.com/photo1'],
      status: 'sold'
    };
    const resp = await petApi.updatePet(updated);
    // Some servers return 200 for update — depends on implementation
    expect(resp.ok()).toBeTruthy();
    const body = await resp.json();
    expect(body.name).toBe(updated.name);
    expect(body.status).toBe(updated.status);
  });

  test('DELETE /pet/{petId} – delete pet', async ({ petApi }) => {
    const resp = await petApi.deletePet(createdPetId);
    expect(resp.status()).toBe(200);

    // Optionally: verify it's deleted
    const getResp = await petApi.getPet(createdPetId);
    expect(getResp.status()).toBe(404);
  });
});
