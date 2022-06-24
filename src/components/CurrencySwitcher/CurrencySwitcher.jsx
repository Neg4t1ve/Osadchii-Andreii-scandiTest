import React, { Component } from "react";
import arrow from "../../assets/img/down-arrow.svg";
import styles from "./currency.module.scss";

export default class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: false,
    };
    this.toggleSwitcherVisibility = this.toggleSwitcherVisibility.bind(this);
  }

  toggleSwitcherVisibility() {
    this.setState((state) => ({
      visibility: !state.visibility,
    }));
  }

  render() {
    if (this.state.visibility) {
      return (
        <div className={styles.CurrencySwitcherContainer}>
          <button
            onClick={this.toggleSwitcherVisibility}
            className={styles.currencySwitcherActive}
          >
            <span>$</span> <img src={arrow} alt="arrow" />
          </button>
          <div className={styles.container}>
            <button className={styles.currency}>$&nbsp;USD</button>
            <button className={styles.currency}>€&nbsp;EUR</button>
            <button className={styles.currency}>¥&nbsp;JPY</button>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.CurrencySwitcherContainer}>
        <button
          onClick={this.toggleSwitcherVisibility}
          className={styles.currencySwitcher}
        >
          <span>$</span> <img src={arrow} alt="arrow" />
        </button>
      </div>
    );
  }
}
