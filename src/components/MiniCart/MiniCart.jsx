import Product from "components/Cart/Product";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cart from "../../assets/img/EmptyCart.svg";
import styles from "./minicart.module.scss";

const mapStateToProps = (state) => ({
  cart: state.cart.products,
  currency: state.cart.activeCurrency,
  quantity: state.cart.quantity,
  total: state.cart.total,
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
    // if (!this.state.visibility) {
    //   document.addEventListener("click", this.handleOutsideClick, false);
    // } else {
    //   document.removeEventListener("click", this.handleOutsideClick, false);
    // }

    this.setState((prevState) => ({
      visibility: !prevState.visibility,
    }));
  }
  // handleOutsideClick = (e) => {
  //   if (!this.node.contains(e.target)) {
  //     this.toggleCartVisibility();
  //   }
  // };

  render() {
    return (
      <div
        className={styles.miniCartContainer}
        ref={(node) => {
          this.node = node;
        }}
      >
        <button
          className={styles.miniCartSwitcher}
          onClick={this.toggleCartVisibility}
        >
          <img src={cart} alt="minicart" />
        </button>

        {this.props.quantity > 0 && (
          <div className={styles.quantity}>{this.props.quantity}</div>
        )}
        {this.state.visibility && (
          <div
            className={styles.basketBackground}
            onClick={this.toggleCartVisibility}
          />
        )}

        {this.state.visibility > 0 && (
          <div className={styles.basket}>
            <div className={styles.basketContainer}>
              <p className={styles.title}>
                My Bag, <span>{this.props.quantity} items</span>
              </p>
              {this.props.quantity === 0 && (
                <p className={styles.placeholder}>Cart is empty</p>
              )}
              <div className={styles.products}>
                {this.props.cart &&
                  this.props.cart.map((item) => {
                    return (
                      <Product
                        productId={item.productId}
                        key={
                          item.productId +
                          item.count +
                          JSON.stringify(item.activeAttr)
                        }
                        activeAttr={item.activeAttr}
                        count={item.count}
                        isFull={false}
                        productName={item.productName}
                        brand={item.brand}
                        gallery={item.gallery}
                        prices={item.prices}
                        attributes={item.attributes}
                      />
                    );
                  })}
              </div>
              <div className={styles.total}>
                <p>Total</p>
                <span>
                  {this.props.currency}
                  {this.props.total}
                </span>
              </div>
              <div className={styles.buttonsContainer}>
                <Link
                  onClick={this.toggleCartVisibility}
                  to="/cart"
                  className={styles.link}
                >
                  VIEW BAG
                </Link>
                <Link
                  onClick={this.toggleCartVisibility}
                  to="/cart"
                  className={styles.button}
                >
                  CHECK OUT
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MiniCart);
