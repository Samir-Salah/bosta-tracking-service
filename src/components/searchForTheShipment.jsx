import React, { Component } from "react";
import { Link } from "react-router-dom";

let trackNo = "";
class SearchForTheShipment extends Component {
  state = {
      trackingNumber: ""
  };
  onSubmit = (e) => {
      e.preventDefault();
    trackNo = e.target.value;
    this.setState({
        trackingNumber : trackNo
    })
  };

  onTest(){
  }
  render() {
    return (
      <div className="container mt-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              Please Enter your shipment number and Track your Shipment.
            </h5>
            <p class="card-text">Track another shipment</p>
            <input
              type="text"
              id="trackNo"
              placeholder="Tracking No."
              onChange={this.onSubmit}
            ></input>
            <Link
            to={`/tracking-details/${this.state.trackingNumber}`}
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForTheShipment;
