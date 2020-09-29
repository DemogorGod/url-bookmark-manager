/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      bookmarks {
        id
        name
        url
      }
      categorizedMarks {
        id
        name
        bookmarks {
          id
          name
          url
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        bookmarks {
          id
          name
          url
        }
        categorizedMarks {
          id
          name
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
