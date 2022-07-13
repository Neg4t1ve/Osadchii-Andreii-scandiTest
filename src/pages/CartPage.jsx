import Button from "components/Button/Button";
import Product from "components/Cart/Product";
import Divider from "components/Divider/Divider";
import Main from "components/Main/Main";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles/cartpage.module.scss";

const mapStateToProps = (state) => ({
  products: state.cart.products,
  tax: state.cart.tax,
  quantity: state.cart.quantity,
  total: state.cart.total,
  currency: state.cart.activeCurrency,
});

class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
      tax: 0,
      total: 0,
    };
    this.calculatePrice = this.calculatePrice.bind(this);
  }

  componentDidMount() {
    const quantity = this.props.products.reduce((prev, item) => {
      return prev + item.count;
    }, this.state.quantity);
    this.setState({ quantity });
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.products !== this.props.products) {
  //     this.calculatePrice();
  //   }
  // }

  calculatePrice() {
    const tax = 0;
    const quantity = this.props.products.reduce((prev, item) => {
      return prev + item.count;
    }, this.state.quantity);
    const total = 0;

    this.setState({ tax, quantity, total });
  }

  render() {
    return (
      <Main>
        <h2 className={styles.title}>CART</h2>
        <Divider />
        {this.props.products &&
          this.props.products.map((item) => {
            return (
              <Product
                productId={item.productId}
                key={item.productId + item.activeAttr + item.count}
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
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            <p className={styles.tax}>Tax 21%: &nbsp;</p>
            <span>
              {this.props.currency}
              {this.props.tax}
            </span>
            <p className={styles.quantity}>Quantity: &nbsp;</p>
            <span>{this.props.quantity}</span>
            <p className={styles.total}>Total: &nbsp;</p>
            <span>
              {this.props.currency}
              {this.props.total}
            </span>
          </div>
          <Button />
        </div>
      </Main>
    );
  }
}

export default connect(mapStateToProps)(CartPage);
