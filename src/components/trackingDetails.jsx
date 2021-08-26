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
class TrackingDetails extends Component {
  state = {
    trackingNo: "",
    currentStatus: {
      state: "",
      timeStamp: "",
      promisedDate: "",
    },
  };
  trackingNumber = "9442984";
  componentDidMount = () => {
    getTrack(this.trackingNumber).then((response) => {
      this.setState({
        trackingNo: response.data.TrackingNumber,
        currentStatus: response.data.CurrentStatus,
        promisedDate: response.data.PromisedDate,
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="current-status">
            <ul className="list-group">
              <li className="list-group-item">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item border-0 list-group-header">
                    Tracking Number {this.state.trackingNo}
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    Last update
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    Merchent Name
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    PromisedDate
                  </li>
                </ul>
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item border-0">
                    {this.state.currentStatus.state}
                  </li>
                  <li className="list-group-item border-0">
                    {this.state.currentStatus.timestamp}
                  </li>
                  <li className="list-group-item border-0">test</li>
                  <li className="list-group-item border-0">
                    {this.state.promisedDate}
                  </li>
                </ul>
              </li>

              <li className="list-group-item second-row">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item border-0 list-group-header">
                    test second
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    test
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    test
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    test
                  </li>
                </ul>
                <ul className="list-group list-group-horizontal details">
                  <li className="list-group-item border-0">
                    test
                    <ul className="list-group list-group-horizontal extra-details">
                      <li className="list-group-item border-0">test</li>
                    </ul>
                  </li>
                  <li className="list-group-item border-0">
                    test
                    <ul className="list-group list-group-horizontal extra-details">
                      <li className="list-group-item border-0">test</li>
                    </ul>
                  </li>
                  <li className="list-group-item border-0">
                    test
                    <ul className="list-group list-group-horizontal extra-details">
                      <li className="list-group-item border-0">test</li>
                    </ul>
                  </li>
                  <li className="list-group-item border-0">
                    test
                    <ul className="list-group list-group-horizontal extra-details">
                      <li className="list-group-item border-0">test</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mt-5 tracking-events">
            <ul className="list-group list-group-horizontal">
              <li className="list-group-item border-0 tracking-details-area">
                Tracking Details
              </li>
              <li className="list-group-item border-0 receiving-address-area">
                Receiving Address
              </li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item tracking-details-table">
                <ul className="list-group list-group-horizontal tracking-details-head">
                  <li className="list-group-item border-0 tracking-details-header">
                    Branch
                  </li>
                  <li className="list-group-item border-0 tracking-details-header">
                    Date
                  </li>
                  <li className="list-group-item border-0 tracking-details-header">
                    Time
                  </li>
                  <li className="list-group-item border-0 tracking-details-header">
                    Details
                  </li>
                </ul>
              </li>
              <li className="list-group-item tracking-details-items">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item border-0 tracking-details-item">
                    Branch
                  </li>
                  <li className="list-group-item border-0 tracking-details-item">
                    Date
                  </li>
                  <li className="list-group-item border-0 tracking-details-item">
                    Time
                  </li>
                  <li className="list-group-item border-0 tracking-details-item">
                    Details
                  </li>
                </ul>
              </li>
            </ul>
            {/* <ul>
              <li className="list-group-item tracking-address-table">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item border-0">Branch</li>
                </ul>
              </li>
            </ul> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TrackingDetails;
