import { test, expect } from '@shared/fixtures/fixture';
import { GET_PRODUCTs } from '../data/graphqlQueries';
import { Product } from '../models/product';
import { logger } from '@shared/utils/logger';

test.describe('GraphQL test suite', () => {
  test.only('Get products', async ({ graphQLApi }) => {
    const response = await graphQLApi.send(GET_PRODUCTs);
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    logger.info(JSON.stringify(responseJson, null, 2));
    expect(Array.isArray(responseJson.data.products)).toBeTruthy();
    const products: Product[] = responseJson.data.products;
    for (const product of products) {
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(Array.isArray(product.categories)).toBeTruthy();
    }
  });
});
