import { client } from "api/client";
import { GET_ATTRIBUTES } from "api/queries/GET_ATTRIBUTES";
import React, { Component } from "react";
import styles from "./attributes.module.scss";

export default class Attributes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
    };
  }

  componentDidMount() {
    this.fetchAttributes();
  }

  async fetchAttributes() {
    const result = await client.query({
      query: GET_ATTRIBUTES,
      variables: { id: this.props.id },
    });
    const attributes = result.data.product.attributes;
    this.setState({ attributes: attributes });
  }
  swatch(HEX) {
    return {
      backgroundColor: `${HEX}`,
      height: "2rem",
      width: "2rem",
    };
  }

  render() {
    return (
      <div className={styles.attributesContainer}>
        {this.state.attributes &&
          this.state.attributes.map((attribute) => {
            return (
              <div className={styles.attribute} key={attribute.id}>
                <h5 className={styles.attributeName}>{attribute.name}:</h5>
                <div className={styles.btnContainer}>
                  {attribute.items &&
                    attribute.items.map((item) => {
                      return (
                        <button
                          className={
                            attribute.type === "swatch"
                              ? styles.swatch
                              : styles.button
                          }
                          key={item.id}
                        >
                          {attribute.type === "swatch" ? (
                            <div style={this.swatch(item.value)} />
                          ) : (
                            item.value
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
