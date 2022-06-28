const { gql } = require("@apollo/client");

export const GET_PRODUCT_CATEGORY_BY_ID = gql`
  query GET_PRODUCT_CATEGORY_BY_ID($id: String!) {
    product(id: $id) {
      category
    }
  }
`;
