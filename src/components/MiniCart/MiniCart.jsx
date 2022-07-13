import Product from "components/Cart/Product";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cart from "../../assets/img/EmptyCart.svg";
import styles from "./minicart.module.scss";

const mapStateToProps = (state) => ({
  cart: state.cart.products,
  currency: state.cart.activeCurrency,
});

class MiniCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: false,
    };
    this.toggleCartVisibility = this.toggleCartVisibility.bind(this);
  }

  toggleCartVisibility() {
    this.setState((state) => ({
      visibility: !state.visibility,
    }));
  }

  render() {
    return (
      <div className={styles.miniCartContainer}>
        <button
          className={styles.miniCartSwitcher}
          onClick={this.toggleCartVisibility}
        >
          <img src={cart} alt="minicart" />
        </button>

        {this.state.visibility && (
          <>
            <div
              className={styles.basketBackground}
              onClick={this.toggleCartVisibility}
            >
              <div className={styles.basket}>
                <div className={styles.basketContainer}>
                  {this.props.cart &&
                    this.props.cart.map((item) => {
                      return (
                        <Product
                          productId={item.productId}
                          key={item.productId + item.count}
                          activeAttr={item.activeAttr}
                          count={item.count}
                          isFull={true}
                          productName={item.productName}
                          brand={item.brand}
                          gallery={item.gallery}
                          prices={item.prices}
                          attributes={item.attributes}
                        />
                      );
                    })}
                  <Link onClick={this.toggleCartVisibility} to="/cart">
                    CART
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

// {this.props.cart &&
//   this.props.cart.map((item) => {
//     return <Product productId={item} key={item} isFull={false} />;
//   })}

export default connect(mapStateToProps)(MiniCart);
