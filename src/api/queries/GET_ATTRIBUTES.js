const { gql } = require("@apollo/client");

export const GET_ATTRIBUTES = gql`
  query GET_ATTRIBUTES($id: String!) {
    product(id: $id) {
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;
