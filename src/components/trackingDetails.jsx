import React, { Component } from "react";
import axios from "axios";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Icon } from "rsuite";
import moment from "moment";

import counterpart from "counterpart";

import en from "../lang/en";
import ar from "../lang/ar";
import Translate from "react-translate-component";

counterpart.registerTranslations("en", en);
counterpart.registerTranslations("ar", ar);
counterpart.setLocale("en");
const apiUrl = "https://tracking.bosta.co/shipments/track/";
async function getTrack(trackingNumber) {
  try {
    const response = await axios.get(`${apiUrl + trackingNumber}`);
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
    transitEvents: [
      {
        state: "",
        timestamp: "",
        hub: "",
      },
    ],
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

  trackingNumber = this.props.match.params.id; //6636234, 7234258, 9442984,1094442
  componentDidMount = () => {
    getTrack(this.trackingNumber).then((response) => {
      this.setState({
        trackingNo: response.data.TrackingNumber,
        currentStatus: response.data.CurrentStatus,
        newDate: response.data.CurrentStatus.timestamp
          .replace(/-/g, "/")
          .split("T"),
        transitEvents: response.data.TransitEvents,
      });
      if (response.data.PromisedDate) {
        this.setState({
          promisedDate: response.data.PromisedDate.split("T"),
        });
      }
      const day = new Date(this.state.newDate[0]);
      this.setState({
        theNameOfTheDay: this.daysOfWeek[day.getDay()],
        branch: this.state.transitEvents[1].hub,
      });
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
  changeIcon() {
    if (this.state.currentStatus.state === "DELIVERED") {
      return <Icon icon="check"></Icon>;
    } else {
      return <Icon icon="save" size="2x"></Icon>;
    }
  }

  changeIconForUndelivered() {
    if (this.state.currentStatus.state === "DELIVERED_TO_SENDER") {
      return <Icon icon="truck" size="2x"></Icon>;
    } else if (this.state.currentStatus.state === "DELIVERED") {
      return <Icon icon="check"></Icon>;
    } else {
      return <Icon icon="truck" size="2x"></Icon>;
    }
  }

  //get the current state
  getCurrentState() {
    switch (this.state.currentStatus.state) {
      case "DELIVERED":
        return null;

      case "TICKET_CREATED":
        return null;

      case "PACKAGE_RECEIVED":
        return null;

      default:
        return this.state.currentStatus.state;
    }
  }

  //set class according to current state
  setClassToCurrentState() {
    switch (this.state.currentStatus.state) {
      case "DELIVERED":
        return null;

      case "TICKET_CREATED":
        return null;

      case "PACKAGE_RECEIVED":
        return null;

      default:
        return "red";
    }
  }

  //set class to "Shipment delivered" of the progress bar
  setClasstoShipmentDeliveredInTheProgressBar() {
    if (this.state.currentStatus.state === "DELIVERED") {
      return "colored";
    } else {
      return "not-colored";
    }
  }

  //function to translate the page
  onChangeLanguageToArabic() {
    counterpart.setLocale("ar");
  }

  onChangeLanguageToEnglish() {
    counterpart.setLocale("en");
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="current-status">
          <div>
            <span
              className="red"
              type="button"
              onClick={this.onChangeLanguageToArabic}
            >
              عربى
            </span>

            <span
              className="red ms-2"
              type="button"
              onClick={this.onChangeLanguageToEnglish}
            >
              ENG
            </span>
          </div>
          <br />
          <ul className="list-group">
            <li className="list-group-item first-row">
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item border-0 list-group-header">
                  <Translate content="Tracking_Number"></Translate>{" "}
                  {this.state.trackingNo}
                </li>
                <li className="list-group-item border-0 list-group-header">
                  <Translate content="Latest_Update"></Translate>
                </li>
                <li className="list-group-item border-0 list-group-header">
                  <Translate content="Merchent_Name"></Translate>
                </li>
                <li className="list-group-item border-0 list-group-header">
                  <Translate content="Promised_Date"></Translate>
                </li>
              </ul>
              <ul className="list-group list-group-horizontal">
                <li className={this.checkState()}>
                  <Translate
                    content={this.state.currentStatus.state}
                  ></Translate>
                </li>
                <li className="list-group-item border-0 show-date">
                  <Translate content={this.state.theNameOfTheDay}></Translate>
                  {" " + this.state.newDate[0]}
                  {<br />}
                  <Translate content="at"></Translate>{" "}
                  {moment(new Date(this.state.newDate).getTime()).format("LT")}
                </li>
                <li className="list-group-item border-0">
                  {/* Merchent Name */}
                </li>
                <li className="list-group-item border-0">
                  {moment(new Date(this.state.promisedDate).getTime()).format(
                    "LL"
                  )}
                </li>
              </ul>
            </li>

            <li className="list-group-item second-row">
              <ul className="list-group list-group-horizontal second-row-items">
                {/* progress bar (steps) of the tracking  */}
                <div className="mt-4 mb-4 steps-bar">
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
                            accomplished ? this.setColorOfProgressBar() : null
                          } ${
                            this.state.currentStatus.state === "DELIVERED"
                              ? null
                              : this.setIconBig()
                          }`}
                        >
                          {this.changeIconForUndelivered()}
                        </div>
                      )}
                    </Step>
                    <Step>
                      {({ accomplished }) => (
                        <div
                          className={`indexedStep ${
                            accomplished ? this.setColorOfProgressBar() : null
                          } ${
                            this.state.currentStatus.state === "DELIVERED"
                              ? null
                              : this.setIconBig()
                          }`}
                        >
                          {this.changeIcon()}
                        </div>
                      )}
                    </Step>
                  </ProgressBar>
                </div>
              </ul>
              <ul className="list-group list-group-horizontal steps-details">
                <li className="list-group-item border-0 first-step">
                  <Translate content="Shipment_created"></Translate>
                </li>
                <li className="list-group-item border-0 ms-5 second-step">
                  <Translate content="The_shipment_has_been_received_from_the_merchant"></Translate>
                </li>
                <li className="list-group-item border-0 ms-5 third-step">
                  <Translate content="The_shipment_is_out_for_delivery"></Translate>
                  <br />
                  <span className={this.setClassToCurrentState()}>
                    <Translate content={this.getCurrentState()}></Translate>
                  </span>
                </li>
                <li className="list-group-item border-0 ms-5 fourth-step">
                  <span
                    className={this.setClasstoShipmentDeliveredInTheProgressBar()}
                  >
                    <Translate content="Shipment_delivered"></Translate>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="Shipment_Details">
          <div className="details_head">
            <div className="head_left">
              <Translate content="Tracking_Details"></Translate>
            </div>
          </div>

          <div className="clear"></div>
          <div className="details_head_table">
            <table>
              <tbody>
                <tr className="table-row table-header-first">
                  <th className="th-content">
                    <Translate content="Branch"></Translate>
                  </th>
                  <th className="th-content">
                    <Translate content="Date"></Translate>
                  </th>
                  <th className="th-content">
                    <Translate content="Time"></Translate>
                  </th>
                  <th className="th-content">
                    <Translate content="Details"></Translate>
                  </th>
                </tr>
                {this.state.transitEvents.map((transitEvent) => {
                  return (
                    <tr className="table-row">
                      <td className="td-content">
                        {transitEvent.hub ? transitEvent.hub : ""}
                      </td>
                      <td className="td-content">
                        {moment(
                          new Date(transitEvent.timestamp).getTime()
                        ).format("L")}
                      </td>
                      <td className="td-content">
                        {moment(
                          new Date(transitEvent.timestamp).getTime()
                        ).format("LT")}
                      </td>
                      <td className="td-content">
                        <Translate content={transitEvent.state}></Translate>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TrackingDetails;
