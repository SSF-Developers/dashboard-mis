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
import CabinStatus from "./cabinDetails/CabinStatus";
import CabinHealth from "./cabinDetails/CabinHealth"
import LoadingDialog from "../../dialogs/LoadingDialog";
import MessageDialog from "../../dialogs/MessageDialog";
import { NameValueList } from "../../components/DisplayLabels"
//JsStyles
import { colorTheme, whiteSurface, complexCompositionStyle, whiteSurfaceCircularBorder } from "../../jsStyles/Style"
import icToilet from "../../assets/img/icons/ic_toilet.png"
import icHome from "../../assets/img/icons/eco_home.png"
import NameValue from "../../Entity/NameValue";


class CabinDetails extends Component {

    constructor(props) {
        super(props);
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="row" style={{padding:"10px", border:"2px solid red" }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />

                <CabinStatus />
                <CabinHealth />
            </div>

        );
    }

}

const mapStateToProps = (state) => {
};

const mapActionsToProps = {  };
export default connect(mapStateToProps, mapActionsToProps)(CabinDetails);