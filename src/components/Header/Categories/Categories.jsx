import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "../header.module.scss";
import { client } from "api/client";
import { GET_ALL_CATEGORIES } from "api/queries/GET__ALL_CATEGORIES";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      category: "all",
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }
  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const result = await client.query({
      query: GET_ALL_CATEGORIES,
    });
    this.setState({
      categories: result.data.categories,
    });
  }

  setCategory(e) {
    this.setState({ category: e.target.textContent });
  }

  render() {
    return (
      <div className={styles.categories}>
        {this.state.categories &&
          this.state.categories.map((category) => {
            return (
              <NavLink
                key={category.name}
                to={`category/${category.name}`}
                className={
                  this.state.category === category.name
                    ? styles.Category_primary
                    : styles.Category
                }
                onClick={this.setCategory}
              >
                {category.name}
              </NavLink>
            );
          })}
      </div>
    );
  }
}
