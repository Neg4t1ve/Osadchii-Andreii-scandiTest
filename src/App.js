import Layout from "components/Layout";
import CartPage from "pages/CartPage";
import ProductDetailPage from "pages/ProductDetailPage";
import ProductListingPage from "pages/ProductListingPage";
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListingPage />} />
          <Route path="/:category" element={<ProductListingPage />} />
          <Route path="/:category/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    );
  }
}
