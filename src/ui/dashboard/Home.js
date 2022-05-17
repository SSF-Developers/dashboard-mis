//Core
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { setDashboardData } from "../../redux/actions/dashboard-actions";
import { setClientList } from "../../redux/actions/administration-actions"

//ReactUI
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Button
} from "reactstrap";


//CustomUI
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executeFetchDashboardLambda, executelistClientsLambda } from "../../awsClients/administrationLambdas"

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

    reportParms = { complex: 'all', duration: '15' }

    constructor(props) {
        console.log("_ivalidSyntax","Home ::constructor()",props);
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        console.log("_ivalidSyntax","Home ::constructor()",props);
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.fetchDashboardData = this.fetchDashboardData.bind(this);
        this.setDurationSelection = this.setDurationSelection.bind(this);
        console.log("_ivalidSyntax","Home ::constructor() ::exit");
    }



    componentDidMount() {
        console.log("_ivalidSyntax", "Home ::componentDidMount()", this.props.hasDashboardData);
        if (!this.props.hasDashboardData)
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
                {/* <QuickConfig /> */}
            </div>
        );
    }



    async fetchDashboardData(duration) {
        console.log("_ivalidSyntax","Home ::fetchDashboardData()",duration);
        this.loadingDialog.current.showDialog();
        try {
            console.log("_user", this.props.user);
            var result = await executeFetchDashboardLambda(this.props.user.userName, this.reportParms.duration, this.reportParms.complex);
            this.props.setDashboardData(result);
            this.fetchAndInitClientList();
        } catch (err) {
            console.log('_lambda', err)
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    async fetchAndInitClientList() {
        console.log("_lambda", "executelistClientsLambda()")
        //this.loadingDialog.current.showDialog();
        try {
            var result = await executelistClientsLambda();
            this.props.setClientList(result.clientList);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    setDurationSelection(duration) {
        console.log('duration', duration)
        this.reportParms.duration = duration;
        this.fetchDashboardData();
    }

    ComponentSelector = () => {
        if (this.props.hasDashboardData) {
            return (
                <>
                    <Summary chartData={this.props.dashboardData.dashboardChartData} dataSummary={this.props.dashboardData.dataSummary} />
                    <Stats setDurationSelection={this.setDurationSelection} chartData={this.props.dashboardData.dashboardChartData} pieChartData={this.props.dashboardData.pieChartData} dataSummary={this.props.dashboardData.dataSummary} />
                    <ActiveTickets data={this.props.dashboardData.activeTickets} />
                    <HealthStatus data={this.props.dashboardData.faultyComplexes} />
                    <WaterLevelStatus data={this.props.dashboardData.lowWaterComplexes} />
                    <QuickConfig />
                </>
            )
        }

        return (<></>)
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        dashboardData: state.dashboard.data,
        hasDashboardData: state.dashboard.hasData
    };
};

const mapActionsToProps = { setDashboardData: setDashboardData, setClientList: setClientList };
export default connect(mapStateToProps, mapActionsToProps)(Home);