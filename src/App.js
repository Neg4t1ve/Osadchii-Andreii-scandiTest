import Layout from "components/Layout";
import CartPage from "pages/CartPage";
import ProductDetailPage from "pages/ProductDetailPage";
import ProductLandingPage from "pages/ProductLandingPage";
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProductLandingPage />} />
          <Route path="/" element={<ProductDetailPage />} />
          <Route path="/" element={<CartPage />} />
        </Route>
      </Routes>
    );
  }
}
