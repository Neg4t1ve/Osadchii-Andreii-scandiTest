import React, { Component } from "react";
import styles from "./attributes.module.scss";

export default class Attributes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  swatch(HEX) {
    return this.props.isFull
      ? { backgroundColor: `${HEX}`, height: "2rem", width: "2rem" }
      : { backgroundColor: `${HEX}`, height: "1rem", width: "1rem" };
  }

  render() {
    if (this.props.isFull) {
      return (
        <ul className={styles.attributesContainer}>
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
                          >
                            {swatch ? (
                              <div style={this.swatch(item.value)}></div>
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
        </ul>
      );
    }
    return (
      <ul className={styles.miniAttributesContainer}>
        {this.props.attributes &&
          this.props.attributes.map((attribute) => {
            return (
              <div className={styles.miniAttribute} key={attribute.id}>
                <h5 className={styles.miniAttributeName}>{attribute.name}:</h5>
                <div className={styles.miniBtnContainer}>
                  {attribute.items &&
                    attribute.items.map((item) => {
                      const swatch = attribute.type === "swatch";
                      return (
                        <button
                          className={
                            swatch
                              ? this.props.activeAttr?.[attribute.name] ===
                                item.value
                                ? styles.miniSwatchActive
                                : styles.miniSwatch
                              : this.props.activeAttr?.[attribute.name] ===
                                item.value
                              ? styles.miniButtonActive
                              : styles.miniButton
                          }
                          key={item.id}
                          id={attribute.name}
                          value={item.value}
                          onClick={this.props.pickAttribute}
                        >
                          {swatch ? (
                            <div style={this.swatch(item.value)}></div>
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
      </ul>
    );
  }
}
