import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query GET_ALL_CATEGORIES {
    categories {
      name
    }
  }
`;
