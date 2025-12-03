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

export const CREATE_USER = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
