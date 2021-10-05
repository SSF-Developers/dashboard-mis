//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import { pushComplexComposition } from "../../redux/actions/complex-actions";
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
import { NameValueList } from "../../components/DisplayLabels"
//JsStyles
import { colorTheme, whiteSurface, complexCompositionStyle, whiteSurfaceCircularBorder } from "../../jsStyles/Style"
import icToilet from "../../assets/img/icons/ic_toilet.png"
import icHome from "../../assets/img/icons/eco_home.png"
import NameValue from "../../Entity/NameValue";

//Functionality
import { executeGetComplexCompositionLambda } from "../../awsClients/complexLambdas";
import { thingShadow } from "aws-iot-device-sdk";

class ComplexComposition extends Component {



    constructor(props) {
        super(props);
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.fetchComplexComposition = this.fetchComplexComposition.bind(this);

    }

    componentDidMount() {
        if (this.props.complexStore[this.props.complex.name] == undefined)
            this.fetchComplexComposition();
    }



    async fetchComplexComposition() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeGetComplexCompositionLambda(this.props.complex.name);
            this.props.pushComplexComposition(this.props.hierarchy, this.props.complex, result);
            console.log("_propErr", this.props.hierarchy);
            console.log("_propErr", this.props.complex);
            console.log("_propErr", result);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log("_err", err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    render() {
        return (
            <div className="row" >
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <this.ComponentSelector />
            </div>

        );
    }

    ComponentSelector = () => {
        var complex = this.props.complexStore['TEST_AWS'];
        if (complex !== undefined)
            return (
                <Fragment>
                    <this.ComplexHeader />
                    <div style={{ overflow: "scroll", height: "80vh", width: "100%" }}>
                        <this.CabinTypeElement mwc />
                        <this.CabinTypeElement fwc />
                        <this.CabinTypeElement pwc />
                        <this.CabinTypeElement mur />

                    </div>
                </Fragment>
            );
        return (<div></div>)
    }

    ComplexHeader = () => {
        //var complex = this.props.complexStore[this.props.complex.name];
        var complex = this.props.complexStore['TEST_AWS'];
        return (
            <div style={{ width: "100%", display: "flex", alignItems: "center", background: colorTheme.primary, padding: "10px" }}>

                <div style={{
                    ...whiteSurfaceCircularBorder,
                    float: "left",
                    padding: "10px",
                    width: "50px",
                    height: "50px"
                }}>
                    <img
                        src={icToilet}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "5%",
                        }}
                    />
                </div>


                <div style={{ float: "left", marginLeft: "10px" }}>
                    <div style={{ ...complexCompositionStyle.complexTitleClient }}>
                        {"Complex: " + complex.complexDetails.name}
                    </div>
                    <div style={{ ...complexCompositionStyle.complexTitle }}>
                        {"Client: " + complex.complexDetails.client}
                    </div>
                    <div style={{ ...complexCompositionStyle.complexSubTitle }}>
                        {complex.hierarchy.state + ": " + complex.hierarchy.district + ": " + complex.hierarchy.city}
                    </div>

                </div>

            </div>
        )
    }

    CabinTypeElement = (props) => {
        //var complex = this.props.complexStore[this.props.complex.name];
        var complex = this.props.complexStore['TEST_AWS'];
        var C = [1, 1, 1, 1, 1, 1]
        var elementProps = {};
        if ('mwc' in props) {
            elementProps.logo = icHome;
            elementProps.title = "Male WC Cabins";
            elementProps.count = complex.complexComposition.mwcCabins.length;
            elementProps.cabins = complex.complexComposition.mwcCabins;
        }
        if ('fwc' in props) {
            elementProps.logo = icHome;
            elementProps.title = "Female WC Cabins";
            elementProps.count = complex.complexComposition.fwcCabins.length;
            elementProps.cabins = complex.complexComposition.fwcCabins;
        }
        if ('pwc' in props) {
            elementProps.logo = icHome;
            elementProps.title = "Physically Disabled WC Cabins";
            elementProps.count = complex.complexComposition.pwcCabins.length;
            elementProps.cabins = complex.complexComposition.pwcCabins;
        }
        if ('mur' in props) {
            elementProps.logo = icHome;
            elementProps.title = "Male Urinal Cabins";
            elementProps.count = complex.complexComposition.murCabins.length;
            elementProps.cabins = complex.complexComposition.murCabins;
        }

        if (elementProps.count == 0) {
            return (<div></div>)
        }

        return (
            <div style={{ ...whiteSurface, background: "white" }}>
                <div style={{
                    ...whiteSurfaceCircularBorder,
                    float: "left",
                    padding: "10px",
                    width: "50px",
                    height: "50px",
                }}>
                    <img
                        src={elementProps.logo}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "5%",
                        }}
                    />
                </div>


                <div style={{ float: "left", marginLeft: "10px" }}>
                    <div style={{ ...complexCompositionStyle.cabinTypeTitle }}>
                        {elementProps.title}
                    </div>
                    <div style={{ ...complexCompositionStyle.cabinTypeSubTitle }}>
                        {elementProps.count + " cabins listed"}
                    </div>
                </div>

                <div style={{ clear: "both", height: "10px", width: "100%" }} />

                <div className="row" style={{ clear: "both" }}>
                    {

                        elementProps.cabins.map((item, index) => {

                            return (<this.Cabin cabin={item} />)
                        })
                    }

                    {/* {
                        C.map((item) =>{
                            return (<this.Cabin cabin={elementProps.cabins[0]} />)
                        })
                    } */}

                    {/* <this.CabinHolder arr={C}/> */}
                </div>

            </div>
        );
    }

    CabinHolder = (props) => {

        props.arr.forEach(element => {
            return (<div>1</div>);
        });

    }

    Cabin = (props) => {
        var detailsList = [];
        detailsList.push(new NameValue("Smartness", props.cabin.smartnessLevel))
        detailsList.push(new NameValue("Usage Charge", props.cabin.usageChargeType))


        return (
            <div className="row" >
            <div className="col-md-12" style={{ width: "100%", marginTop: "10px" }}>
                <div style={{ border: "4px solid " + colorTheme.primary, height: "100px" }}>
                    <div style={{ background: colorTheme.primary, width: "100%", padding: "10px", height: "65px", display: "flexbox", alignItems: "center" }}>

                        <div style={{ ...complexCompositionStyle.cabinTitle, float: "left" }}>{props.cabin.shortThingName}</div>

                        <Button
                            style={{ float: "right", padding: "0px 0px 0px 0px" }}
                            color="primary"
                            className="px-4"

                        >
                            Details
                        </Button>
                    </div>

                    <div style={{
                        ...whiteSurfaceCircularBorder,
                        width: "95%",
                        height: "40px",
                        margin: "auto",
                        position: "relative",
                        top: "-20px"
                    }}>
                        <NameValueList labelStyle={{
                            ...complexCompositionStyle.cabinDetails,
                            width: "100%"
                        }}

                            data={detailsList} />
                    </div>
                </div>
            </div>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    console.log("_complexComposition", state.complexStore);

    // return {
    //     complexStore: state.complexStore
    // };

    var complexComposition = {
        "TEST_AWS": {
            complexDetails: {
                address: "Test_aws",
                client: "DEV_TEST",
                coco: "False",
                isSelected: false,
                lat: "15.0909090",
                lon: "76.0909090",
                name: "TEST_AWS",
                selected: false,
                uuid: "HP0501_03092021_000"
            }, complexComposition: { "cabinCount": 4, "mwcCabins": [{ "thingName": "MP1404_23072020_000_MWC_001", "cabinType": "WC", "shortThingName": "MWC_001", "smartnessLevel": "Extra-Premium", "userType": "MALE", "usageChargeType": "COIN", "suffix": "001" }], "fwcCabins": [{ "thingName": "MP1404_23072020_000_FWC_001", "cabinType": "WC", "shortThingName": "FWC_001", "smartnessLevel": "Extra-Premium", "userType": "FEMALE", "usageChargeType": "COIN", "suffix": "001" }], "pwcCabins": [{ "thingName": "MP1404_23072020_000_PWC_001", "cabinType": "WC", "shortThingName": "PWC_001", "smartnessLevel": "Extra-Premium", "userType": "PD", "usageChargeType": "COIN", "suffix": "001" }], "murCabins": [{ "thingName": "MP1404_23072020_000_MUR_001", "cabinType": "URINAL", "shortThingName": "MUR_001", "smartnessLevel": "Extra-Premium", "userType": "MALE", "usageChargeType": "COIN", "suffix": "001", "urinalCount": "2" }], "bwtCabins": [] },
            hierarchy: { state: 'HP', district: 'Mandi', city: 'Mandi' }
        }
    };
    console.log("_complexComposition", complexComposition);

    return {
        complexStore: complexComposition
    }
};

const mapActionsToProps = { pushComplexComposition: pushComplexComposition };
export default connect(mapStateToProps, mapActionsToProps)(ComplexComposition);