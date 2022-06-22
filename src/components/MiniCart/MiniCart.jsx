import React, { Component } from "react";
import cart from "../../assets/img/EmptyCart.svg";

export default class MiniCart extends Component {
  render() {
    return (
      <div>
        <img src={cart} alt="cart" />
      </div>
    );
  }
}
