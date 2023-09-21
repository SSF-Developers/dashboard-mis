import React, { Component } from "react";
import { connect } from "react-redux";
import UCEMSConfig from './cabinActions/UCEMSConfig';
import CMSConfig from './cabinActions/CMSConfig';
import ODSConfig from './cabinActions/ODSConfig';
import CabinCommands from './cabinActions/CabinCommands';
import BwtCommands from './cabinActions/BwtCommands';
import BWTConfig from './cabinActions/BWTConfig';
import BWTCabinHealth from "./cabinDetails/BWTCabinHealth";
import CabinStatus from "./cabinDetails/CabinStatus";
import CabinHealth from "./cabinDetails/CabinHealth";
import UsageProfile from "./cabinDetails/UsageProfile";
import BWTUsageProfile from "./cabinDetails/BWTUsageProfile";
import ResetProfile from "./cabinDetails/ResetProfile";
import CabinUsageFeedback from './cabinDetails/CabinUsageFeedback';
import TurbidityAndWaterRecycled from './cabinDetails/TurbidityAndWaterRecycled';
import CabinCommandsContainer from './cabinDetails/CabinCommandsContainer';
import BWTCabinCommandsContainer from './cabinDetails/BWTCabinCommandsContainer';
import LastSyncStatus from "./cabinDetails/LastSyncStatus";
import UpiPayment from "./cabinDetails/UpiPayment";
import LoadingDialog from "../../dialogs/LoadingDialog";
import MessageDialog from "../../dialogs/MessageDialog";
import { getBWTResetProfileDisplayData } from './utils/BWTComplexUtils';
import { getResetProfileDisplayData, getUpiPaymentDisplayData } from './utils/ComplexUtils';
import { executeGetCabinDetailsLambda, executeGetBWTComplexCompositionLambda } from "../../awsClients/complexLambdas";

class CabinDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.ucemsConfig = React.createRef();
        this.cmsConfig = React.createRef();
        this.odsConfig = React.createRef();
        this.bwtConfig = React.createRef();
        this.cabinCommands = React.createRef();
        this.bwtCommands = React.createRef();

    }

    currentCabinThingName = ''

    componentDidUpdate() {
        if (
            this.props.cabin !== undefined &&
            this.currentCabinThingName !== this.props.cabin.thingName
        ) {
            this.currentCabinThingName = this.props.cabin.thingName;
            this.loadingDialog.current.showDialog();
            this.fetchCabinDetails();
        }
    }

    async fetchCabinDetails() {
        this.loadingDialog.current.showDialog();
        let thingGroupName = this.props.cabin.thingName
        try {
            if (thingGroupName.includes("BWT")) {
                var result = await executeGetBWTComplexCompositionLambda(
                    this.props.cabin.thingName
                );
                this.loadingDialog.current.closeDialog();
                this.setState({
                    cabinDetails: result
                });
            } else {
                var result = await executeGetCabinDetailsLambda(
                    this.props.cabin.thingName
                );
                this.loadingDialog.current.closeDialog();
                this.setState({
                    cabinDetails: result
                });
            }
        } catch (err) {
            console.log('_fetchCabinDetails', "_err", err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    render() {
        // console.log('_props_01: 👉', this.props)
        var complex = undefined;
        if (this.props.complex !== undefined)
            complex = this.props.complexStore[this.props.complex.name];
        return (
            <div className="row">
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <UCEMSConfig
                    ref={this.ucemsConfig}
                    loadingDialog={this.loadingDialog}
                    messageDialog={this.messageDialog}
                    complex={complex}
                    cabin={this.props.cabin}
                    user={this.props.user}
                />
                <CMSConfig
                    ref={this.cmsConfig}
                    loadingDialog={this.loadingDialog}
                    messageDialog={this.messageDialog}
                    complex={complex}
                    cabin={this.props.cabin}
                    user={this.props.user}
                />
                <ODSConfig
                    ref={this.odsConfig}
                    loadingDialog={this.loadingDialog}
                    messageDialog={this.messageDialog}
                    complex={complex}
                    cabin={this.props.cabin}
                    user={this.props.user}
                />
                <BWTConfig
                    ref={this.bwtConfig}
                    loadingDialog={this.loadingDialog}
                    messageDialog={this.messageDialog}
                    complex={complex}
                    cabin={this.props.cabin}
                    user={this.props.user}
                />
                <CabinCommands
                    ref={this.cabinCommands}
                    loadingDialog={this.loadingDialog}
                    messageDialog={this.messageDialog}
                    complex={complex}
                    cabin={this.props.cabin}
                    user={this.props.user}
                />
                <BwtCommands
                    ref={this.bwtCommands}
                    loadingDialog={this.loadingDialog}
                    messageDialog={this.messageDialog}
                    complex={complex}
                    cabin={this.props.cabin}
                    user={this.props.user}
                />
                <this.ComponenetSelector />
            </div>
        );
    }


    ComponenetSelector = () => {
        // console.log('_props: 👉', this.props)
        if (this.state.cabinDetails == undefined) {
            return (<div />)
        } else if (this.props.cabin.cabinType === "BWT") {
            return (
                <div style={{ width: '95%', margin: 'auto' }}>
                    <TurbidityAndWaterRecycled
                        turbidityAndWaterRecycled={this.state.cabinDetails.turbidityAndWaterRecycled}
                        uiResult={this.props.uiResult.data}
                    />
                    <BWTCabinHealth
                        cabinHealth={this.state.cabinDetails.health}
                        uiResult={this.props.uiResult.data}
                    />
                    <BWTCabinCommandsContainer
                        loadingDialog={this.loadingDialog}
                        bwtConfig={this.bwtConfig}
                        bwtCommands={this.bwtCommands}
                        cabinDetails={this.state.cabinDetails}
                    />
                    <BWTUsageProfile
                        usageProfile={this.state.cabinDetails.usageProfile}
                        uiResult={this.props.uiResult.data}
                    />
                    {
                        this.props.uiResult.data.collection_stats === "true" ?
                            null : (
                                <UpiPayment
                                    upiPaymentList={getUpiPaymentDisplayData(this.state.cabinDetails.upiPaymentList)}
                                />
                            )
                    }
                    <ResetProfile resetProfile={getBWTResetProfileDisplayData(this.state.cabinDetails.resetProfile)} />
                    <LastSyncStatus
                        liveStatusResult={this.state.cabinDetails.liveStatusResult}
                        cabinHealth={this.state.cabinDetails.health}
                    />
                </div>
            )

        } else {
            return (
                <div style={{ width: '95%', margin: 'auto' }}>
                    <CabinUsageFeedback
                        usageAndFeedback={this.state.cabinDetails.usageAndFeedback}
                        uiResult={this.props.uiResult.data}
                    />
                    <CabinStatus
                        cabinStatus={this.state.cabinDetails.aqiLumen}
                        uiResult={this.props.uiResult.data}
                    />
                    <CabinHealth
                        cabinHealth={this.state.cabinDetails.health}
                        uiResult={this.props.uiResult.data}
                    />
                    <CabinCommandsContainer
                        loadingDialog={this.loadingDialog}
                        ucemsConfig={this.ucemsConfig}
                        cmsConfig={this.cmsConfig}
                        odsConfig={this.odsConfig}
                        cabinCommands={this.cabinCommands}
                        cabinDetails={this.state.cabinDetails}

                    />
                    <UsageProfile
                        usageProfile={this.state.cabinDetails.usageProfile}
                        uiResult={this.props.uiResult.data}
                    />
                    {
                        this.props.uiResult.data.collection_stats === "true" ?
                            (
                                <UpiPayment
                                    upiPaymentList={getUpiPaymentDisplayData(this.state.cabinDetails.upiPaymentList)}
                                />
                            ) : null
                    }

                    <ResetProfile resetProfile={getResetProfileDisplayData(this.state.cabinDetails.resetProfile)} />
                    <LastSyncStatus
                        liveStatusResult={this.state.cabinDetails.liveStatusResult}
                        cabinHealth={this.state.cabinDetails.health}
                    />
                </div>
            );
        }
    }
}


const mapStateToProps = (state) => {
    return {
        complexStore: state.complexStore,
        cabin: state.complexStore.cabin,
        complex: state.complexStore.complex,
        user: state.authentication.user,
        uiResult: state.dashboard.data.uiResult,
        hasData: state.dashboard.hasData,
    };
};

const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(CabinDetails);