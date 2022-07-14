import React, { Component } from "react";
import styles from "./attributes.module.scss";

export default class Attributes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  swatch(HEX) {
    return { backgroundColor: `${HEX}`, height: "1.25rem", width: "1.25rem" };
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
                      const swatch = attribute.type === "swatch";
                      return (
                        <button
                          className={
                            swatch
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
                          style={swatch ? this.swatch(item.value) : null}
                        >
                          {swatch ? null : item.value}
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
