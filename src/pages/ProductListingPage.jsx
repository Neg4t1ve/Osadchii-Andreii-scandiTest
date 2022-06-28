import Card from "components/Card/Card";
import Main from "components/Main/Main";
import React, { Component } from "react";
import styles from "./styles/listing.module.scss";
import { connect } from "react-redux";
import { client } from "api/client";
import { GET_PRODUCTS_BY_CATEGORY } from "api/queries/GET_PRODUCTS_BY_CATEGORY";

const mapStateToProps = (state) => ({
  category: state.category.activeCategory,
});

class ProductListingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchProducts();
    }
  }

  async fetchProducts() {
    const result = await client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: {
        title: this.props.category,
      },
    });
    this.setState({ products: result.data.category.products });
  }

  render() {
    return (
      <Main>
        <div className={styles.container}>
          <h2 className={styles.title}>{this.props.category.toUpperCase()}</h2>
          <div className={styles.grid}>
            {this.state.products.map((product) => (
              <Card
                id={product.id}
                key={product.brand + product.name}
                inStock={product.inStock}
                name={product.name}
                brand={product.brand}
                img={product.gallery[0]}
                price={product.prices[0].amount}
              />
            ))}
          </div>
        </div>
      </Main>
    );
  }
}

export default connect(mapStateToProps)(ProductListingPage);
