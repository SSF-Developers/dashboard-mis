import React from "react";
import { Button } from "reactstrap";
import { whiteSurface } from "../../jsStyles/Style"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executeFetchCompletedUserAccessTree, executeDefineUserAccessLambda } from "../../awsClients/administrationLambdas";
import { getTrimmedAccessTree, getAccessKeys } from "../../components/accessTree/accessTreeUtils"
import StateList from "../../components/accessTree/defineAccess/SateList";
import NoDataComponent from "../../components/NoDataComponent";
import { getSelectionSummary } from "../../components/accessTree/accessTreeUtils";
import { connect } from "react-redux";
import { setOwnAccessTree } from "../../redux/actions/authentication-actions";
import { TreeItemType } from "../../nomenclature/nomenclature"
import RxAccessSummary from "../../components/RxAccessSummary";

class MemberAccess extends React.Component {

    state = {

    };

    accessSummary = [];
    accessTree = undefined;

    constructor(props) {
        super(props);
        this.accessSummary = getSelectionSummary();
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.selectionSummary = React.createRef();
        this.stateList = React.createRef();
        this.initFetchCompletedUserAccessTreeAction = this.initFetchCompletedUserAccessTreeAction.bind(this);
        this.handleSubmitAction = this.handleSubmitAction.bind(this);
    }

    componentDidMount() {
        if (this.props.accessTree == undefined)
            this.initFetchCompletedUserAccessTreeAction();
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

    async handleSubmitAction() {
        console.log("_trimmedAccess", this.props.location.bundle);

        this.loadingDialog.current.showDialog();
        try {
            var trimmedAccessTree = await getTrimmedAccessTree(this.accessTree)
            var accessKeys = await getAccessKeys(trimmedAccessTree);

            var user = this.props.location.bundle.user;
            var defineAccessRequest = { "userName": user.userName, "userRole": user.userRole, "accessTree": trimmedAccessTree, "accessKeys": accessKeys }
            console.log("_defineAccess", JSON.stringify(defineAccessRequest));
            var defineAccessResult = await executeDefineUserAccessLambda(defineAccessRequest);
            console.log("_defineAccess", JSON.stringify(defineAccessResult));
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Success", "User access tree updated", () => { this.props.history.goBack(); this.props.history.goBack(); })

            // getTrimmedAccessTree(this.accessTree).then(result =>{
            //     console.log("_trimmedAccess1",JSON.stringify(result));
            //     getAccessKeys(result).then(r =>{
            //         console.log("_trimmedAccess2",JSON.stringify(r));
            //     })
            // });

        } catch (err) {
            console.log("_err", err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    handleUserSelection = (nodeType, treeEdge, selected) => {
        var stateIndex = treeEdge.stateIndex;
        var districtIndex = treeEdge.districtIndex;
        var cityIndex = treeEdge.cityIndex;
        var complexIndex = treeEdge.complexIndex;



        if (nodeType == TreeItemType.State) {
            this.accessTree.country.states[stateIndex].selected = selected;
        } else if (nodeType == TreeItemType.District) {
            this.accessTree.country.states[stateIndex].districts[districtIndex].selected = selected;
        } else if (nodeType == TreeItemType.City) {
            console.log("_itemExpansion", "City", treeEdge, selected);
            this.accessTree.country.states[stateIndex].districts[districtIndex].cities[cityIndex].selected = selected;
        } else if (nodeType == TreeItemType.Complex) {
            this.accessTree.country.states[stateIndex].districts[districtIndex].cities[cityIndex].complexes[complexIndex].selected = selected;
        }

        this.accessSummary = getSelectionSummary(this.accessTree);
        this.selectionSummary.current.setAccessSummary(this.accessSummary);
        this.stateList.current.updateData(this.accessTree);
    }




    render() {
        return (
            <div className="col-md-10 offset-md-2" style={{ ...whiteSurface, width: "80%", margin: "auto" }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <div>
                    <Button
                        style={{ float: "left", margin: "10px" }}
                        outline
                        color="primary"
                        className="px-4"
                        onClick={this.handleSubmitAction}
                    >
                        Define Access
                    </Button>

                    <div class="col-md-2" style={{ float: "right" }}>
                        <RxAccessSummary ref={this.selectionSummary} accessSummary={this.accessSummary} />
                    </div>

                </div>

                <div class="col-md-8 offset-md-1" style={{ clear: "both" }}>
                    {/* <StateList listData={this.listData} /> */}
                    <this.ComponentSelector />

                </div>

            </div>
        );
    }

    ComponentSelector = () => {
        if (this.props.accessTree == undefined) {
            return (<NoDataComponent />);
        } else {
            if (this.accessTree == undefined) {
                //this.accessTree = this.props.accessTree.country.states;
                this.accessTree = this.props.accessTree;
                console.log("_accessTree", this.accessTree);
            }

            return (<StateList ref={this.stateList} listData={this.accessTree} handleUserSelection={this.handleUserSelection} />);
        }
    }
}





// MemberAccess.propTypes = {
//   text: PropTypes.string,
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func
// };

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        accessTree: state.authentication.accessTree
    };
};

const mapActionsToProps = { setOwnAccessTree: setOwnAccessTree };

export default connect(mapStateToProps, mapActionsToProps)(MemberAccess);

