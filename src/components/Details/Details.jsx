import React, { Component } from "react";
import styles from "./details.module.scss";
import Button from "../Button/Button";
import { withRouter } from "hoc/withRouter";
import { client } from "api/client";
import { GET_PRODUCT_BY_ID } from "api/queries/GET_PRODUCT_BY_ID";
import parse from "html-react-parser";
import Attributes from "./Attributes/Attributes";
import { connect } from "react-redux";
import { addToCart } from "app/Slices/cartSlice";

const mapStateToProps = (state) => ({
  currency: state.cart.activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (state) => dispatch(addToCart(state)),
});

export class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productID: this.props.router.params.id,
      productName: "",
      brand: "",
      gallery: [],
      description: "",
      prices: [],
      attributes: [],
      activeImage: "",
    };
    this.fetchProduct = this.fetchProduct.bind(this);
    this.pickAttribute = this.pickAttribute.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.imageSwitcher = this.imageSwitcher.bind(this);
  }
  componentDidMount() {
    this.fetchProduct();
  }

  async fetchProduct() {
    const result = await client.query({
      query: GET_PRODUCT_BY_ID,
      variables: {
        id: this.state.productID,
      },
    });
    const product = result.data.product;
    const description = parse(product.description);
    const activeImage = product.gallery[0];
    this.setState({
      productID: product.id,
      productName: product.name,
      brand: product.brand,
      gallery: product.gallery,
      description: description,
      prices: product.prices,
      attributes: product.attributes,
      activeImage,
    });
    // set default active attributes
  }
  pickAttribute(e) {
    // pick active attribute and put it into state
    const name = e.target.id;
    this.setState({
      active: {
        ...this.state.active,
        [name]: e.target.value,
      },
    });
  }

  addToCart() {
    const product = {
      productId: this.state.productID,
      productName: this.state.productName,
      brand: this.state.brand,
      gallery: this.state.gallery,
      prices: this.state.prices,
      attributes: this.state.attributes,
      activeAttr: this.state.active,
      count: 1,
    };
    console.log(product);
    this.props.addToCart(product);
  }

  imageSwitcher(e) {
    const activeImage = e.target.src;
    this.setState({ activeImage: activeImage });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.gallery}>
          {this.state.gallery.map((img) => {
            return (
              <button onClick={this.imageSwitcher}>
                <img src={img} alt={this.state.productName} key={img} />
              </button>
            );
          })}
        </div>
        <div className={styles.main}>
          <div className={styles.mainImg}>
            <img src={this.state.activeImage} alt="#" />
          </div>
          <div className={styles.attributesContainer}>
            <div className={styles.titleContainer}>
              <h3 className={styles.brand}>{this.state.brand}</h3>
              <h4 className={styles.productName}>{this.state.productName}</h4>
            </div>

            <Attributes
              id={this.state.productID}
              attributes={this.state.attributes}
              pickAttribute={this.pickAttribute}
              activeAttr={this.state.active}
            />

            <div className={styles.priceContainer}>
              <p className={styles.priceTitle}>PRICE:</p>
              <p className={styles.currency}>
                {this.props.currency}
                {this.state.prices.map((item) => {
                  if (item.currency.symbol === this.props.currency) {
                    return item.amount;
                  }
                  return null;
                })}
              </p>
            </div>
            <Button style={styles.button} handleClick={this.addToCart}>
              {" "}
              Add to cart{" "}
            </Button>
            <div className={styles.description}>{this.state.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
