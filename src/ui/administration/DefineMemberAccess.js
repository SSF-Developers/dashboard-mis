import React from "react";
import { Col, Row, Label, Input, Button } from "reactstrap";
import { NameValueList } from "../../components/DisplayLabels"
import { whiteSurface } from "../../jsStyles/Style"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import { executeFetchCompletedUserAccessTree } from "../../awsLambdaClients/administrationLambdas";
import StateList from "../../components/accessTree/defineAccess/SateList";
import NoDataComponent from "../../components/NoDataComponent";
import {getSelectionSummary} from "../../components/accessTree/accessTreeUtils";
import { connect } from "react-redux";
import {setOwnAccessTree} from "../../redux/actions/authentication-actions";
import {TreeItemType} from "../../nomenclature/nomenclature"
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
        this.initFetchCompletedUserAccessTreeAction = this.initFetchCompletedUserAccessTreeAction.bind(this);
    }

    async initFetchCompletedUserAccessTreeAction() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeFetchCompletedUserAccessTree(this.props.user.userName);
            this.props.setOwnAccessTree(result);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log("_err",err);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    handleUserSelection = (nodeType, treeEdge, selected) =>{
        var stateIndex = treeEdge.stateIndex;
        var districtIndex = treeEdge.districtIndex;
        var cityIndex = treeEdge.cityIndex;
        var complexIndex = treeEdge.complexIndex;

        if(nodeType == TreeItemType.State ){
            this.accessTree[stateIndex].selected = selected;
        }else if(nodeType == TreeItemType.District ){
            this.accessTree[stateIndex].districts[districtIndex].selected = selected;
        }else if(nodeType == TreeItemType.City ){
            this.accessTree[stateIndex].districts[districtIndex].cities[cityIndex].selected = selected;
        }else if(nodeType == TreeItemType.Complex ){
            this.accessTree[stateIndex].districts[districtIndex].cities[cityIndex].complexes[complexIndex].selected = selected;
        }

        this.accessSummary = getSelectionSummary(this.accessTree);
        //console.log("_handleUserSelection",this.accessSummary);
        this.selectionSummary.current.setAccessSummary(this.accessSummary);
        console.log("_handleUserSelection",selected);
    }

    componentDidMount() {
        this.initFetchCompletedUserAccessTreeAction();
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
                    // onClick={this.onSubmit}
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
        }else {
            if(this.accessTree == undefined){
                this.accessTree = this.props.accessTree.country.states;
                console.log("_accessTree",this.accessTree);
            }
                
            return (<StateList listData={this.accessTree} handleUserSelection={this.handleUserSelection}/>);
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

