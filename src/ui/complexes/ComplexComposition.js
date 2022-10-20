//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import { pushComplexComposition, updateSelectedCabin } from "../../redux/actions/complex-actions";
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
import { colorTheme, whiteSurface, complexCompositionStyle, whiteSurfaceCircularBorder, selectedSurface } from "../../jsStyles/Style"
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
        if (this.props.complex !== undefined && this.props.complexStore[this.props.complex.name] == undefined)
            this.fetchComplexComposition();
    }

    componentDidUpdate() {
        if (this.props.complex !== undefined && this.props.complexStore[this.props.complex.name] == undefined)
            this.fetchComplexComposition();
    }

    async fetchComplexComposition() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeGetComplexCompositionLambda(this.props.complex.name);
            this.props.pushComplexComposition(this.props.hierarchy, this.props.complex, result);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    render() {
        return (
            <div className="row" style={{ marginTop: '10px', background: 'white', padding: '5px' }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <this.ComponentSelector />
            </div>

        );
    }

    ComponentSelector = () => {

        var complex = undefined;
        if (this.props.complex !== undefined)
            complex = this.props.complexStore[this.props.complex.name];
        //var complex = this.props.complexStore['TEST_AWS'];
        if (complex !== undefined)
            return (
                <Fragment>
                    <this.ComplexHeader />
                    <this.CabinList />
                </Fragment>
            );
        return (<div></div>)
    }

    ComplexHeader = () => {
        var complex = this.props.complexStore[this.props.complex.name];
        //var complex = this.props.complexStore['TEST_AWS'];
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

    CabinList = () => {
        var complex = this.props.complexStore[this.props.complex.name];
        //var complex = this.props.complexStore['TEST_AWS'];
        var cabinList = [];
        if (complex.complexComposition.mwcCabins !== undefined)
            complex.complexComposition.mwcCabins.forEach(cabinDetails => {
                cabinList.push(cabinDetails)
            });

        if (complex.complexComposition.fwcCabins !== undefined)
            complex.complexComposition.fwcCabins.forEach(cabinDetails => {
                cabinList.push(cabinDetails)
            });

        if (complex.complexComposition.pwcCabins !== undefined)
            complex.complexComposition.pwcCabins.forEach(cabinDetails => {
                cabinList.push(cabinDetails)
            });

        if (complex.complexComposition.murCabins !== undefined)
            complex.complexComposition.murCabins.forEach(cabinDetails => {
                cabinList.push(cabinDetails)
            });
        if (complex.complexComposition.bwtCabins !== undefined)
            complex.complexComposition.bwtCabins.forEach(cabinDetails => {
                cabinList.push(cabinDetails)
            });

        console.log("_cabinList", "" + cabinList.length)

        if (cabinList.length !== 0)
            return cabinList.map((cabinDetails, index) => {

                if (this.props.cabin !== undefined && this.props.cabin.thingName === cabinDetails.thingName)
                    return (<this.CabinSelected cabin={cabinDetails} />)
                return (<this.Cabin cabin={cabinDetails} />)
            })

        return (<div></div>)

    }

    Cabin = (props) => {
        return (

            <div style={{ ...whiteSurface, background: 'white', width: "100%", padding: "10px", display: "flexbox", alignItems: "center" }}>

                <div style={{ ...complexCompositionStyle.cabinTitle, float: "left" }}>{props.cabin.shortThingName}</div>

                <Button
                    style={{ float: "right", padding: "0px 0px 0px 0px" }}
                    color="primary"
                    className="px-4"
                    onClick={() => this.setSelectedCabin(props.cabin)}

                >
                    Details
                </Button>
            </div>
        );
    }

    CabinSelected = (props) => {
        return (

            <div style={{ ...selectedSurface, background: 'white', width: "100%", padding: "10px", display: "flexbox", alignItems: "center" }}>

                <div style={{ ...complexCompositionStyle.cabinTitle, float: "left" }}>{props.cabin.shortThingName}</div>

                <Button
                    style={{ float: "right", padding: "0px 0px 0px 0px" }}
                    color="primary"
                    className="px-4"
                    onClick={() => this.setSelectedCabin(props.cabin)}
                >
                    Details
                </Button>
            </div>
        );
    }

    setSelectedCabin = (cabin) => {
        this.props.updateSelectedCabin(cabin)
    }

}




const mapStateToProps = (state) => {
    // console.log("_onComplexSelection", state.complexStore);

    return {
        complexStore: state.complexStore,
        complex: state.complexStore.complex,
        cabin: state.complexStore.cabin,
        hierarchy: state.complexStore.hierarchy
    };

    // var complexComposition = {
    //     "TEST_AWS": {
    //         complexDetails: {
    //             address: "Test_aws",
    //             client: "DEV_TEST",
    //             coco: "False",
    //             isSelected: false,
    //             lat: "15.0909090",
    //             lon: "76.0909090",
    //             name: "TEST_AWS",
    //             selected: false,
    //             uuid: "HP0501_03092021_000"
    //         }, complexComposition: { "cabinCount": 4, "mwcCabins": [{ "thingName": "MP1404_23072020_000_MWC_001", "cabinType": "WC", "shortThingName": "MWC_001", "smartnessLevel": "Extra-Premium", "userType": "MALE", "usageChargeType": "COIN", "suffix": "001" }], "fwcCabins": [{ "thingName": "MP1404_23072020_000_FWC_001", "cabinType": "WC", "shortThingName": "FWC_001", "smartnessLevel": "Extra-Premium", "userType": "FEMALE", "usageChargeType": "COIN", "suffix": "001" }], "pwcCabins": [{ "thingName": "MP1404_23072020_000_PWC_001", "cabinType": "WC", "shortThingName": "PWC_001", "smartnessLevel": "Extra-Premium", "userType": "PD", "usageChargeType": "COIN", "suffix": "001" }], "murCabins": [{ "thingName": "MP1404_23072020_000_MUR_001", "cabinType": "URINAL", "shortThingName": "MUR_001", "smartnessLevel": "Extra-Premium", "userType": "MALE", "usageChargeType": "COIN", "suffix": "001", "urinalCount": "2" }], "bwtCabins": [] },
    //         hierarchy: { state: 'HP', district: 'Mandi', city: 'Mandi' }
    //     }
    // };
    // console.log("_complexComposition", complexComposition);

    // return {
    //     complexStore: complexComposition,
    //     complex: state.complexStore.complex,
    //     hierarchy: state.complexStore.hierarchy
    // }
};

const mapActionsToProps = { pushComplexComposition: pushComplexComposition, updateSelectedCabin: updateSelectedCabin };
export default connect(mapStateToProps, mapActionsToProps)(ComplexComposition);