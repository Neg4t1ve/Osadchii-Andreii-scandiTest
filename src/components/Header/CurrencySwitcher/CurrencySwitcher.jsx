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
    };

    this.toggleSwitcherVisibility = this.toggleSwitcherVisibility.bind(this);
    this.currencySwitch = this.currencySwitch.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  toggleSwitcherVisibility() {
    if (!this.state.visibility) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      visibility: !prevState.visibility,
    }));
  }

  handleOutsideClick = (e) => {
    if (!this.node.contains(e.target)) this.toggleSwitcherVisibility();
  };

  currencySwitch(symbol) {
    // set active currency to global state
    this.props.setCurrency(symbol);

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
      <div
        className={styles.CurrencySwitcherContainer}
        ref={(node) => {
          this.node = node;
        }}
      >
        <button
          onClick={this.toggleSwitcherVisibility}
          className={
            this.state.visibility
              ? styles.currencySwitcherActive
              : styles.currencySwitcher
          }
        >
          <span>{this.props.currency}</span> <img src={arrow} alt="arrow" />
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
