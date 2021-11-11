//Core
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
//ReactUI
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Button
} from "reactstrap";
import {setDashboardData} from "../../redux/actions/dashboard-actions";
//CustomUI
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import {executeFetchDashboardLambda} from "../../awsClients/administrationLambdas"
//JsStyles
import { whiteSurface } from "../../jsStyles/Style"
import Summary from './Summary'
import Stats from './Stats'
import ActiveTickets from './ActiveTickets'
import QuickConfig from './QuickConfig'
import HealthStatus from './HealthStatus'
import WaterLevelStatus from './WaterLevelStatus'
//Functionality

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
    this.fetchDashboardData = this.fetchDashboardData.bind(this);
    }

    async fetchDashboardData(duration) {
        this.loadingDialog.current.showDialog();
        try{
          console.log("_user",this.props.user);
          var result = await executeFetchDashboardLambda(this.props.user.userName, duration);
          this.props.setDashboardData(result);
          this.loadingDialog.current.closeDialog();
        }catch(err){
            console.log('_lambda',err)
          this.loadingDialog.current.closeDialog();
          this.messageDialog.current.showDialog("Error Alert!",err.message)
        }
      }
      componentDidMount (){
        if(!this.props.hasDashboardData)
        this.fetchDashboardData(15);
         
      };

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{
                    padding: "10px"
                }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <this.ComponentSelector />

            </div>
        );
    }

    ComponentSelector = () => {
        if(this.props.hasDashboardData){
            return(
                <>
                <Summary />
                <Stats fetchDashboardData={this.fetchDashboardData} chartData={this.props.dashboardData.dashboardChartData} pieChartData={this.props.dashboardData.pieChartData} dataSummary = {this.props.dashboardData.dataSummary}/>
                <ActiveTickets data={this.props.dashboardData.activeTickets}/>
                <HealthStatus data={this.props.dashboardData.faultyComplexes}/>
                <WaterLevelStatus data={this.props.dashboardData.lowWaterComplexes}/>
                <QuickConfig />
                </>
            )
        }

        return(<></>)
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        dashboardData: state.dashboard.data,
        hasDashboardData: state.dashboard.hasData
    };
};

const mapActionsToProps = {setDashboardData: setDashboardData};
export default connect(mapStateToProps, mapActionsToProps)(Home);