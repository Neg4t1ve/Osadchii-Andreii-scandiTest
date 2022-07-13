import React, { Component } from "react";
import styles from "./attributes.module.scss";

export default class Attributes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
        {this.props.attributes &&
          this.props.attributes.map((attribute) => {
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
                              ? this.props.activeAttr?.[attribute.name] ===
                                item.value
                                ? styles.swatchActive
                                : styles.swatch
                              : this.props.activeAttr?.[attribute.name] ===
                                item.value
                              ? styles.buttonActive
                              : styles.button
                          }
                          key={item.id}
                          id={attribute.name}
                          value={item.value}
                          onClick={this.props.pickAttribute}
                        >
                          {item.value}
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
