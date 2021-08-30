import React, { Component } from "react";
import { Link } from "react-router-dom";

let trackNo = "";
class SearchForTheShipment extends Component {
  state = {
    trackingNumber: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    trackNo = e.target.value;
    this.setState({
      trackingNumber: trackNo,
    });
  };

  onTest() {}
  render() {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                Please Enter your shipment number and Track your Shipment.
              </h5>
              <p class="card-text">Track another shipment</p>
              <div className="mt-3">
                <input
                  type="text"
                  id="trackNo"
                  placeholder="Tracking No."
                  onChange={this.onSubmit}
                ></input>
                <Link to={`/tracking-details/${this.state.trackingNumber}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="-8 -8 32 32"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchForTheShipment;
