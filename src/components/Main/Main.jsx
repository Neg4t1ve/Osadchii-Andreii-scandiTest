import React, { Component } from "react";
import styles from "./main.module.scss";

export default class Main extends Component {
  render() {
    return (
      <main>
        <div className={styles.wrapper}>{this.props.children}</div>
      </main>
    );
  }
}
