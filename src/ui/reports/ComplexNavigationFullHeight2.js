//Core
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { setOwnAccessTree } from "../../redux/actions/authentication-actions";
import { updateSelectedComplex } from '../../redux/actions/complex-actions';
import { whiteSurfaceNoMargin, colorTheme, whiteSurfaceCircularBorder, complexCompositionStyle } from '../../jsStyles/Style';
import icToilet from "../../assets/img/icons/ic_toilet.png"
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
import RxAccessSummary from "../../components/RxAccessSummary";
import StateList from "../../components/accessTree2/complexNavCompact/SateList";
import NoDataComponent from "../../components/NoDataComponent";
//JsStyles
import { whiteSurface } from "../../jsStyles/Style"
//Functionality
import { executeFetchCompletedUserAccessTree } from "../../awsClients/administrationLambdas";
import { getAccessSummary, getComplexHierarchy } from "../../components/accessTree/accessTreeUtils";


class ComplexNavigationFullHeight extends Component {


    constructor(props) {
        super(props);

        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.selectionSummary = React.createRef();
        this.stateList = React.createRef();
    }

    componentDidMount() {
        console.log("_defineAccess", 'componentDidMount()');
        if (this.props.accessTree == undefined)
            this.initFetchCompletedUserAccessTreeAction();
    }


    handleComplexSelection = (treeEdge) => {
        console.log("_handleComplexSelection", treeEdge);
        var stateIndex = treeEdge.stateIndex;
        var districtIndex = treeEdge.districtIndex;
        var cityIndex = treeEdge.cityIndex;
        var complexIndex = treeEdge.complexIndex;
        var complex = this.props.accessTree.country
            .states[stateIndex]
            .districts[districtIndex]
            .cities[cityIndex]
            .complexes[complexIndex];

        var hierarchy = getComplexHierarchy(this.props.accessTree, treeEdge);
        this.props.setComplexSelection(complex);
    }

    async initFetchCompletedUserAccessTreeAction() {
        try {
            var result = await executeFetchCompletedUserAccessTree(this.props.user.userName);
            console.log(result, "RESULT_RESULT");
            this.props.setOwnAccessTree(result);
            console.log("_defineAccess", result);
        } catch (err) {
            console.log('_defineAccess', "_err", err);
        }
    }

    render() {
        return (

            <div style={{ background: 'white', width: '100%', padding: '5px' }}>
                <this.Header />
                <this.ComponentSelector />
            </div>
        );
    }

    ComponentSelector = () => {
        if (this.props.accessTree == undefined) {
            return (<NoDataComponent />);
        } else {

            return (<StateList ref={this.stateList} listData={this.props.accessTree} handleComplexSelection={this.handleComplexSelection} />);
        }
    }

    Header = () => {
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
                        {"User Access Tree"}
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        accessTree: state.authentication.accessTree,
        accessSummary: getAccessSummary(state.authentication.accessTree)
    };
};

const mapActionsToProps = { setOwnAccessTree: setOwnAccessTree, updateSelectedComplex: updateSelectedComplex };
export default connect(mapStateToProps, mapActionsToProps)(ComplexNavigationFullHeight);