import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import {
    dashboardStyle,
    whiteSurface,
    colorTheme,
    whiteSurfaceCircularBorder,
} from "../../jsStyles/Style";
import { NoFaultElement, FaultHeader, NoFaultHeader } from "../../components/DisplayLabels";
import icToilet from "../../assets/img/icons/ic_toilet.png";
import icEarth from "../../assets/img/icons/eco_earth.png";
import { LiveTable } from "./LiveTable";
import { connect } from "react-redux";
import { setLiveData } from "../../redux/actions/dashboard-actions";

class LiveStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: "cabinDetailsData",
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
    }
    state = {
        visibility: false,
        visibility1: false
    };
    toggleDialog = () => {
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };
    toggleDialog1 = () => {
        this.setState((state, props) => ({
            visibility1: !state.visibility1
        }));
    };

    showDialog = (onClickAction) => {
        this.title = 'LIVE STATUS';
        if (onClickAction !== undefined)
            this.onClickAction = onClickAction
        else
            this.onClickAction = undefined
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };
    showDialog1 = (onClickAction1) => {
        console.log("table", onClickAction1)
        this.props.setLiveData(onClickAction1.table)
        this.title1 = onClickAction1.complex.name;
        this.lat = onClickAction1.complex.lat;
        this.lon = onClickAction1.complex.lon;
        if (onClickAction1 !== undefined)
            this.onClickAction1 = onClickAction1
        else
            this.onClickAction1 = undefined
        this.setState((state, props) => ({
            visibility1: !state.visibility1
        }));
    };

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{ ...whiteSurface, background: "white", marginTop: "20px" }}
            >
                <this.HeaderSelector />
                <div
                    style={{
                        width: "100%",
                        height: "200px",
                        display: "flexbox",
                        alignItems: "center",
                        overflowY: "auto",
                    }}
                >
                    <this.ComponentSelector />
                </div>
            </div>
        );
    }

    HeaderSelector = () => {
        if (this.props.data !== undefined && this.props.data.length > 0) {
            return (
                <FaultHeader
                    title="Live Status "
                    label={this.props.data.length + " Complexe(s) Reported"}
                />
            );
        }
        return (
            <NoFaultHeader title="Live Status" label="All units are Online" />
        );
    };

    ComponentSelector = () => {
        if (this.props.data !== undefined && this.props.data.length !== 0) {
            var displayData = [...this.props.data];
            var displayData2 = [...this.props.data];
            if (this.props.data.length > 10) {
                displayData = this.props.data.slice(0, 10);
                displayData2 = this.props.data
            }
            return (
                <div className="row">
                    <Modal
                        isOpen={this.state.visibility}
                        toggle={this.isEnabled}
                        className={"modal-xl"}
                    >
                        <ModalHeader style={{ background: '#5DC0A6', color: `white` }} toggle={this.toggleDialog}>{this.title}</ModalHeader>
                        <ModalBody
                            style={{
                                width: "100%",
                                height: '600px',
                                overflowY: 'scroll'
                            }}
                        >
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "360px 360px 360px"
                            }}>
                                <this.ComplexStatusItem3 displayData2={displayData2} />
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                className="px-4"
                                outline
                                onClick={this.toggleDialog}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal
                        isOpen={this.state.visibility1}
                        toggle={this.isEnabled}
                        className={"modal-xl"}
                    >
                        <ModalHeader
                            style={{
                                background: '#5DC0A6',
                                color: `white`
                            }}
                            toggle={this.toggleDialog1}
                        >
                            <div
                                style={{}}
                            >
                                <div>
                                    Complex : {this.title1}
                                </div>
                                {/* <div>
                                    Latitude : {this.lat}
                                    Longitude : {this.lon}

                                </div> */}
                            </div>
                        </ModalHeader>
                        <ModalBody
                            style={{
                                width: "100%",
                                height: '200px',
                            }}
                        >
                            <div style={{}} >
                                <LiveTable />
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                className="px-4"
                                outline
                                onClick={this.toggleDialog1}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    {displayData.map((item, index) => this.ComplexStatusItem(item))}

                    {
                        displayData2.length > 10 ? (this.ComplexStatusItem2(displayData2)) :
                            null
                    }


                </div >
            );
        }
        return (
            <div
                className="col-md-12"
                style={{ margin: "10px 0px 0px 0px", padding: "0px 0px 0px 0px" }}
            >
                <NoFaultElement
                    icon={icEarth}
                    title="No active faults listed. Faults once detected will be listed here."
                />
            </div>
        );
    };

    ComplexStatusItem = (props) => {
        return (
            <div className="col-md-4" style={{}}>
                <div
                    style={{
                        border: "2px solid #5DC0A6",
                        height: "120px",
                        margin: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: colorTheme.primary,
                            height: "60px",
                            padding: "10px",
                        }}
                    >
                        <div
                            style={{
                                ...whiteSurfaceCircularBorder,
                                float: "left",
                                padding: "10px",
                                width: "30px",
                                height: "30px",
                            }}
                        >
                            <img
                                src={icToilet}
                                alt=""
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "5%",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                ...dashboardStyle.itemTitle,
                                float: "left",
                                marginLeft: "10px",
                            }}
                        >
                            {props.complex.name}
                        </div>
                    </div>

                    <div
                        style={{
                            ...whiteSurface,
                            background: "white",
                            margin: "-8px 10px 0px 10px",
                            padding: "10px",
                        }}
                    >
                        <div style={{ ...dashboardStyle.itemDescriprtion }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div
                                    style={{
                                        float: "left",
                                        width: "5px",
                                        height: "5px",
                                        background: "red",
                                    }}
                                />

                                <div
                                    style={{
                                        ...dashboardStyle.itemDescriprtion,
                                        float: "left",
                                        marginLeft: "10px",
                                    }}
                                >
                                    {props.count} Offline Cabin(s) reported.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    ComplexStatusItem2 = (props) => {
        // console.log("props", props)
        return (
            <div className="col-md-4" style={{}}>
                <div
                    style={{
                        border: "2px solid #5DC0A6",
                        height: "120px",
                        margin: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: colorTheme.primary,
                            height: "117px",
                            padding: "10px",
                        }}
                    >
                        <div
                            style={{
                                ...whiteSurfaceCircularBorder,
                                float: "left",
                                padding: "10px",
                                width: "38px",
                                height: "45px",
                            }}
                        >
                            <img
                                src={icToilet}
                                alt=""
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "5%",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                ...dashboardStyle.itemTitle,
                                float: "left",
                                marginLeft: "10px",
                            }}
                        >
                        </div>
                    </div>

                    <div
                        style={{
                            ...whiteSurface,
                            background: "white",
                            margin: "-90px 30px",
                            padding: "14px",
                        }}
                    >
                        <div style={{ ...dashboardStyle.itemDescriprtionBold2 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                                <div style={{ ...dashboardStyle.itemTitle, float: 'right' }}>
                                    <Button
                                        color="primary"
                                        className="px-4"
                                        outline
                                        onClick={() => { this.showDialog() }}

                                    >
                                        View All
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    ComplexStatusItem3 = (props) => {
        console.log('connectionStatus-mData -:👉', props)

        return props.displayData2.map((mData, index) => {
            return (
                <div className="col-md-12" style={{}}>
                    <div
                        style={{
                            border: "2px solid #5DC0A6",
                            height: "120px",
                            margin: "10px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                background: colorTheme.primary,
                                height: "60px",
                                padding: "10px",
                            }}
                        >
                            <div
                                style={{
                                    ...whiteSurfaceCircularBorder,
                                    float: "left",
                                    padding: "10px",
                                    width: "30px",
                                    height: "30px",
                                }}
                            >
                                <img
                                    src={icToilet}
                                    alt=""
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "5%",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    ...dashboardStyle.itemTitle,
                                    float: "left",
                                    marginLeft: "10px",
                                }}
                            >
                                {mData.complex.name}
                            </div>
                        </div>

                        <div
                            style={{
                                ...whiteSurface,
                                background: "white",
                                margin: "-8px 10px 0px 10px",
                                padding: "10px",
                            }}
                        >
                            <div style={{ ...dashboardStyle.itemDescriprtion }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <div
                                        style={{
                                            float: "left",
                                            width: "5px",
                                            height: "5px",
                                            background: "red",
                                        }}
                                    />

                                    <div
                                        style={{
                                            ...dashboardStyle.itemDescriprtion,
                                            float: "left",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        {mData.count} Offline Cabin(s) reported.
                                    </div>
                                    <div style={{ ...dashboardStyle.itemTitle, float: 'right' }}>
                                        <Button
                                            color="primary"
                                            className="px-4"
                                            outline
                                            onClick={() => { this.showDialog1(mData) }}

                                        >
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };
}
const mapStateToProps = (state) => {
    return {};
};

const mapActionsToProps = {
    setLiveData: setLiveData,
};

export default connect(mapStateToProps, mapActionsToProps)(LiveStatus);
