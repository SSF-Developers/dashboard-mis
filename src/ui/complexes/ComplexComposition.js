//Core
import React, { Component, Fragment } from "react";

//Redux
import { connect } from "react-redux";
import { pushComplexComposition, updateSelectedCabin } from "../../redux/actions/complex-actions";

//ReactUI
import { Button } from "reactstrap";

//CustomUI
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";

//JsStyles
import { colorTheme, whiteSurface, complexCompositionStyle, whiteSurfaceCircularBorder, selectedSurface } from "../../jsStyles/Style";
import icToilet from "../../assets/img/icons/ic_toilet.png";

//Functionality
import { executeGetComplexCompositionLambda } from "../../awsClients/complexLambdas";

// import { thingShadow } from "aws-iot-device-sdk";
import "./ComplexComposition.css";

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
                        alt=""
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

        // console.log("_cabinList", "" + cabinList.length)

        if (cabinList.length !== 0)
            return cabinList.map((cabinDetails, index) => {

                if (this.props.cabin !== undefined && this.props.cabin.thingName === cabinDetails.thingName)
                    return (<this.CabinSelected cabin={cabinDetails} />)
                return (<this.Cabin cabin={cabinDetails} />)
            })

        return (<div></div>)

    }

    Cabin = (props) => {
        // console.log(' this.props.cabinPayload-:👉', this.props.cabinPayload)

        return (

            <div style={{ ...whiteSurface, background: 'white', width: "100%", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <div style={{ ...complexCompositionStyle.cabinTitle, float: "left" }}>{props.cabin.shortThingName}</div>
                {
                    // this.props.cabinPayload !== undefined ?
                    //     <>
                    //         {
                    //             this.props.cabinPayload.clientId === props.cabin.thingName &&
                    //                 this.props.cabinPayload.eventType === "connected" ?
                    //                 <div
                    //                     style={{
                    //                         float: "left",
                    //                         width: "8px",
                    //                         height: "8px",
                    //                         background: "green",
                    //                         borderRadius: "10px"
                    //                     }}>
                    //                 </div>

                    //                 : props.cabin.connectionStatus === 'OFFLINE' ?
                    //                     <div
                    //                         style={{
                    //                             float: "left",
                    //                             width: "8px",
                    //                             height: "8px",
                    //                             background: "red",
                    //                             borderRadius: "10px"
                    //                         }}
                    //                     >
                    //                     </div>
                    //                     :
                    //                     <div
                    //                         style={{
                    //                             float: "left",
                    //                             width: "8px",
                    //                             height: "8px",
                    //                             background: "green",
                    //                             borderRadius: "10px"
                    //                         }}
                    //                     >
                    //                     </div>

                    //         }
                    //     </>
                    //     :
                    //     <>
                    //         {
                    //             props.cabin.connectionStatus === 'OFFLINE' ?
                    //                 <div
                    //                     style={{
                    //                         float: "left",
                    //                         width: "8px",
                    //                         height: "8px",
                    //                         background: "red",
                    //                         borderRadius: "10px"
                    //                     }}
                    //                 >
                    //                 </div>
                    //                 :
                    //                 <div
                    //                     style={{
                    //                         float: "left",
                    //                         width: "8px",
                    //                         height: "8px",
                    //                         background: "green",
                    //                         borderRadius: "10px"
                    //                     }}
                    //                 >
                    //                 </div>
                    //         }
                    //     </>
                    this.props.cabinPayload !== undefined &&
                        this.props.cabinPayload.clientId === props.cabin.thingName &&
                        this.props.cabinPayload.eventType === "connected" ?
                        <div
                            style={{
                                float: "left",
                                width: "8px",
                                height: "8px",
                                background: "green",
                                borderRadius: "10px"
                            }}>
                        </div>
                        :
                        this.props.cabinPayload !== undefined &&
                            this.props.cabinPayload.clientId === props.cabin.thingName &&
                            this.props.cabinPayload.eventType === "disconnected" ?
                            <div
                                style={{
                                    float: "left",
                                    width: "8px",
                                    height: "8px",
                                    background: "red",
                                    borderRadius: "10px"
                                }}>
                            </div>
                            : props.cabin.connectionStatus === 'OFFLINE' ?
                                <div
                                    style={{
                                        float: "left",
                                        width: "8px",
                                        height: "8px",
                                        background: "red",
                                        borderRadius: "10px"
                                    }}
                                >
                                </div>
                                :
                                <div
                                    style={{
                                        float: "left",
                                        width: "8px",
                                        height: "8px",
                                        background: "green",
                                        borderRadius: "10px"
                                    }}
                                >
                                </div>
                }
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

            <div style={{ ...selectedSurface, background: 'white', width: "100%", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <div style={{ ...complexCompositionStyle.cabinTitle, float: "left" }}>{props.cabin.shortThingName}</div>
                {
                    this.props.updatedCabinPayload !== undefined &&
                        this.props.updatedCabinPayload.clientId === props.cabin.thingName &&
                        this.props.updatedCabinPayload.eventType === "connected" ?
                        <div
                            style={{
                                float: "left",
                                width: "8px",
                                height: "8px",
                                background: "green",
                                borderRadius: "10px"
                            }}>
                        </div>
                        :
                        this.props.updatedCabinPayload !== undefined &&
                            this.props.updatedCabinPayload.clientId === props.cabin.thingName &&
                            this.props.updatedCabinPayload.eventType === "disconnected" ?
                            <div
                                style={{
                                    float: "left",
                                    width: "8px",
                                    height: "8px",
                                    background: "red",
                                    borderRadius: "10px"
                                }}>
                            </div>
                            : props.cabin.connectionStatus === 'OFFLINE' ?
                                <div
                                    style={{
                                        float: "left",
                                        width: "8px",
                                        height: "8px",
                                        background: "red",
                                        borderRadius: "10px"
                                    }}
                                >
                                </div>
                                :
                                <div
                                    style={{
                                        float: "left",
                                        width: "8px",
                                        height: "8px",
                                        background: "green",
                                        borderRadius: "10px"
                                    }}
                                >
                                </div>

                }
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
    return {
        complexStore: state.complexStore,
        complex: state.complexStore.complex,
        cabin: state.complexStore.cabin,
        hierarchy: state.complexStore.hierarchy,
        cabinPayload: state.complexStore.cabinPayload,
        updatedCabinPayload: state.complexStore.updatedCabinPayload

    };
};

const mapActionsToProps = { pushComplexComposition: pushComplexComposition, updateSelectedCabin: updateSelectedCabin };
export default connect(mapStateToProps, mapActionsToProps)(ComplexComposition);