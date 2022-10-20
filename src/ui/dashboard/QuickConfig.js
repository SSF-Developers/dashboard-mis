//Core
import React, { Component } from "react";

//ReactUI
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Button
} from "reactstrap";
import LoadingDialog from "../../dialogs/LoadingDialog";
import MessageDialog from "../../dialogs/MessageDialog";
import QuickConfigDialog from "./quickConfig/QuickConfigDialog"
import { executelistClientsLambda } from "../../awsClients/administrationLambdas"
import { setConfigData } from "../../redux/actions/dashboard-actions"
import { dashboardStyle, whiteSurface, colorTheme, whiteSurfaceCircularBorder } from "../../jsStyles/Style"
import {
    UsageChargeConfigView,
    PreFlushConfigView,
    MiniFlushConfigView, FullFlushConfigView,
    FloorCleanConfigView,
    LightConfigView,
    FanConfigView,
    DataRequestConfigView
} from '../../components/QuickConfigLabels'
import { QuickConfigTabs } from '../../nomenclature/nomenclature'
import { validateConfigData, getLambdaPayload, getPublishTopicName } from "./quickConfig/utils/ConfigValidationHelper"
import { executePublishConfigLambda } from "../../awsClients/quickConfigLambdas"
//REDUX
import { connect } from "react-redux";
import { FastRewind } from "@material-ui/icons";


class QuickConfig extends Component {

