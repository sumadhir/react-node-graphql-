import React, { Component } from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import routeOptions from "../app/routes/route";
import "./App.less";

class App extends Component {
  render() {
    let routes = routeOptions.routes.map(({ path, component, exact }, i) => (
      <Route
        key={Math.random() + "ROUTE_"}
        exact={exact}
        path={path}
        component={component}
      />
    ));
    return (
          <div className="app-container App">
            <Switch>
              {routes}
            </Switch>
          </div>
      
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
};

function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { },
    dispatch
  );
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    App
  )
);
