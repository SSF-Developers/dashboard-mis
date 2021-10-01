//Core
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { setOwnAccessTree } from "../../redux/actions/authentication-actions";
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
import StateList from "../../components/accessTree/complexNav/SateList";
import NoDataComponent from "../../components/NoDataComponent";
//JsStyles
import { whiteSurface } from "../../jsStyles/Style"
//Functionality
import { executeFetchCompletedUserAccessTree } from "../../awsClients/administrationLambdas";
import { getAccessSummary, getComplexHierarchy } from "../../components/accessTree/accessTreeUtils";

class ComplexNavigation extends Component {

    constructor(props) {
        super(props);

        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.selectionSummary = React.createRef();
        this.stateList = React.createRef();
    }

    componentDidMount() {
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

        var bundle = {
            "history": this.props.history,
            "complex": complex,
            "hierarchy": getComplexHierarchy(this.props.accessTree, treeEdge)
        };
        this.props.history.push({ pathname: "/complex/details", bundle: bundle })
    }

    async initFetchCompletedUserAccessTreeAction() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeFetchCompletedUserAccessTree(this.props.user.userName);
            this.props.setOwnAccessTree(result);
            this.loadingDialog.current.closeDialog();
            console.log("_defineAccess", JSON.stringify(result));
        } catch (err) {
            console.log("_err", err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{
                    padding: "10px",
                    border:"2px solid red"
                }}
            >
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />

                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card>
                            <CardHeader>
                                <h1>Complexes</h1>
                            </CardHeader>

                            <CardBody>
                                
                            </CardBody>


                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card>
                            <CardBody>
                                <div className="col-md-10 offset-md-2" style={{  width: "80%", margin: "auto" }}>

                                    <div>
                

                                        <div class="col-md-2" style={{ float: "right" }}>
                                            <RxAccessSummary ref={this.selectionSummary} accessSummary={this.props.accessSummary} />
                                        </div>

                                    </div>

                                    <div class="col-md-8 offset-md-1" style={{ clear: "both" }}>
                                        <this.ComponentSelector />
                                    </div>

                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    ComponentSelector = () => {
        if (this.props.accessTree == undefined) {
            return (<NoDataComponent />);
        } else {
            console.log("_accessTree", this.props.accessTree);
            return (<StateList ref={this.stateList} listData={this.props.accessTree} handleComplexSelection={this.handleComplexSelection} />);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        accessTree: state.authentication.accessTree,
        accessSummary: getAccessSummary(state.authentication.accessTree)
    };
};

const mapActionsToProps = { setOwnAccessTree: setOwnAccessTree };
export default connect(mapStateToProps, mapActionsToProps)(ComplexNavigation);