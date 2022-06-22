import React, { Component } from "react";
import logo from "../../assets/img/logo.svg";
import styles from "./header.module.scss";
import MiniCart from "components/MiniCart/MiniCart";
import CurrencySwitcher from "components/CurrencySwitcher/CurrencySwitcher";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className={styles.container}>
          <div className={styles.categories}>
            <div className={styles.Category_primary}>WOMAN</div>
            <div className={styles.Category}>MAN</div>
            <div className={styles.Category}>KIDS</div>
          </div>

          <img className={styles.logo} src={logo} alt="logo" />

          <div className={styles.actions}>
            <CurrencySwitcher />
            <MiniCart />
          </div>
        </div>
      </header>
    );
  }
}
