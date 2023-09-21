import React from "react";
import { connect } from "react-redux";
import { whiteSurface } from "../../jsStyles/Style"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { Button } from "reactstrap";
import { NameValueList } from "../../components/DisplayLabels";
import { executeDisableUserLambda } from "../../awsClients/administrationLambdas"
import StateList from "../../components/accessTree/readOnly/SateList"
import NoDataComponent from "../../components/NoDataComponent"
import { getAccessSummary } from "../../components/accessTree/accessTreeUtils"
import { pushComponentProps } from "../../redux/actions/history-actions"
import { UiAdminDestinations } from "../../nomenclature/nomenclature"

class MemberAccess extends React.Component {

    state = {

    };

    accessSummary = [];
    listData = [];

    constructor(props) {
        super(props);

        this.accessSummary = getAccessSummary(props.user.permissions);
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
    }

    async initAdminDisableAction() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeDisableUserLambda(this.props.user.userName);
            this.setState({ userStatus: "disabled" })
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.result.message)
        }
    }


    componentDidMount() {
        //   this.setState({
        //     text: this.props.text
        //   });
    }



    handleDefineAccessAction = () => {
        var bundle = {
            "user": this.props.user,
            "history": this.props.history
        };
        this.props.pushComponentProps(UiAdminDestinations.MemberAccess, this.props);
        this.props.history.push({ pathname: "/administration/defineAccess", bundle: bundle })
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
                        onClick={() => this.handleDefineAccessAction()}
                    >
                        Define Access
                    </Button>

                    <div class="col-md-2" style={{ float: "right" }}>
                        <NameValueList data={this.accessSummary} />
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
        if (this.props.user != undefined) {
            if (this.props.user.permissions.country.recursive == 1) {
                return <this.SuperAdminAcceess />
            } else if (this.props.user.permissions.country.states.length == 0) {
                return (<NoDataComponent />);
            } else {
                console.log("_accessTree", this.props.user.permissions.country.states)
                return (<StateList listData={this.props.user.permissions.country.states} />);
            }
        } else

            return (<NoDataComponent />);
    }

    SuperAdminAcceess = () => {
        return (
            <div class="col-md-8 offset-md-1" style={{ clear: "both", width: "50%", margin: "auto" }}>
                SUPER ADMIN ACCESS

            </div>
        );
    }
}

// MemberAccess.propTypes = {
//   text: PropTypes.string,
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func
// };

const mapStateToProps = (state) => {
    var lastProps = state.historyStore[UiAdminDestinations.MemberAccess];
    if (lastProps != undefined) {
        return lastProps;
    }

    return {};
};

const mapActionsToProps = { pushComponentProps: pushComponentProps };

export default connect(mapStateToProps, mapActionsToProps)(MemberAccess);