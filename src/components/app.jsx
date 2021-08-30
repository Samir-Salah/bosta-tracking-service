import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SearchForTheShipment from "./searchForTheShipment";
import TrackingDetails from "./trackingDetails";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Switch>
            <Route path="/tracking-shipment" component={SearchForTheShipment} />
            <Route path="/tracking-details/:id" component={TrackingDetails} />
            <Route path="/" component={SearchForTheShipment} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
