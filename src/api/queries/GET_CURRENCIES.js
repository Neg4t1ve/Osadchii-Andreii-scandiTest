import { gql } from "@apollo/client";

export const GET_CURRENCIES = gql`
  query GET_CURRENCIES {
    currencies {
      label
      symbol
    }
  }
`;
