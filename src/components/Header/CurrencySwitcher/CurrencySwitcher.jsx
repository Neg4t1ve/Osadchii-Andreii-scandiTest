import { client } from "api/client";
import { GET_CURRENCIES } from "api/queries/GET_CURRENCIES";
import React, { Component } from "react";
import arrow from "../../../assets/img/down-arrow.svg";
import styles from "./currency.module.scss";

export default class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: false,
      currencies: [],
    };

    this.toggleSwitcherVisibility = this.toggleSwitcherVisibility.bind(this);
    this.currencySwitch = this.currencySwitch.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }
  componentDidMount() {
    this.fetchCurrencies();
  }

  toggleSwitcherVisibility() {
    this.setState((state) => ({
      visibility: !state.visibility,
    }));
  }

  currencySwitch() {
    // some logics
    this.toggleSwitcherVisibility();
  }

  async fetchCurrencies() {
    const result = await client.query({
      query: GET_CURRENCIES,
    });
    this.setState({ currencies: result.data.currencies });
  }

  render() {
    return (
      <div className={styles.CurrencySwitcherContainer}>
        <button
          onClick={this.toggleSwitcherVisibility}
          className={
            this.state.visibility
              ? styles.currencySwitcherActive
              : styles.currencySwitcher
          }
        >
          <span>$</span> <img src={arrow} alt="arrow" />
        </button>

        <div className={styles.container}>
          {this.state.visibility &&
            this.state.currencies.map((currency) => (
              <button
                key={currency.symbol}
                onClick={this.currencySwitch}
                className={styles.currency}
              >
                {currency.symbol}&nbsp;{currency.label}
              </button>
            ))}
        </div>
      </div>
    );
  }
}
