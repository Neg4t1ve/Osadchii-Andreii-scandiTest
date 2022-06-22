import Card from "components/Card/Card";
import Main from "components/Main/Main";
import React, { Component } from "react";
import styles from "./styles/landing.module.scss";

export default class ProductLandingPage extends Component {
  render() {
    return (
      <Main>
        <div className={styles.container}>
          <h2 className={styles.title}>Category name</h2>
          <div className={styles.grid}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </Main>
    );
  }
}
