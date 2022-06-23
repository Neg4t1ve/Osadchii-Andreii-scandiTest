import Card from "components/Card/Card";
import Main from "components/Main/Main";
import React, { Component } from "react";
import styles from "./styles/listing.module.scss";
import test1 from "../assets/img/test.jpg";
import test2 from "../assets/img/test2.jpg";
import test3 from "../assets/img/test3.jpg";

export default class ProductListingPage extends Component {
  render() {
    return (
      <Main>
        <div className={styles.container}>
          <h2 className={styles.title}>Category name</h2>
          <div className={styles.grid}>
            <Card img={test1} />
            <Card img={test2} />
            <Card img={test3} />
            <Card img={test1} />
            <Card img={test3} />
            <Card img={test2} />
          </div>
        </div>
      </Main>
    );
  }
}
