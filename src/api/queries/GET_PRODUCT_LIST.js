import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST = gql`
  query GET_PRODUCT_LIST {
    category {
      products {
        id
        name
        gallery
        prices {
          amount
        }
      }
    }
  }
`;
