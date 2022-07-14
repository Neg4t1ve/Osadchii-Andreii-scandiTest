import React, { Component } from "react";
import styles from "./product.module.scss";
import { withRouter } from "hoc/withRouter";
import Attributes from "../Details/Attributes/Attributes";
import AttributesMini from "./Attributes/AttributesMini";
import { connect } from "react-redux";
import Divider from "components/Divider/Divider";
import Plus from "../../assets/img/plusSquare.svg";
import Minus from "../../assets/img/minusSquare.svg";
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
    };
    this.pickAttribute = this.pickAttribute.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  componentDidMount() {
    this.setState({
      active: {
        ...this.props.activeAttr,
      },
    });
  }

  pickAttribute(e) {
    const name = e.target.id;
    this.setState({
      active: {
        ...this.state.active,
        [name]: e.target.value,
      },
    });
  }

  increment() {
    this.props.increment(this.props.productId);
  }
  decrement() {
    this.props.decrement(this.props.productId);
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
            {this.props.isFull ? (
              <Attributes
                id={this.state.productID}
                attributes={this.props.attributes}
                pickAttribute={this.pickAttribute}
                activeAttr={this.state.active}
              />
            ) : (
              <AttributesMini
                id={this.state.productID}
                attributes={this.props.attributes}
              />
            )}
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
              <img src={this.props.gallery[0]} alt="#" />
            </div>
          </div>
        </div>
        {this.props.isFull && <Divider />}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
