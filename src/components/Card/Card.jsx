import { client } from "api/client";
import { GET_PRODUCT_CATEGORY_BY_ID } from "api/queries/GET_PRODUCT_CATEGORY_BY_ID";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./card.module.scss";
import AddToCart from "../../assets/img/AddToCart.svg";

const mapStateToProps = (state) => ({
  category: state.category.activeCategory,
});

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
    };

    this.fetchCategory = this.fetchCategory.bind(this);
  }

  componentDidMount() {
    this.fetchCategory();
  }

  async fetchCategory() {
    const result = await client.query({
      query: GET_PRODUCT_CATEGORY_BY_ID,
      variables: { id: this.props.id },
    });

    const productCategory = result.data.product.category;
    this.setState({ category: productCategory });
  }

  handleClick(e) {
    e.preventDefault();
    alert("click");
  }

  render() {
    return (
      <Link
        to={`/${this.state.category}/${this.props.id}`}
        className={
          this.props.inStock ? styles.container : styles.containerOutOfStock
        }
        onClick={this.props.inStock ? undefined : (e) => e.preventDefault()}
      >
        <div className={styles.imgContainer}>
          <img src={this.props.img} alt={this.props.name} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>
            {this.props.brand}&nbsp;{this.props.name}
          </h3>
          <p className={styles.price}>$&nbsp;{this.props.price}</p>
        </div>
        <button onClick={this.handleClick} className={styles.addtocart}>
          <img src={AddToCart} alt="add-to-cart" />
        </button>
      </Link>
    );
  }
}

export default connect(mapStateToProps)(Card);
