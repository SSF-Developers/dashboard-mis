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
import CabinDetails from "./CabinDetails";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
//JsStyles
import { whiteSurface } from "../../jsStyles/Style"
//Functionality

class ComplexDetails extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        var complex = {
            address: "Test_aws",
            client: "DEV_TEST",
            coco: "False",
            isSelected: false,
            lat: "15.0909090",
            lon: "76.0909090",
            name: "TEST_AWS",
            selected: false,
            uuid: "HP0501_03092021_000",
        }

        var hierarchy = {state:'HP', district:'Mandi',city:'Mandi'};
        return (
            <div
                className="animated fadeIn"
                style={{
                    padding: "10px"
                }}>

                <div className="row" >
                <div className="col-md-2" >
                    {/* <ComplexComposition 
                    complex= {this.props.location.bundle.complex}
                    hierarchy= {this.props.location.bundle.hierarchy}
                    /> */}
                    <ComplexComposition complex={complex} hierarchy={hierarchy}/>
                </div>
                <div className="col-md-10" style={{border:'2px solid red'}}>
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