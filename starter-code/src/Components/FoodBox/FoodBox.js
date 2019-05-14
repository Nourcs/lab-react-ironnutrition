import React, { Component } from "react";
import "./foodbox.css";

class FoodBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={this.props.image} className="card-img" />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">{this.props.cal} Cal</p>
            </div>
          </div>
          <div />
          <input
            type="number"
            className="input-number"
            defaultValue="0"
            min="0"
            index={this.props.index}
            onChange={this.props.updateQuanitity}
          />
          <button
            className="float-right add-btn btn btn-success"
            index={this.props.index}
            onClick={this.props.onAdd}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default FoodBox;
