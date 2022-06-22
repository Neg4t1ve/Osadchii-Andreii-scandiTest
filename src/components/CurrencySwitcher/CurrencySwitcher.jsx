import React, { Component } from "react";
import arrow from "../../assets/img/down-arrow.svg";
import styles from "./currency.module.scss";

export default class CurrencySwitcher extends Component {
  render() {
    return (
      <div className={styles.currency}>
        <span>$</span> <img src={arrow} alt="arrow" />
      </div>
    );
  }
}
