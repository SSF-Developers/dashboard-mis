//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import {executeGetCabinDetailsLambda} from "../../awsClients/complexLambdas"

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
import UsageProfile from "./cabinDetails/UsageProfile"
import ResetProfile from "./cabinDetails/ResetProfile"
import LoadingDialog from "../../dialogs/LoadingDialog";
import MessageDialog from "../../dialogs/MessageDialog";
import { NameValueList } from "../../components/DisplayLabels"
//JsStyles
import { colorTheme, whiteSurface, complexCompositionStyle, whiteSurfaceCircularBorder } from "../../jsStyles/Style"
import icToilet from "../../assets/img/icons/ic_toilet.png"
import icHome from "../../assets/img/icons/eco_home.png"
import NameValue from "../../Entity/NameValue";
import {getUsageProfileDisplayData} from './utils/ComplexUtils'

const cabinDetailsData = {"status":1,"aqiLumen":{"defautValues":false,"data":{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1609739100000","concentrationLuminosityStatus":"104","concentrationNH3":"112","timestamp":1609739338000,"concentrationCH4":"26","ttl":1633758549,"concentrationCO":"100","version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","initiatedFor":"PollutionStatus","TimeStamp":"04-10-2021 / 11:18:58","SERVER_TIMESTAMP":1633326300000,"SHORT_THING_NAME":"PWC_001","_ID":"60160","SendToDevic":"1","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"}},"health":{"defautValues":false,"data":{"CLIENT":"GSCDCL","CITY":"MP1404","flushHealth":"3","floorCleanHealth":"3","fanHealth":"3","ttl":1633335041,"freshWaterLevel":"3","Characteristic":"","lightHealth":"3","recycleWaterLevel":"3","tapHealth":"3","initiatedFor":"LockStatus","SERVER_TIMESTAMP":1632902400000,"SHORT_THING_NAME":"PWC_001","_ID":"67022","SendToDevic":"1","lockHealth":"3","DEVICE_TIMESTAMP":"1611907200000","timestamp":1611907830000,"odsHealth":"3","airDryerHealth":"3","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","chokeHealth":"3","lockStatus":"0","TimeStamp":"29-09-2021 / 13:40:30","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"}},"ucemsConfig":{"defautValues":false,"data":{"CLIENT":"GSCDCL","CITY":"MP1404","Collexpirytime":"","Entrychargeamount":"","Edis_airDryr":"","Characteristic":"01FF0113-BA5E-F4EE-5CA1-EB1E5E4B1CE0","Edis_recWtr":"","Edis_flush":"","Edis_floor":"","SHORT_THING_NAME":"PWC_001","_ID":"3","SendToDevic":"1","Edis_choke":"","Edis_tap":"","Occwaitexpirytime":"","DEVICE_TIMESTAMP":"1578823811000","Edis_cms":"","timestamp":1578823811000,"Edis_lock":"","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Edis_fan":"","Cabinpaymentmode":"","Edis_light":"","Exitdoortriggertimer":"","Feedbackexpirytime":"","TimeStamp":"12-08-2020 / 15:40:11","COMPLEX":"AIRTEL_CITYCENTRE","Edis_ods":"","Edis_freshWtr":"","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"}},"cmsConfig":{"defautValues":false,"data":{"CLIENT":"GSCDCL","Autolightenabled":"1","CITY":"MP1404","Airdryerautoontimer":"4","Lightautoofftime":"2","Fanautoofftimer":"10","Miniflushactivationtimer":"20","Characteristic":"01FF0112-BA5E-F4EE-5CA1-EB1E5E4B1CE0","fullflushdurationtimer":"4","Fanautoontimer":"45","Miniflushdurationtimer":"1","Exitafterawaytimer":"10","fullflushactivationtimer":"90","SHORT_THING_NAME":"PWC_001","_ID":"2","SendToDevic":"1","Autopreflush":"1","DEVICE_TIMESTAMP":"1578823801000","Autofloorenabled":"1","timestamp":1578823801000,"Autoairdryerenabled":"1","Lightautoontimer":"0","Autofanenabled":"1","version_code":2,"Airdryerdurationtimer":"15","DISTRICT":"DMP14","SendToAws":"0","Autominiflushenabled":"1","Floorcleancount":"5","TimeStamp":"12-08-2020 / 15:40:01","Autofullflushenabled":"1","COMPLEX":"AIRTEL_CITYCENTRE","Floorcleandurationtimer":"8","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"}},"odsConfig":{"defautValues":false,"data":{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1578823798000","Seatthreshold":"5","timestamp":1578823798000,"Ambientseatfactor":"9","Ambientfloorfactor":"35","version_code":2,"Characteristic":"01FF0114-BA5E-F4EE-5CA1-EB1E5E4B1CE0","DISTRICT":"DMP14","SendToAws":"0","TimeStamp":"12-08-2020 / 15:39:58","SHORT_THING_NAME":"PWC_001","_ID":"3","SendToDevic":"1","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP","Seatfloorratio":"6"}},"usageProfile":[{"CLIENT":"GSCDCL","Fantime":"317","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664427015,"Lighttime":"362","Characteristic":"","END_TIME":"1611895803000","Duration":"362","SERVER_TIMESTAMP":1632891015618,"SHORT_THING_NAME":"PWC_001","_ID":"6884","SendToDevic":"0","feedback":"Not Given","Entrytype":"-1","DEVICE_TIMESTAMP":"1611895803000","Floorclean":"0","RFID":"0","START_TIME":1611895441000,"timestamp":1611895803000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"1","Fullflush":"1","Airdryer":"0","TimeStamp":"29-09-2021 / 10:20:03","Amountcollected":"0","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"0","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664426185,"Lighttime":"39","Characteristic":"","END_TIME":"1611894973000","Duration":"39","SERVER_TIMESTAMP":1632890185569,"SHORT_THING_NAME":"PWC_001","_ID":"6883","SendToDevic":"0","feedback":"Not Given","Entrytype":"-1","DEVICE_TIMESTAMP":"1611894973000","Floorclean":"0","RFID":"0","START_TIME":1611894934000,"timestamp":1611894973000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"0","Fullflush":"0","Airdryer":"0","TimeStamp":"29-09-2021 / 10:06:13","Amountcollected":"0","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"885","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664426095,"Lighttime":"930","Characteristic":"","END_TIME":"1611893909000","Duration":"930","SERVER_TIMESTAMP":1632890095343,"SHORT_THING_NAME":"PWC_001","_ID":"6878","SendToDevic":"0","feedback":"Not Given","Entrytype":"1","DEVICE_TIMESTAMP":"1611893909000","Floorclean":"0","RFID":"0","START_TIME":1611892979000,"timestamp":1611893909000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"1","Fullflush":"1","Airdryer":"0","TimeStamp":"29-09-2021 / 09:48:29","Amountcollected":"5","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"0","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664425123,"Lighttime":"0","Characteristic":"","END_TIME":"1611893908000","Duration":"0","SERVER_TIMESTAMP":1632889123163,"SHORT_THING_NAME":"PWC_001","_ID":"6877","SendToDevic":"0","feedback":"Not Given","Entrytype":"1","DEVICE_TIMESTAMP":"1611893908000","Floorclean":"0","RFID":"0","START_TIME":1611893908000,"timestamp":1611893908000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"0","Fullflush":"0","Airdryer":"0","TimeStamp":"29-09-2021 / 09:48:28","Amountcollected":"5","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"0","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664424930,"Lighttime":"0","Characteristic":"","END_TIME":"1611892519000","Duration":"0","SERVER_TIMESTAMP":1632888930169,"SHORT_THING_NAME":"PWC_001","_ID":"6876","SendToDevic":"0","feedback":"Not Given","Entrytype":"5","DEVICE_TIMESTAMP":"1611892519000","Floorclean":"0","RFID":"0","START_TIME":1611892519000,"timestamp":1611892519000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"0","Fullflush":"0","Airdryer":"0","TimeStamp":"29-09-2021 / 09:25:19","Amountcollected":"0","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"0","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664423988,"Lighttime":"0","Characteristic":"","END_TIME":"1611892513000","Duration":"0","SERVER_TIMESTAMP":1632887988594,"SHORT_THING_NAME":"PWC_001","_ID":"6875","SendToDevic":"0","feedback":"Not Given","Entrytype":"5","DEVICE_TIMESTAMP":"1611892513000","Floorclean":"0","RFID":"0","START_TIME":1611892513000,"timestamp":1611892513000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"0","Fullflush":"0","Airdryer":"0","TimeStamp":"29-09-2021 / 09:25:13","Amountcollected":"0","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"328","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664423989,"Lighttime":"363","Characteristic":"","END_TIME":"1611834975000","Duration":"373","SERVER_TIMESTAMP":1632887989089,"SHORT_THING_NAME":"PWC_001","_ID":"6874","SendToDevic":"0","feedback":"Not Given","Entrytype":"1","DEVICE_TIMESTAMP":"1611834975000","Floorclean":"0","RFID":"0","START_TIME":1611834602000,"timestamp":1611834975000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"1","Fullflush":"1","Airdryer":"0","TimeStamp":"28-09-2021 / 17:26:15","Amountcollected":"5","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"426","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664423989,"Lighttime":"471","Characteristic":"","END_TIME":"1611831884000","Duration":"471","SERVER_TIMESTAMP":1632887989090,"SHORT_THING_NAME":"PWC_001","_ID":"6873","SendToDevic":"0","feedback":"Not Given","Entrytype":"1","DEVICE_TIMESTAMP":"1611831884000","Floorclean":"0","RFID":"0","START_TIME":1611831413000,"timestamp":1611831884000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"1","Fullflush":"1","Airdryer":"0","TimeStamp":"28-09-2021 / 16:34:44","Amountcollected":"5","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"590","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664423990,"Lighttime":"635","Characteristic":"","END_TIME":"1611830654000","Duration":"635","SERVER_TIMESTAMP":1632887990027,"SHORT_THING_NAME":"PWC_001","_ID":"6872","SendToDevic":"0","feedback":"Not Given","Entrytype":"1","DEVICE_TIMESTAMP":"1611830654000","Floorclean":"1","RFID":"0","START_TIME":1611830019000,"timestamp":1611830654000,"Miniflush":"0","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"1","Fullflush":"1","Airdryer":"0","TimeStamp":"28-09-2021 / 16:14:14","Amountcollected":"5","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"},{"CLIENT":"GSCDCL","Fantime":"78","CITY":"MP1404","Manualflush":"0","Amountremaining":"0","ttl":1664423990,"Lighttime":"111","Characteristic":"","END_TIME":"1611830479000","Duration":"123","SERVER_TIMESTAMP":1632887990028,"SHORT_THING_NAME":"PWC_001","_ID":"6871","SendToDevic":"0","feedback":"Not Given","Entrytype":"1","DEVICE_TIMESTAMP":"1611830479000","Floorclean":"0","RFID":"0","START_TIME":1611830356000,"timestamp":1611830479000,"Miniflush":"1","version_code":2,"DISTRICT":"DMP14","SendToAws":"0","Preflush":"1","Fullflush":"0","Airdryer":"0","TimeStamp":"28-09-2021 / 16:11:19","Amountcollected":"5","COMPLEX":"AIRTEL_CITYCENTRE","STATE":"MP","THING_NAME":"MP1404_23072020_000_PWC_001"}],"resetProfile":[{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611896174000","timestamp":1611896174000,"ttl":1664596793,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"130","BoardId":"ODS","TimeStamp":"29-09-2021 / 10:26:14","SHORT_THING_NAME":"PWC_001","_ID":"340","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611892438000","timestamp":1611892438000,"ttl":1664596794,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"64","BoardId":"UCEMS","TimeStamp":"29-09-2021 / 09:23:58","SHORT_THING_NAME":"PWC_001","_ID":"338","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611848693000","timestamp":1611848693000,"ttl":1664596794,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"1024","BoardId":"ODS","TimeStamp":"28-09-2021 / 21:14:53","SHORT_THING_NAME":"PWC_001","_ID":"337","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611820909000","timestamp":1611820909000,"ttl":1664596794,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"64","BoardId":"UCEMS","TimeStamp":"28-09-2021 / 13:31:49","SHORT_THING_NAME":"PWC_001","_ID":"336","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611819497000","timestamp":1611819497000,"ttl":1664859354,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"1024","BoardId":"ODS","TimeStamp":"28-09-2021 / 13:08:17","SHORT_THING_NAME":"PWC_001","_ID":"335","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611818650000","timestamp":1611818650000,"ttl":1664859355,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"1024","BoardId":"CMS","TimeStamp":"28-09-2021 / 12:54:10","SHORT_THING_NAME":"PWC_001","_ID":"334","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611817198000","timestamp":1611817198000,"ttl":1664859355,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"64","BoardId":"UCEMS","TimeStamp":"28-09-2021 / 12:29:58","SHORT_THING_NAME":"PWC_001","_ID":"333","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611806512000","timestamp":1611806512000,"ttl":1664859356,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"64","BoardId":"UCEMS","TimeStamp":"28-09-2021 / 09:31:52","SHORT_THING_NAME":"PWC_001","_ID":"330","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1611731810000","timestamp":1611731810000,"ttl":1664859356,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"130","BoardId":"CMS","TimeStamp":"27-09-2021 / 12:46:50","SHORT_THING_NAME":"PWC_001","_ID":"328","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"},{"CLIENT":"GSCDCL","CITY":"MP1404","DEVICE_TIMESTAMP":"1609736144000","timestamp":1609736144000,"ttl":1664859354,"version_code":2,"Characteristic":"","DISTRICT":"DMP14","SendToAws":"0","Resetsource":"1024","BoardId":"CMS","TimeStamp":"04-10-2021 / 10:25:44","SHORT_THING_NAME":"PWC_001","_ID":"357","SendToDevic":"0","COMPLEX":"AIRTEL_CITYCENTRE","THING_NAME":"MP1404_23072020_000_PWC_001","STATE":"MP"}]};


class CabinDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: cabinDetailsData
        };
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
    }

    componentDidMount() {
        // this.loadingDialog.current.showDialog();
        // this.fetchCabinDetails(); 
    }

    async fetchCabinDetails() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeGetCabinDetailsLambda('MP1404_23072020_000_PWC_001');
            this.loadingDialog.current.closeDialog();
            this.setState({
                cabinDetails: result
            });
        } catch (err) {
            console.log("_err", err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    render() {
        return (
            <div className="row">
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <this.ComponenetSelector />
            </div>

        );
    }

    ComponenetSelector = () => {
        if(this.state.cabinDetails == undefined){
            return(<div />)
        }else{
            return(
            <div style={{width:'100%'}}>
                <CabinStatus cabinStatus={this.state.cabinDetails.aqiLumen}/>
                <CabinHealth cabinHealth={this.state.cabinDetails.health}/>
                <UsageProfile usageProfile={getUsageProfileDisplayData(this.state.cabinDetails.usageProfile)} />
                <ResetProfile resetProfile={getUsageProfileDisplayData(this.state.cabinDetails.resetProfile)} />
            </div>
            );
        }
    }
}

  

const mapStateToProps = (state) => {
};

const mapActionsToProps = {  };
export default connect(mapStateToProps, mapActionsToProps)(CabinDetails);