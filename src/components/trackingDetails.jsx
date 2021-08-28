import React, { Component } from "react";
import axios from "axios";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Icon } from "rsuite";

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
  daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  state = {
    transitEvents: [],
    trackingNo: "",
    currentStatus: {
      state: "",
      timeStamp: [],
      hub: "",
    },
    promisedDate: [],
    newDate: [],
    theNameOfTheDay: "",
    branch: "",
  };
  trackingNumber = "9442984"; //6636234, 7234258, 9442984,1094442 
  componentDidMount = () => {
    getTrack(this.trackingNumber).then((response) => {
      this.setState({
        trackingNo: response.data.TrackingNumber,
        currentStatus: response.data.CurrentStatus,
        promisedDate: response.data.PromisedDate.split("T"),
        newDate: response.data.CurrentStatus.timestamp
          .replace(/-/g, "/")
          .split("T"),
        transitEvents: response.data.TransitEvents,
      });
      const day = new Date(this.state.newDate[0]);
      this.setState({
        theNameOfTheDay: this.daysOfWeek[day.getDay()],
        branch: this.state.transitEvents[1].hub,
      });
      console.log(
        this.state.transitEvents[this.state.transitEvents.length - 1].state
      );
    });
  };

  // function to check the state of shipement
  checkState() {
    if (this.state.currentStatus.state === "DELIVERED") {
      return "list-group-item border-0 green";
    } else if (this.state.currentStatus.state === "DELIVERED_TO_SENDER") {
      return "list-group-item border-0 red";
    } else {
      return "list-group-item border-0 yellow";
    }
  }

  //function to check the level of the progress bar
  checkLevelOfProgressBar() {
    if (this.state.currentStatus.state === "DELIVERED") {
      return 100;
    } else if (this.state.currentStatus.state === "PACKAGE_RECEIVED") {
      return 34;
    } else if (this.state.currentStatus.state === "TICKET_CREATED") {
      return 0;
    } else {
      return 67;
    }
  }

  //function to set state color for the current state
  setColorOfProgressBar() {
    if (this.state.currentStatus.state === "DELIVERED") {
      return "accomplished green";
    } else if (this.state.currentStatus.state === "DELIVERED_TO_SENDER") {
      return "accomplished red";
    } else {
      return "accomplished yellow";
    }
  }

  //function to fill the background of the progress bar
  filledBackground() {
    if (this.state.currentStatus.state === "DELIVERED") {
      return "#36B600";
    } else if (this.state.currentStatus.state === "DELIVERED_TO_SENDER") {
      return "#F40105";
    } else {
      return "#F8B902";
    }
  }

  //function to make icon big
  setIconBig() {
    if (this.state.currentStatus.state === "DELIVERED_TO_SENDER") {
      return "big";
    } else {
      return "big";
    }
  }

  //function to change the icon in progress bar
  changeIcon(){
    if (this.state.currentStatus.state === "DELIVERED") {
      return ( <Icon icon="check"></Icon>);
    } 
    
    else {
      return (<Icon icon="save" size="2x"></Icon>);
    }
  }

  changeIconForUndelivered(){
    if(this.state.currentStatus.state === "DELIVERED_TO_SENDER"){
      return (<Icon icon="truck" size="2x"></Icon>);
    }
    else if (this.state.currentStatus.state === "DELIVERED") {
      return ( <Icon icon="check"></Icon>);
    } 
  }


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
                  <li className={this.checkState()}>
                    {this.state.currentStatus.state}
                  </li>
                  <li className="list-group-item border-0 show-date">
                    {this.state.theNameOfTheDay + " " + this.state.newDate[0]}{" "}
                    at {this.state.newDate[1]}
                  </li>
                  <li className="list-group-item border-0">test</li>
                  <li className="list-group-item border-0">
                    {this.state.promisedDate[0]}
                  </li>
                </ul>
              </li>

              <li className="list-group-item second-row">
                <div className="mt-4 mb-4">
                  <ProgressBar
                    percent={this.checkLevelOfProgressBar()}
                    filledBackground={this.filledBackground()}
                  >
                    <Step>
                      {({ accomplished }) => (
                        <div
                          className={`indexedStep ${
                            accomplished ? this.setColorOfProgressBar() : null
                          }`}
                        >
                          <Icon icon="check"></Icon>
                        </div>
                      )}
                    </Step>

                    <Step>
                      {({ accomplished }) => (
                        <div
                          className={`indexedStep ${
                            accomplished ? this.setColorOfProgressBar() : null
                          }`}
                        >
                          <Icon icon="check"></Icon>
                        </div>
                      )}
                    </Step>
                    <Step>
                      {({ accomplished }) => (
                        <div
                          className={`indexedStep ${
                            accomplished
                              ? this.setColorOfProgressBar()
                              : null 
                          } ${ this.state.currentStatus.state ==="DELIVERED" ? null : this.setIconBig()}`}
                        >
                          {/* <Icon icon="truck" size="2x"></Icon> */}
                          {this.changeIconForUndelivered()}
                        </div>
                      )}
                    </Step>
                    <Step>
                      {({ accomplished }) => (
                        <div
                          className={`indexedStep ${
                            accomplished ? this.setColorOfProgressBar() : null
                          } ${ this.state.currentStatus.state ==="DELIVERED" ? null : this.setIconBig()}`}
                        >

                          {this.changeIcon()}
                        </div>
                      )}
                    </Step>
                  </ProgressBar>
                </div>
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
            <table class="table border-ligth table-bordered rounded-3">
              <thead className="table-light">
                <tr>
                  <th scope="col">Branch</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
            {/* <ul className="list-group">
                <ul className="list-group list-group-horizontal tracking-details-head">
                <li className="list-group-item tracking-details-table">
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
            </ul> */}

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
