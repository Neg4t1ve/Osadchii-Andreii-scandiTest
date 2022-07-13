const { gql } = require("@apollo/client");

export const GET_PRODUCT_BY_ID = gql`
  query GET_PRODUCT_BY_ID($id: String!) {
    product(id: $id) {
      name
      gallery
      brand
      description
      prices {
        currency {
          symbol
        }
        amount
      }
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
