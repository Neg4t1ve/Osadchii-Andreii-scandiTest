import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "../header.module.scss";
import { client } from "api/client";
import { GET_ALL_CATEGORIES } from "api/queries/GET__ALL_CATEGORIES";
import { setCategory } from "app/Slices/categoriesSlice";
import { connect } from "react-redux";

// достаем метод для установки категории
const mapDispatchToProps = (dispatch) => ({
  setActiveCategory: (state) => dispatch(setCategory(state)),
});

class Categories extends Component {
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
    this.props.setActiveCategory(e.target.textContent);
  }

  render() {
    return (
      <div className={styles.categories}>
        {this.state.categories &&
          this.state.categories.map((category) => {
            return (
              <NavLink
                key={category.name}
                to={`${category.name}`}
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

export default connect(null, mapDispatchToProps)(Categories);
