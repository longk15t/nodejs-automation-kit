import { test as base } from '@playwright/test';
import { PetApi } from '../../frameworks/api-playwright/requests/pet-api';

export const test = base.extend<{
  petApi: PetApi;
}>({
  petApi: async ({ request }, use) => {
    await use(new PetApi(request));
  },
});
