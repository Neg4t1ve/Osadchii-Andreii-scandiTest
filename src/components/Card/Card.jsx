import React, { Component } from "react";
import styles from "./card.module.scss";

export default class Card extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={this.props.img} alt="#" />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>Apollo Running Short</h3>
          <p className={styles.price}>$50.00</p>
        </div>
      </div>
    );
  }
}
