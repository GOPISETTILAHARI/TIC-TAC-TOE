import React, { Component } from "react";
import "./box.css";
class Counter extends Component {
  style1 = {
    color: "red",
  };
  style2 = {
    color: "green",
  };
  styles() {
    if (this.props.box.value === "X") return this.style1;
    return this.style2;
  }

  render() {
    return (
      <div
        className="small-box"
        onClick={() => this.props.click(this.props.box)}
      >
        <span style={this.styles()} className="in-box">
          {this.props.box.value}
        </span>
      </div>
    );
  }
}

export default Counter;
