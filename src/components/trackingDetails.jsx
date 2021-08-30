import React, { Component } from "react";
import axios from "axios";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Icon } from "rsuite";
import moment from "moment";
import i18n from "i18next";
import cookies from "js-cookie";
import i18next from "i18next";

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
  languages = [
    {
      code: "ar",
      name: "العربية",
      dir: "rtl",
    },
    {
      code: "en",
      name: "English",
    },
  ];
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

  trackingNumber = "9442984"; //6636234, 7234258, 9442984,1094442
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

    // const currentLanguageCode = cookies.get('i18next') || 'en';
    // const currentLanguage = this.languages.find(l => l.code === currentLanguageCode);
    // useEffect(() => {
    // document.body.dir= currentLanguage.dir || 'ltr'

    // }, [currentLanguage])
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

  render() {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="current-status">
            <div>test</div>
            {this.languages.map(({ code, name }) => (
              <button
                key={code}
                className="btn btn-outline-primary"
                onClick={() => i18next.changeLanguage(code)}
              >
                {name}
              </button>
            ))}
            <ul className="list-group">
              <li className="list-group-item first-row">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item border-0 list-group-header">
                    {i18n.t("Tracking Number")} {this.state.trackingNo}
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    {i18n.t("Latest Update")}
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    {i18n.t("Merchent Name")}
                  </li>
                  <li className="list-group-item border-0 list-group-header">
                    {i18n.t("Promised Date")}
                  </li>
                </ul>
                <ul className="list-group list-group-horizontal">
                  <li className={this.checkState()}>
                    {i18n.t(this.state.currentStatus.state)}
                  </li>
                  <li className="list-group-item border-0 show-date">
                    {i18n.t(this.state.theNameOfTheDay) +
                      " " +
                      this.state.newDate[0]}
                    {<br />}
                    at{" "}
                    {moment(new Date(this.state.newDate).getTime()).format(
                      "LT"
                    )}
                  </li>
                  <li className="list-group-item border-0">
                    {/* Merchent Name */}
                  </li>
                  <li className="list-group-item border-0">
                    {i18n.t(
                      moment(
                        new Date(this.state.promisedDate).getTime()
                      ).format("LL")
                    )}
                  </li>
                </ul>
              </li>

              <li className="list-group-item second-row">
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

                <ul className="list-group list-group-horizontal steps-details">
                  <li className="list-group-item border-0 first-step">
                    {i18n.t("Shipment created")}
                  </li>
                  <li className="list-group-item border-0 ms-5 second-step">
                    {i18n.t("The shipment has been received from the merchant")}
                  </li>
                  <li className="list-group-item border-0 ms-5 third-step">
                    {i18n.t("The shipment is out for delivery")}
                    <br />
                    <span className={this.setClassToCurrentState()}>
                      {i18n.t(this.getCurrentState())}
                    </span>
                  </li>
                  <li className="list-group-item border-0 ms-5 fourth-step">
                    <span
                      className={this.setClasstoShipmentDeliveredInTheProgressBar()}
                    >
                      {i18n.t("Shipment delivered")}
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="Shipment_Details">
            <div className="details_head">
              <div className="head_left">{i18n.t("Tracking Details")}</div>
            </div>

            <div className="clear"></div>
            <div className="details_head_table">
              <table>
                <tbody>
                  <tr className="table-row table-header-first">
                    <th className="th-content">{i18n.t("Branch")}</th>
                    <th className="th-content">{i18n.t("Date")}</th>
                    <th className="th-content">{i18n.t("Time")}</th>
                    <th className="th-content">{i18n.t("Details")}</th>
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
                          {i18n.t(transitEvent.state).charAt(0).toUpperCase() +
                            i18n.t(transitEvent.state).slice(1).toLowerCase()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TrackingDetails;
