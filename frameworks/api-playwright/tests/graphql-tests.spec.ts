import { test, expect } from '@shared/fixtures/fixture';
import { randomWords } from '@shared/utils/random';
import { GET_POSTS_BY_ID, UPDATE_POST, GET_PRODUCTs, UPDATE_PRODUCT } from '../data/graphQLQueries';
import { Product } from '../models/product';
import { Post } from '../models/post';

test.describe('Product Management GraphQL requests', () => {
  test('Get products', async ({ graphQLApi }) => {
    const response = await graphQLApi.sendProducts(GET_PRODUCTs);
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
      name: 'Grey Hoodie',
      price: 2499,
    };

    const response = await graphQLApi.sendProducts(UPDATE_PRODUCT, {
      id: 'ckdu44mn40gxh010405uwgbtw',
      input: newInfoProduct,
    });
    expect(response.status()).toBe(400);
  });
});

test.describe('Posts GraphQL requests', () => {
  test('Get Posts by user id', async ({ graphQLApi }) => {
    const response = await graphQLApi.sendPosts(GET_POSTS_BY_ID, { id: 1 });
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(Array.isArray(responseJson.data.user.posts.data)).toBeTruthy();
    const posts: Post[] = responseJson.data.user.posts.data;
    for (const post of posts) {
      expect(typeof post.id).toBe('string');
      expect(typeof post.title).toBe('string');
    }
  });

  test('Update a post', async ({ graphQLApi }) => {
    const newInfoProduct = {
      body: randomWords(),
    };

    const response = await graphQLApi.sendPosts(UPDATE_POST, {
      id: '1',
      input: newInfoProduct,
    });
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(typeof responseJson.data.updatePost.id).toBe('string');
    expect(responseJson.data.updatePost.body).toBe(newInfoProduct.body);
  });
});
