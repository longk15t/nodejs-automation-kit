import { test as base } from '@playwright/test';
import { PetApi } from '../../frameworks/api-playwright/requests/pet-api';
import { GraphQLClientApi } from '../../frameworks/api-playwright/requests/graphql-api';

export const test = base.extend<{
  petApi: PetApi;
  graphQLApi: GraphQLClientApi;
}>({
  petApi: async ({ request }, use) => {
    await use(new PetApi(request));
  },
  graphQLApi: async ({ request }, use) => {
    await use(new GraphQLClientApi(request));
  },
});
