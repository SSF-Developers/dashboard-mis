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
//CustomUI
import ComplexComposition from "./ComplexComposition";
import ComplexNavigationCompact from "./ComplexNavigationCompact";
import CabinDetails from "./CabinDetails";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
//JsStyles
import { whiteSurface } from "../../jsStyles/Style"
//Functionality

class ComplexDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
    }

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{
                    padding: "10px"
                }}>

                <div className="row" >
                <div className="col-md-2" 
                style={{}}>
                    <MessageDialog ref={this.messageDialog} />
                    <ComplexNavigationCompact />
                    <ComplexComposition />

                </div>
                <div className="col-md-10" style={{}}>
                    <CabinDetails />
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
    };
};

const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(ComplexDetails);