import { compareObjects } from "./compareObjects";

export const findIndex = (state, product) => {
  // the code below in first step return an array of booleans, where every value which match to product in cart
  // and in the second step  finds index of needed product
  const productIndex = state.products
    .map((item) => compareObjects(item.activeAttr, product.activeAttr))
    .findIndex((i) => i === true);

  return productIndex;
};
