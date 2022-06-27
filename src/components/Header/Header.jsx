import React, { Component } from "react";
import logo from "../../assets/img/logo.svg";
import styles from "./header.module.scss";
import MiniCart from "components/MiniCart/MiniCart";
import CurrencySwitcher from "components/Header/CurrencySwitcher/CurrencySwitcher";
import Categories from "./Categories/Categories";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className={styles.container}>
          <Categories />
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
