import React, { Component } from "react";
import styles from "./product.module.scss";
import Attributes from "../Details/Attributes/Attributes";
import { connect } from "react-redux";
import Divider from "components/Divider/Divider";
import Plus from "../../assets/img/plusSquare.svg";
import Minus from "../../assets/img/minusSquare.svg";
import arrowRight from "../../assets/img/arrowRightSmall.svg";
import arrowLeft from "../../assets/img/arrowLeftSmall.svg";
import { decrement, increment } from "app/Slices/cartSlice";

const mapStateToProps = (state) => ({
  currency: state.cart.activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  increment: (state) => dispatch(increment(state)),
  decrement: (state) => dispatch(decrement(state)),
});

export class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: [],
      thumbIndex: 0,
    };
    this.pickAttribute = this.pickAttribute.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.swipeLeft = this.swipeLeft.bind(this);
    this.swipeRight = this.swipeRight.bind(this);
  }
  componentDidMount() {
    this.setState({
      active: {
        ...this.props.activeAttr,
      },
    });
  }

  pickAttribute(e) {
    const name = e.target.value ? e.target.id : e.target.parentNode.id;
    this.setState({
      active: {
        ...this.state.active,
        [name]: e.target.value ? e.target.value : e.target.parentNode.value,
      },
    });
  }

  increment() {
    this.props.increment(this.props.productId);
  }
  decrement() {
    this.props.decrement(this.props.productId);
  }

  swipeRight() {
    if (this.state.thumbIndex === this.props.gallery.length - 1) {
      this.setState({ thumbIndex: 0 });
      return;
    }
    const index = this.state.thumbIndex + 1;
    this.setState({ thumbIndex: index });
  }

  swipeLeft() {
    if (this.state.thumbIndex === 0) {
      this.setState({ thumbIndex: this.props.gallery.length - 1 });
      return;
    }
    const index = this.state.thumbIndex - 1;
    this.setState({ thumbIndex: index });
  }

  render() {
    return (
      <>
        <div
          className={
            this.props.isFull ? styles.container : styles.miniContainer
          }
        >
          <div
            className={
              this.props.isFull
                ? styles.attributesContainer
                : styles.miniAttributesContainer
            }
          >
            <div
              className={
                this.props.isFull
                  ? styles.titleContainer
                  : styles.miniTitleContainer
              }
            >
              <h3
                className={this.props.isFull ? styles.brand : styles.miniBrand}
              >
                {this.props.brand}
              </h3>
              <h4
                className={
                  this.props.isFull
                    ? styles.productName
                    : styles.miniProductName
                }
              >
                {this.props.productName}
              </h4>
            </div>
            <p className={this.props.isFull ? styles.price : styles.miniPrice}>
              {this.props.currency}
              {this.props.prices.map((item) => {
                if (item.currency.symbol === this.props.currency) {
                  return item.amount;
                }
                return null;
              })}
            </p>

            <Attributes
              id={this.state.productID}
              attributes={this.props.attributes}
              activeAttr={this.state.active}
              isFull={this.props.isFull}
            />
          </div>
          <div className={this.props.isFull ? styles.aside : styles.miniAside}>
            <div
              className={
                this.props.isFull
                  ? styles.counterContainer
                  : styles.miniCounterContainer
              }
            >
              <button
                className={
                  this.props.isFull
                    ? styles.counterButton
                    : styles.miniCounterButton
                }
                onClick={this.increment}
              >
                <img src={Plus} alt="plus" />
              </button>
              <p
                className={this.props.isFull ? styles.count : styles.miniCount}
              >
                {this.props.count}
              </p>
              <button
                className={
                  this.props.isFull
                    ? styles.counterButton
                    : styles.miniCounterButton
                }
                onClick={this.decrement}
              >
                <img src={Minus} alt="minus" />
              </button>
            </div>
            <div
              className={
                this.props.isFull ? styles.mainImg : styles.miniMainImg
              }
            >
              <img
                src={this.props.gallery[this.state.thumbIndex]}
                alt={this.props.productName}
              />
            </div>
            {this.props.isFull && this.props.gallery.length > 1 && (
              <div className={styles.buttons}>
                <button className={styles.arrowLeft} onClick={this.swipeLeft}>
                  <img src={arrowLeft} alt="arrowLeft" />
                </button>
                <button className={styles.arrowRight} onClick={this.swipeRight}>
                  <img src={arrowRight} alt="arrowRight" />
                </button>
              </div>
            )}
          </div>
        </div>
        {this.props.isFull && <Divider />}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
