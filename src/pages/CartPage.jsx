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
  handleOrder() {
    alert("You ordered");
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
                key={
                  item.productId + item.count + JSON.stringify(item.activeAttr)
                }
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
          <Button style={styles.button} handleClick={this.handleOrder}>
            ORDER
          </Button>
        </div>
      </Main>
    );
  }
}

export default connect(mapStateToProps)(CartPage);
