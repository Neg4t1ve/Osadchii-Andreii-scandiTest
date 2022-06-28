import React, { Component } from "react";
import styles from "./details.module.scss";
import Button from "../Button/Button";
import { withRouter } from "hoc/withRouter";
import { client } from "api/client";
import { GET_PRODUCT_BY_ID } from "api/queries/GET_PRODUCT_BY_ID";
import parse from "html-react-parser";
import Attributes from "./Attributes/Attributes";

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productID: this.props.router.params.id,
      productName: "",
      brand: "",
      gallery: [],
      description: "",
    };
    this.fetchProduct = this.fetchProduct.bind(this);
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
    this.setState({
      productName: product.name,
      brand: product.brand,
      gallery: product.gallery,
      description: description,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.gallery}>
          {this.state.gallery.map((img) => {
            return <img src={img} alt={this.state.productName} key={img} />;
          })}
        </div>
        <div className={styles.main}>
          <div className={styles.mainImg}>
            <img src={this.state.gallery[0]} alt="#" />
          </div>
          <div className={styles.attributesContainer}>
            <div className={styles.titleContainer}>
              <h3 className={styles.brand}>{this.state.brand}</h3>
              <h4 className={styles.productName}>{this.state.productName}</h4>
            </div>
            <div className={styles.attributes}>
              <Attributes id={this.state.productID} />
            </div>
            <div className={styles.priceContainer}>
              <p className={styles.priceTitle}>PRICE:</p>
              <p className={styles.currency}>$50.00</p>
            </div>
            <Button style={styles.button}> Add to cart </Button>
            <div className={styles.description}>{this.state.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
