import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FoodBox from "./FoodBox/FoodBox";
import food from "../foodbox.json";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { foodList: [], search: "", calories: 0, addedFood: [] };
  }

  componentDidMount() {
    let foodList = [...food];
    this.setState({
      foodList
    });
  }

  search = e => {
    this.setState({
      search: e.target.value
    });
  };

  onAdd = index => {
    let foodList = [...this.state.foodList];
    let total = this.state.calories;
    let addedFood = [...this.state.addedFood];
    let bool = true;
    if (foodList[index].quantity > 0) {
      total += foodList[index].calories * foodList[index].quantity;

      for (let food in addedFood) {
        if (addedFood[food].name.includes(foodList[index].name)) {
          let quantity = foodList[index].quantity;
          addedFood[food].quantity += quantity;
          this.setState({ calories: total, addedFood });
          bool = false;
        }
      }
      if (bool) {
        addedFood.unshift({ ...foodList[index] });
        this.setState({ calories: total, addedFood });
      }
    }
  };

  updateQuanitity = e => {
    let foodList = [...this.state.foodList];
    foodList[e.target.attributes.index.value].quantity = Number(e.target.value);
    this.setState({ foodList });
  };

  render() {
    console.log("state search ", this.state);
    return (
      <div className="container mt-5">
        <h1 className="container mb-5">IronNutrition</h1>

        <div className="container">
          <div className="row my-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={this.search}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              {this.state.foodList.map((item, index) => {
                if (
                  item.name
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                ) {
                  return (
                    <FoodBox
                      key={index}
                      name={item.name}
                      image={item.image}
                      cal={item.calories}
                      index={index}
                      quantity={item.quantity}
                      updateQuanitity={this.updateQuanitity}
                      onAdd={() => {
                        this.onAdd(index);
                      }}
                    />
                  );
                }
              })}
            </div>
            <div className="col-6">
              <h1>Today's Food</h1>
              <ul>
                {this.state.addedFood.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.quantity +
                        " " +
                        item.name +
                        " = " +
                        item.quantity * item.calories +
                        " cal"}
                    </li>
                  );
                })}
              </ul>
              <h3>{this.state.calories} Calories</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
