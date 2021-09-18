import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { savePayload } from "./redux/actions/iccc-dashboard-actions";
import { connect } from "react-redux";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { useHistory } from "react-router";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AwsIot from "aws-iot-device-sdk";
import AWS from "aws-sdk";
import AWSMqttClient from "aws-mqtt";
import DefaultLayout from "./containers/DefaultLayout";


const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
// const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages

class App extends Component {
  constructor(props) {
  
    super(props);
    
  }

  state = {};

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount = () => {

  }

  render() {
    return (
      // <React.Suspense fallback={loading()}><DefaultLayout  {... this.props} /></React.Suspense>
      <DefaultLayout />
    );
  }
}




const mapStateToProps = (state) => {
  return {
    complexList: state.complexes,
  };
};

const mapActionsToProps = {
  handlePayload: savePayload,
};
export default connect(mapStateToProps, mapActionsToProps)(App);
