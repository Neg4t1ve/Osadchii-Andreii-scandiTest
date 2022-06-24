import Button from "components/Button/Button";
import Divider from "components/Divider/Divider";
import Main from "components/Main/Main";
import React, { Component } from "react";
import styles from "./styles/cartpage.module.scss";

export default class CartPage extends Component {
  render() {
    return (
      <Main>
        <h2 className={styles.title}>CART</h2>
        <Divider />
        <div>products</div>
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            <p className={styles.tax}>Tax 21%: &nbsp;</p>
            <span>$42.00</span>
            <p className={styles.quantity}>Quantity: &nbsp;</p>
            <span>3</span>
            <p className={styles.total}>Total: &nbsp;</p>
            <span>$200.00</span>
          </div>
          <Button />
        </div>
      </Main>
    );
  }
}
