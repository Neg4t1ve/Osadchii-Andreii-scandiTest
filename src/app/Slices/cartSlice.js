import { compareObjects } from "helpers/compareObjects";

import { createSlice } from "@reduxjs/toolkit";
import { findIndex } from "helpers/findIndex";
import { takeCurrentPrice } from "helpers/takeCurrentPrice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [
      // product structure
      // {
      //   productId: string,
      //   productName: string,
      //   brand: string,
      //   gallery: [],
      //   prices: [],
      //   attributes: [],
      //   activeAttr: {[name]: value},
      //   count: num
      // }
    ],
    tax: 0,
    quantity: 0,
    total: 0,
    activeCurrency: "$",
  },

  reducers: {
    setCurrency: (state, action) => {
      if (state.activeCurrency === action.payload) return;
      state.activeCurrency = action.payload;

      // calculating total price of products, when currency change
      const total = state.products.reduce((prev, curr) => {
        const currentPrice = takeCurrentPrice(
          state.activeCurrency,
          curr.prices
        );
        return prev + +currentPrice * curr.count;
      }, 0);
      state.total = total.toFixed(2);
    },

    addToCart: (state, action) => {
      // increases quantity counter by 1, when adding a product
      state.quantity = state.quantity + 1;

      // increases total price
      const currentPrice = takeCurrentPrice(
        state.activeCurrency,
        action.payload.prices
      );

      let sum = state.total + currentPrice;
      let tax = (sum * 21) / 100;
      state.total = +sum.toFixed(2);
      state.tax = +tax.toFixed(2);

      // set default chosen attributes, if user didn't choose them
      if (!action.payload.activeAttr) {
        const attr = {};
        action.payload.attributes.forEach((item) => {
          attr[item.name] = item.items[0].value;
        });

        const product = { ...action.payload, activeAttr: attr };

        // cheking for same products in cart
        if (
          state.products
            .map((item) => compareObjects(item.activeAttr, product.activeAttr))
            .includes(true) &&
          state.products.map((i) => i.id).includes(product.id)
        ) {
          const productIndex = findIndex(state, product);
          let count = state.products[productIndex].count;
          count++;
          state.products[productIndex].count = count;
          return;
        }

        state.products.push(product);
        return;
      }

      // increase counter of product, if there was the same
      if (
        state.products
          .map((item) =>
            compareObjects(item.activeAttr, action.payload.activeAttr)
          )
          .includes(true) &&
        state.products.map((i) => i.id).includes(action.payload.id)
      ) {
        const productIndex = findIndex(state, action.payload);
        let count = state.products[productIndex].count;
        count++;
        state.products[productIndex].count = count;
        return;
      }

      // add new product to a cart
      state.products.push(action.payload);
    },

    // increases counter of product
    increment: (state, action) => {
      // searching needed product
      const productIndex = findIndex(state, action.payload);

      // increases total price
      const currentPrice = takeCurrentPrice(
        state.activeCurrency,
        state.products[productIndex].prices
      );

      let sum = state.total + currentPrice;
      let tax = (sum * 21) / 100;
      state.total = +sum.toFixed(2);
      state.tax = +tax.toFixed(2);

      // increace product count
      let count = state.products[productIndex].count;
      count++;
      state.products[productIndex].count = count;

      // increases quantity counter
      state.quantity = state.quantity + 1;
    },

    // decreases counter of product
    decrement: (state, action) => {
      // searching needed product
      const productIndex = findIndex(state, action.payload);

      // decreasing total price
      const currentPrice = takeCurrentPrice(
        state.activeCurrency,
        state.products[productIndex].prices
      );

      let sum = state.total - currentPrice;
      let tax = (sum * 21) / 100;
      state.total = +sum.toFixed(2);
      state.tax = +tax.toFixed(2);

      // delete product if user try to decrase the counter, when it equal to 1
      if (state.products[productIndex].count === 1) {
        state.products.splice(productIndex, 1);
        // decreasing quantity counter
        state.quantity = state.quantity - 1;
        return;
      }

      // decrasing counter if it > 1
      let count = state.products[productIndex].count;
      count--;
      state.products[productIndex].count = count--;
      // decreasing quantity counter
      state.quantity = state.quantity - 1;
    },
  },
});

export const { addToCart, increment, decrement, setCurrency } =
  cartSlice.actions;

export default cartSlice.reducer;
