import { test, expect } from '@shared/fixtures/fixture';
import { GET_PRODUCTs, UPDATE_PRODUCT } from '../data/graphqlQueries';
import { Product } from '../models/product';

test.describe('Product Management GraphQL requests', () => {
  test('Get products', async ({ graphQLApi }) => {
    const response = await graphQLApi.send(GET_PRODUCTs);
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(Array.isArray(responseJson.data.products)).toBeTruthy();
    const products: Product[] = responseJson.data.products;
    for (const product of products) {
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(Array.isArray(product.categories)).toBeTruthy();
    }
  });

  test('Update a product', async ({ graphQLApi }) => {
    const newInfoProduct = {
      "name": "Grey Hoodie",
      "price": 2499
    }

    const response = await graphQLApi.send(
      UPDATE_PRODUCT,
      {
        id: "ckdu44mn40gxh010405uwgbtw",
        input: newInfoProduct
      }
    );
    expect(response.status()).toBe(200);
  });
});
