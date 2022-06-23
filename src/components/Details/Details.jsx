import React, { Component } from "react";
import styles from "./details.module.scss";
import Button from "../Button/Button";
import img from "../../assets/img/test.jpg";
import img2 from "../../assets/img/test2.jpg";
import img3 from "../../assets/img/test3.jpg";

export default class Details extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.gallery}>
          <img src={img} alt="#" />
          <img src={img2} alt="#" />
          <img src={img3} alt="#" />
        </div>
        <div className={styles.main}>
          <div className={styles.mainImg}>
            <img src={img} alt="#" />
          </div>
          <div className={styles.attributesContainer}>
            <div className={styles.titleContainer}>
              <h3 className={styles.brand}>Apollo</h3>
              <h4 className={styles.productName}>Running short</h4>
            </div>
            <div className={styles.attributes}></div>
            <div className={styles.priceContainer}>
              <p className={styles.priceTitle}>PRICE:</p>
              <p className={styles.currency}>$50.00</p>
            </div>
            <Button />
            <div className={styles.description}>description</div>
          </div>
        </div>
      </div>
    );
  }
}
