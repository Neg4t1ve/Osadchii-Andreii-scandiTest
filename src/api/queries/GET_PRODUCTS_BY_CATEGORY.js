const { gql } = require("@apollo/client");

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GET_PRODUCTS_BY_CATEGORY($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        brand
        inStock
        name
        gallery
        category
        prices {
          amount
          currency {
            symbol
          }
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
  }
`;
