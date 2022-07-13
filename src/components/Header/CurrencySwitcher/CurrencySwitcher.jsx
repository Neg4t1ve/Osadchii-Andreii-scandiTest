import { client } from "api/client";
import { GET_CURRENCIES } from "api/queries/GET_CURRENCIES";
import { setCurrency } from "app/Slices/cartSlice";
import React, { Component } from "react";
import { connect } from "react-redux";
import arrow from "../../../assets/img/down-arrow.svg";
import styles from "./currency.module.scss";

const mapStateToProps = (state) => ({
  currency: state.cart.activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (state) => dispatch(setCurrency(state)),
});

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: false,
      currencies: [],
      activeCurrency: this.props.currency,
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

  currencySwitch(symbol) {
    this.props.setCurrency(symbol);
    this.toggleSwitcherVisibility();
    this.setState({ activeCurrency: symbol });
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
          <span>{this.state.activeCurrency}</span>{" "}
          <img src={arrow} alt="arrow" />
        </button>

        <div className={styles.container}>
          {this.state.visibility &&
            this.state.currencies.map((item) => {
              const symbol = item.symbol;
              return (
                <button
                  key={item.symbol}
                  onClick={() => this.currencySwitch(symbol)}
                  className={styles.currency}
                >
                  {item.symbol}&nbsp;{item.label}
                </button>
              );
            })}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
