/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
