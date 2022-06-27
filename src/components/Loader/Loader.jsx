import React, { Component } from "react";
import styles from "./loader.module.scss";

export default class Loader extends Component {
  render() {
    return (
      <div className={styles.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
