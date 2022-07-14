import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./card.module.scss";
import AddToCart from "../../assets/img/AddToCart.svg";
import { addToCart } from "app/Slices/cartSlice";

const mapDispatchToProps = (dispatch) => ({
  addToCart: (state) => dispatch(addToCart(state)),
});

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(e) {
    e.preventDefault();

    const product = {
      productId: this.props.id,
      productName: this.props.productName,
      brand: this.props.brand,
      gallery: this.props.gallery,
      prices: this.props.prices,
      attributes: this.props.attributes,
      count: 1,
    };

    this.props.addToCart(product);
  }

  render() {
    return (
      <Link
        to={`/${this.props.category}/${this.props.id}`}
        className={
          this.props.inStock ? styles.container : styles.containerOutOfStock
        }
        onClick={this.props.inStock ? null : (e) => e.preventDefault()}
      >
        <div className={styles.imgContainer}>
          <img src={this.props.gallery[0]} alt={this.props.name} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>
            {this.props.brand}&nbsp;{this.props.productName}
          </h3>
          <p className={styles.price}>
            {this.props.currency}&nbsp;{this.props.price}
          </p>
        </div>
        <button onClick={this.addToCart} className={styles.addtocart}>
          <img src={AddToCart} alt="add-to-cart" />
        </button>
      </Link>
    );
  }
}

export default connect(null, mapDispatchToProps)(Card);
