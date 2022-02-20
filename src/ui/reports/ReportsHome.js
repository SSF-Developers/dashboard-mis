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
import { setDashboardData } from "../../redux/actions/dashboard-actions";
//CustomUI
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executeFetchDashboardLambda } from "../../awsClients/administrationLambdas"
//JsStyles
import { whiteSurface, colorTheme, dashboardStyle } from "../../jsStyles/Style"
import Stats from '../dashboard/Stats'
import ComplexNavigationFullHeight from "./ComplexNavigationFullHeight";
import NoDataComponent from "../../components/NoDataComponent";
import List from "../../components/list/userList/List";

//Functionality

class ReportsHome extends Component {

    reportParms = {complex:'',duration:''}

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.fetchDashboardData = this.fetchDashboardData.bind(this);
        this.setComplexSelection = this.setComplexSelection.bind(this);
        this.setDurationSelection = this.setDurationSelection.bind(this);
    }

    async fetchDashboardData() {
        this.loadingDialog.current.showDialog();
        try {
            console.log("_user", this.props.user);
            var result = await executeFetchDashboardLambda(this.props.user.userName, this.reportParms.duration, this.reportParms.complex);
            this.props.setDashboardData(result);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log('_lambda', err)
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    setComplexSelection(complex) {
        console.log('complex', complex)
        this.reportParms.complex = complex.name;
        this.fetchDashboardData();
    }

    setDurationSelection(duration) {
        console.log('duration', duration)
        this.reportParms.duration = duration;
        this.fetchDashboardData();
    }

    componentDidMount() {
        // if (!this.props.hasDashboardData)
        //     this.fetchDashboardData(15);

    };

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{}}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <table style={{ width: "100%", height: '100%', padding: '0px' }}>
                    <tbody>
                        <tr >
                            <td style={{ width: '20%' }}>
                                <div style={{ width: '100%', marginTop: '20px', padding: '10px', height: '100%', display: 'flex', alignItems: 'flex-start' }}>
                                    {/* <div style={{ width: '100%', height: '100px', background: 'red' }}></div> */}
                                    <ComplexNavigationFullHeight setComplexSelection={this.setComplexSelection} />
                                </div>

                            </td>

                            <td style={{ width: '70%' }}>
                                <div style={{ ...dashboardStyle.itemTitleLa, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Stats
                                        setDurationSelection={this.setDurationSelection}
                                        handleComplexSelection={this.handleComplexSelection}
                                        chartData={this.props.dashboardData.dashboardChartData}
                                        pieChartData={this.props.dashboardData.pieChartData}
                                        dataSummary={this.props.dashboardData.dataSummary} />
                                
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }

    ReportListSelector = (props) => {
        if (props.teamList.length === 0) {
          return <NoDataComponent />;
        }
        return <List data={props.teamList} />;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        dashboardData: state.dashboard.data,
        hasDashboardData: state.dashboard.hasData
    };
};

const mapActionsToProps = { setDashboardData: setDashboardData };
export default connect(mapStateToProps, mapActionsToProps)(ReportsHome);