import React, { Component } from "react";
import axios from "axios";

const apiUrl = "https://tracking.bosta.co/shipments/track/";
async function getTrack(trackingNumber) {
  try {
    const response = await axios.get(`${apiUrl + trackingNumber}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
class App extends Component {
  state = {
    transitEvents: [
      {
        state: "",
        timestamp: "",
        hub: "",
      },
    ],
    trackingNumber: "",
    promisedDate: "",
  };
  trackNo = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const trackNo = this.trackNo.current.value;
    getTrack(trackNo).then((response) => {
      this.setState({
        transitEvents: response.data.TransitEvents,
        trackingNumber: response.data.TrackingNumber,
        promisedDate: response.data.PromisedDate,
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <form onSubmit={this.onSubmit}>
            <label>Track NO</label>
            <input ref={this.trackNo} type="text" id="trackNo"></input>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <ul className="list-group">
            {this.state.transitEvents.map((transitEvent) => {
              return (
                <div>
                  <li className="list-group-item">{transitEvent.state}</li>
                  <li className="list-group-item">{transitEvent.timestamp}</li>
                  <li className="list-group-item">{transitEvent.hub}</li>
                  <br></br>
                </div>
              );
            })}
          </ul>

          <div>{this.state.trackingNumber}</div>
          <div>{this.state.promisedDate}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