    configViewData = {};

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };

        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.dialogQuickConfigUsageCharge = React.createRef();
        this.dialogQuickConfigFlush = React.createRef();
        this.dialogQuickConfigFloorClean = React.createRef();
        this.dialogQuickConfigLightAndFan = React.createRef();
        this.dialogQuickConfigDataRequest = React.createRef();
    }

    componentDidMount() {

    };

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{ ...whiteSurface, background: 'white', marginTop: '20px' }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <QuickConfigDialog
                    ref={this.dialogQuickConfigUsageCharge}
                    handleUpdate={this.handleConfigUpdate}
                    handleClick={this.handleSubmitConfig}
                    clientList={this.props.clientList}
                    activeTab={QuickConfigTabs.TAB_USAGE_CHARGE_CONFIG}
                    tabData={[
                        {
                            type: QuickConfigTabs.TAB_USAGE_CHARGE_CONFIG,
                            label: 'Usage Charge',
                            configView: this.usageChargeConfigView
                        }
                    ]}
                    configData={this.props.configData}

                />
                <QuickConfigDialog
                    ref={this.dialogQuickConfigFlush}
                    handleUpdate={this.handleConfigUpdate}
                    handleClick={this.handleSubmitConfig}
                    clientList={this.props.clientList}
                    activeTab={QuickConfigTabs.TAB_PRE_FLUSH_CONFIG}
                    tabData={[
                        {
                            type: QuickConfigTabs.TAB_PRE_FLUSH_CONFIG,
                            label: 'Pre Flush',
                            configView: this.preFlushConfigView
                        },
                        {
                            type: QuickConfigTabs.TAB_MINI_FLUSH_CONFIG,
                            label: 'Mini Flush',
                            configView: this.miniFlushConfigView
                        },
                        {
                            type: QuickConfigTabs.TAB_FULL_FLUSH_CONFIG,
                            label: 'Full Flush',
                            configView: this.fullFlushConfigView
                        }
                    ]}
                    configData={this.props.configData}
                />
                <QuickConfigDialog
                    ref={this.dialogQuickConfigFloorClean}
                    handleUpdate={this.handleConfigUpdate}
                    handleClick={this.handleSubmitConfig}
                    clientList={this.props.clientList}
                    activeTab={QuickConfigTabs.TAB_FLOOR_CLEAN_CONFIG}
                    tabData={[
                        {
                            type: QuickConfigTabs.TAB_FLOOR_CLEAN_CONFIG,
                            label: 'Floor Clean Config',
                            configView: this.floorCleanConfigView
                        }
                    ]}
                />
                <QuickConfigDialog
                    ref={this.dialogQuickConfigLightAndFan}
                    handleUpdate={this.handleConfigUpdate}
                    handleClick={this.handleSubmitConfig}
                    clientList={this.props.clientList}
                    activeTab={QuickConfigTabs.TAB_LIGHT_CONFIG}
                    tabData={[
                        {
                            type: QuickConfigTabs.TAB_LIGHT_CONFIG,
                            label: 'Light Config',
                            configView: this.lightConfigView
                        },
                        {
                            type: QuickConfigTabs.TAB_FAN_CONFIG,
                            label: 'Fan Config',
                            configView: this.fanConfigView
                        }
                    ]}
                    configData={this.props.configData}
                />
                <QuickConfigDialog
                    ref={this.dialogQuickConfigDataRequest}
                    handleUpdate={this.handleConfigUpdate}
                    handleClick={this.handleSubmitConfig}
                    clientList={this.props.clientList}
                    activeTab={QuickConfigTabs.TAB_DATA_REQUEST_CONFIG}
                    tabData={[
                        {
                            type: QuickConfigTabs.TAB_DATA_REQUEST_CONFIG,
                            label: 'Data Request Config',
                            configView: this.dataRequestConfigView
                        }
                    ]}
                    configData={this.props.configData}
                />

                <div style={{ ...dashboardStyle.title }}>
                    Quick Config
                </div>
                <div className='row' style={{ width: "100%", padding: "10px", height: '200px', display: "flexbox", alignItems: "center", overflowY: 'auto' }}>
                    {
                        this.props.uiResult.usage_charge === "true" &&
                        (
                            <this.DescriptionItem
                                title={"Usage Charge Config"}
                                label={"Configure payment charge and payment mode settings in one go."}
                                onClick={() => { this.dialogQuickConfigUsageCharge.current.showDialog() }}
                            />
                        )
                    }
                    <this.DescriptionItem
                        title={"Flush Config"}
                        label={"Configure payment charge and payment mode settings in one go."}
                        onClick={() => { this.dialogQuickConfigFlush.current.showDialog() }}
                    />
                    <this.DescriptionItem
                        title={"Floor Clean Config"}
                        label={"Configure payment charge and payment mode settings in one go."}
                        onClick={() => { this.dialogQuickConfigFloorClean.current.showDialog() }}
                    />
                    <this.DescriptionItem
                        title={"Light and Fan Config"}
                        label={"Configure payment charge and payment mode settings in one go."}
                        onClick={() => { this.dialogQuickConfigLightAndFan.current.showDialog() }}
                    />
                    <this.DescriptionItem
                        title={"Data Request Config"}
                        label={"Configure payment charge and payment mode settings in one go."}
                        onClick={() => { this.dialogQuickConfigDataRequest.current.showDialog() }}
                    />
                </div>
            </div>
        );
    }

    // ComponentSelector = () => {
    //     if(this.props.user != undefined){
    //        return <this.SuperAdminAcceess /> 
    //     }else

    //     return (<NoDataComponent />);
    // }

    DescriptionItem = (props) => {
        var border = ''
        return (
            <div className='col-md-4' style={{}}>


                <div style={{ border: '2px solid #5DC0A6', height: '110px', margin: "10px" }}>

                    <div style={{ background: colorTheme.primary, height: '60px', padding: '10px' }}>
                        <div style={{ ...dashboardStyle.itemTitle, float: 'left' }}>
                            {props.title}
                        </div>
                        <div style={{ ...dashboardStyle.itemTitle, float: 'right' }}>
                            <Button
                                style={{ color: "white", border: '2px solid white', margin: "auto" }}
                                color="primary"
                                className="px-4"
                                outline
                                onClick={props.onClick}
                            >
                                View
                            </Button>
                        </div>
                    </div>

                    <div style={{ ...whiteSurface, background: 'white', margin: '-8px 10px 0px 10px', height: '40px', padding: '10px' }}>
                        <div style={{ ...dashboardStyle.itemDescriprtion }}>
                            {props.label}
                        </div>
                    </div>


                </div>
            </div>
        )
    }

    configViewData = {}
    handleConfigUpdate = (configTab, id, value) => {
        var obj = this.configViewData[configTab];
        if (obj === undefined)
            obj = {};

        obj[id] = value
        this.configViewData[configTab] = obj;
        console.log("_handleConfigUpdate", this.configViewData)
        this.props.setConfigData(this.configViewData)
    }

    handleDataRequestConfigUpdate = () => {

    }


    usageChargeConfigView = () => <UsageChargeConfigView
        data={{
            'defaultEntryCharge': "",
            'defaultPaymentMode': ""
        }}
        handleUpdate={this.handleConfigUpdate} />

    preFlushConfigView = () => <PreFlushConfigView
        handleUpdate={this.handleConfigUpdate} />

    miniFlushConfigView = () => <MiniFlushConfigView
        handleUpdate={this.handleConfigUpdate} />

    fullFlushConfigView = () => <FullFlushConfigView
        handleUpdate={this.handleConfigUpdate} />

    floorCleanConfigView = () => <FloorCleanConfigView
        handleUpdate={this.handleConfigUpdate} />

    lightConfigView = () => <LightConfigView
        handleUpdate={this.handleConfigUpdate} />

    fanConfigView = () => <FanConfigView
        handleUpdate={this.handleConfigUpdate} />

    dataRequestConfigView = () => <DataRequestConfigView
        handleUpdate={this.handleDataRequestConfigUpdate} />

    async fetchAndInitClientList() {
        console.log("_lambda", "executelistClientsLambda()")
        this.loadingDialog.current.showDialog();
        try {
            var result = await executelistClientsLambda();
            this.props.setClientList(result.clientList);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    async submitConfig(configType, topic, payload, metadata) {
        this.loadingDialog.current.showDialog();
        try {
            payload = JSON.stringify(payload);
            metadata = JSON.stringify(metadata);
            var result = await executePublishConfigLambda(topic, payload, metadata);
            this.closeActiveQuickConfigDialogue(configType);
            this.messageDialog.current.showDialog(
                "Success",
                'New config submitted successfully'
            )
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log('_fetchCabinDetails', "_err", err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    handleConfigUpdate = (configTab, id, value) => {
        var obj = this.configViewData[configTab];
        if (obj === undefined)
            obj = {};

        obj[id] = value
        this.configViewData[configTab] = obj;
        console.log("_handleConfigUpdate", this.configViewData)
    }

    handleSubmitConfig = (configType) => {
        var validationResult = validateConfigData(configType, this.configViewData);
        console.log("_validateConfigData", "validationResult", validationResult);

        if (validationResult.isValidated) {
            var lambdaPayload = getLambdaPayload(configType, this.configViewData, this.props.userDetails);
            var publishTopic = getPublishTopicName(configType, this.configViewData);
            console.log("_lambdaPayload", publishTopic, lambdaPayload);

            this.submitConfig(configType, publishTopic, lambdaPayload.lambdaPayload, lambdaPayload.lambdaPayloadInfo)
        } else {
            this.messageDialog.current.showDialog("Validation Alert!", validationResult.message)
        }
    }

    closeActiveQuickConfigDialogue = (configType) => {
        if (configType == QuickConfigTabs.TAB_USAGE_CHARGE_CONFIG) {
            this.dialogQuickConfigUsageCharge.current.toggleDialog();
        }
    }

    handleDataRequestConfigUpdate = () => {

    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.authentication.user,
        clientList: state.administration.clientList,
        configData: state.dashboard.configData
    };
};

const mapActionsToProps = { setConfigData: setConfigData };

export default connect(mapStateToProps, mapActionsToProps)(QuickConfig);