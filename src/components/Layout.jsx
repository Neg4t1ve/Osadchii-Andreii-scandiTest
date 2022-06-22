import React, { Component } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
}
