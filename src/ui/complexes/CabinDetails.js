//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import {executeGetCabinDetailsLambda} from "../../awsClients/complexLambdas";
import UCEMSConfig from './cabinActions/UCEMSConfig';
import CMSConfig from './cabinActions/CMSConfig';
import ODSConfig from './cabinActions/ODSConfig';
import CabinCommands from './cabinActions/CabinCommands';


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
import CabinStatus from "./cabinDetails/CabinStatus";
import CabinHealth from "./cabinDetails/CabinHealth";
import UsageProfile from "./cabinDetails/UsageProfile";
import ResetProfile from "./cabinDetails/ResetProfile";
import CabinUsageFeedback from './cabinDetails/CabinUsageFeedback';
import CabinCommandsContainer from './cabinDetails/CabinCommandsContainer';
import LoadingDialog from "../../dialogs/LoadingDialog";
import MessageDialog from "../../dialogs/MessageDialog";
import { NameValueList } from "../../components/DisplayLabels"
//JsStyles
import { colorTheme, whiteSurface, complexCompositionStyle, whiteSurfaceCircularBorder } from "../../jsStyles/Style"
import icToilet from "../../assets/img/icons/ic_toilet.png"
import icHome from "../../assets/img/icons/eco_home.png"
import NameValue from "../../Entity/NameValue";
import {getUsageProfileDisplayData,getResetProfileDisplayData} from './utils/ComplexUtils'

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
        this.cabinCommands = React.createRef();
    }

    componentDidMount() {
        // this.loadingDialog.current.showDialog();
        // this.fetchCabinDetails(); 
    }

    currentCabinThingName = ''
    componentDidUpdate(){
        
        if(this.props.cabin !== undefined && this.currentCabinThingName !== this.props.cabin.thingName){
            this.currentCabinThingName = this.props.cabin.thingName;
            this.loadingDialog.current.showDialog();
            this.fetchCabinDetails(); 
        }
    }

    async fetchCabinDetails() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeGetCabinDetailsLambda(this.props.cabin.thingName);
            this.loadingDialog.current.closeDialog();
            this.setState({
                cabinDetails: result
            });

        } catch (err) {
            console.log('_fetchCabinDetails',"_err", err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    render() {
        var complex = undefined;
        if(this.props.complex !== undefined)
         complex = this.props.complexStore[this.props.complex.name]
        return (
            <div className="row">
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <UCEMSConfig 
                ref={this.ucemsConfig} 
                loadingDialog={this.loadingDialog} 
                messageDialog={this.messageDialog}
                complex = {complex}
                cabin = {this.props.cabin} 
                user = {this.props.user}
                />
                <CMSConfig 
                ref={this.cmsConfig} 
                loadingDialog={this.loadingDialog} 
                messageDialog={this.messageDialog} 
                complex = {complex}
                cabin = {this.props.cabin} 
                user = {this.props.user}
                />
                <ODSConfig 
                ref={this.odsConfig} 
                loadingDialog={this.loadingDialog} 
                messageDialog={this.messageDialog}
                complex = {complex}
                cabin = {this.props.cabin} 
                user = {this.props.user}
                />
                <CabinCommands
                ref={this.cabinCommands} 
                loadingDialog={this.loadingDialog} 
                messageDialog={this.messageDialog}
                complex = {complex}
                cabin = {this.props.cabin} 
                user = {this.props.user}
                />
                <this.ComponenetSelector />
            </div>

        );
    }

    ComponenetSelector = () => {
        console.log('_cabinDetails',this.state.cabinDetails)
        if(this.state.cabinDetails == undefined){
            return(<div />)
        }else{
            return(
            <div style={{width:'95%', margin:'auto'}}>
                <CabinUsageFeedback usageAndFeedback={this.state.cabinDetails.usageAndFeedback}/>
                <CabinStatus cabinStatus={this.state.cabinDetails.aqiLumen}/>
                <CabinHealth cabinHealth={this.state.cabinDetails.health}/>
                <CabinCommandsContainer 
                loadingDialog ={this.loadingDialog}
                ucemsConfig={this.ucemsConfig} 
                cmsConfig={this.cmsConfig}
                odsConfig={this.odsConfig} 
                cabinCommands = {this.cabinCommands}
                cabinDetails={this.state.cabinDetails}
                
                />
                <UsageProfile usageProfile={getUsageProfileDisplayData(this.state.cabinDetails.usageProfile)} />
                <ResetProfile resetProfile={getResetProfileDisplayData(this.state.cabinDetails.resetProfile)} />

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
        user: state.authentication.user
    };
};

const mapActionsToProps = {  };
export default connect(mapStateToProps, mapActionsToProps)(CabinDetails);