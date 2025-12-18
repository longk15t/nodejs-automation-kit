// graphqlQueries.ts
export const GET_PRODUCTs = `
  query Products {
    products {
      name
      price
      categories {
        name
        publishedAt
        locale
      }
    }
  }
`;

export const UPDATE_PRODUCT = `
  mutation UpdateProduct($id: ID!, $data: ProductUpdateInput!) {
    updateProduct(
      where: { id: $id }
      data: $data
    ) {
      id
      name
      slug
      price
      categories {
        id
        name
        publishedAt
        locale
      }
    }
  }
`;

export const GET_POSTS_BY_ID = `
  query GetPost($id: ID!) {
    user(id: $id) {
      posts {
        data {
          id
          title
        }
      }
    }
  }
`;

export const UPDATE_POST = `
  mutation (
    $id: ID!,
    $input: UpdatePostInput!
  ) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;
