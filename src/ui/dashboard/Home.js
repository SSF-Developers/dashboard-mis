import React, { Component } from "react";
import { connect } from "react-redux";
import { setDashboardData } from "../../redux/actions/dashboard-actions";
import { setClientList } from "../../redux/actions/administration-actions";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import {
  executeFetchDashboardLambda,
  executelistClientsLambda,
} from "../../awsClients/administrationLambdas";
import Summary from "./Summary";
import Stats from "./Stats";
import ActiveTickets from "./ActiveTickets";
import QuickConfig from "./QuickConfig";
import HealthStatus from "./HealthStatus";
import WaterLevelStatus from "./WaterLevelStatus";
import LiveStatus from "./LiveStatus";
class Home extends Component {
  reportParms = { complex: "all", duration: "15" };

  constructor(props) {
    super(props);
    this.state = {
      cabinDetails: "cabinDetailsData",
    };
    this.complexComposition = React.createRef();
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
    this.fetchDashboardData = this.fetchDashboardData.bind(this);
    this.setDurationSelection = this.setDurationSelection.bind(this);
  }

  componentDidMount() {
    // if (!this.props.hasDashboardData) this.fetchDashboardData(15);
    this.fetchDashboardData(15);
  }

  render() {
    return (
      <div
        className="animated fadeIn"
        style={{
          padding: "10px",
        }}
      >
        <MessageDialog ref={this.messageDialog} />
        <LoadingDialog ref={this.loadingDialog} />
        <this.ComponentSelector />
        {/* <QuickConfig /> */}
      </div>
    );
  }

  async fetchDashboardData(duration) {
    this.loadingDialog.current.showDialog();
    try {
      console.log("_user", this.props.user);
      var result = await executeFetchDashboardLambda(
        this.props.user.userName,
        this.reportParms.duration,
        this.reportParms.complex
      );

      this.props.setDashboardData(result);
      this.fetchAndInitClientList();
    } catch (err) {
      console.log("_lambda", err);
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message);
    }
  }


  async fetchAndInitClientList() {
    console.log("_lambda", "executelistClientsLambda()");
    //this.loadingDialog.current.showDialog();
    try {
      var result = await executelistClientsLambda();
      this.props.setClientList(result.clientList);
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message);
    }
  }


  setDurationSelection(duration) {
    console.log("duration", duration);
    this.reportParms.duration = duration;
    this.fetchDashboardData();
  }

  ComponentSelector = () => {
    console.log(this.props, "this.props.hasDashboardData");
    if (this.props.hasDashboardData) {
      return (
        <>
          <Summary
            chartData={this.props.dashboardData.dashboardChartData}
            bwtChartData={this.props.dashboardData.bwtdashboardChartData}
            dataSummary={this.props.dashboardData.dataSummary}
            bwtDataSummary={this.props.dashboardData.bwtdataSummary}
            uiResult={this.props.dashboardData.uiResult}
          />
          <Stats
            setDurationSelection={this.setDurationSelection}
            chartData={this.props.dashboardData.dashboardChartData}
            pieChartData={this.props.dashboardData.pieChartData}
            bwtChartData={this.props.dashboardData.bwtdashboardChartData}
            bwtPieChartData={this.props.dashboardData.bwtpieChartData}
            bwtDataSummary={this.props.dashboardData.bwtdataSummary}
            dashboardUpiChartData={this.props.dashboardData.dashboardUpiChartData}
            pieChartUpiData={this.props.dashboardData.pieChartUpiData}
            dataSummary={this.props.dashboardData.dataSummary}
            uiResult={this.props.dashboardData.uiResult.data}
          />
          <ActiveTickets data={this.props.dashboardData.activeTickets} />
          <HealthStatus data={this.props.dashboardData.faultyComplexes} />
          <LiveStatus data={this.props.dashboardData.connectionStatus} />
          <WaterLevelStatus data={this.props.dashboardData.lowWaterComplexes} />
          <QuickConfig uiResult={this.props.dashboardData.uiResult.data} />
        </>
      );
    }

    return <></>;
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    dashboardData: state.dashboard.data,
    hasDashboardData: state.dashboard.hasData,
  };
};

const mapActionsToProps = {
  setDashboardData: setDashboardData,
  setClientList: setClientList,
};
export default connect(mapStateToProps, mapActionsToProps)(Home);
