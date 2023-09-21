import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { NameValueList } from "../../components/DisplayLabels"
import NameValue from "../../Entity/NameValue"
import { whiteSurface } from "../../jsStyles/Style"
import { fromUserDetails } from "../../parsers/listDataParsers"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import {
    executeEnableUserLambda,
    executeDisableUserLambda,
    executeDeleteUserLambda
} from "../../awsClients/administrationLambdas";
import { pushComponentProps } from "../../redux/actions/history-actions"
import { UiAdminDestinations } from "../../nomenclature/nomenclature"

class MemberDetails extends React.Component {

    state = {

    };

    userDetailsNameValueList = []

    constructor(props) {
        super(props);
        this.state = {
            userStatus: this.props.user.enabled ? "enabled" : "disabled"
        };
        var userDetails = fromUserDetails(this.props.user);
        Object.keys(userDetails).map((item, value) => {
            this.userDetailsNameValueList.push(new NameValue(item, userDetails[item]))
        })


        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.confirmationDialog = React.createRef();
        this.initAdminDisableAction = this.initAdminDisableAction.bind(this);
        this.initAdminDeleteAction = this.initAdminDeleteAction.bind(this);

    }

    componentWillUnmount() {
        console.log("_memberDetails", "_restoreProps-saved", this.props);
        this.props.pushComponentProps(UiAdminDestinations.MemberDetails, this.props);
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

    async initAdminEnableAction() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeEnableUserLambda(this.props.user.userName);
            this.setState({ userStatus: "enabled" })
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.result.message)
        }
    }

    handleDeleteAction = () => {

        this.confirmationDialog.current.showDialog("Confirm Action", "To delete the user permenently, type 'DELETE' below", "DELETE", this.initAdminDeleteAction)
    }

    async initAdminDeleteAction() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeDeleteUserLambda(this.props.user.userName);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Success", "User deleted successfully", () => { this.props.history.goBack() })
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    componentDidMount() {
        //   this.setState({
        //     text: this.props.text
        //   });
    }


    render() {
        return (
            <div className="col-md-10 offset-md-2" style={{ ...whiteSurface, width: "80%", margin: "auto" }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <ConfirmationDialog ref={this.confirmationDialog} />
                <this.ActionSelector />

                <div className="col-md-6" style={{ margin: "100px", clear: "both" }}>
                    <NameValueList data={this.userDetailsNameValueList} withPadding />
                </div>
            </div>
        );
    }

    ActionSelector = () => {
        if (this.state.userStatus == "enabled")
            return (<this.EnabledUserActions />)
        else if (this.state.userStatus == "disabled")
            return (<this.DisabledUserActions />)
        else
            return (<div />)
    }

    EnabledUserActions = () => {
        return (
            <div>
                <Button
                    style={{ float: "left", margin: "10px" }}
                    outline
                    color="danger"
                    className="px-4"
                    onClick={() => this.initAdminDisableAction()}
                >
                    Disable User
                </Button>

            </div>
        );
    }

    DisabledUserActions = () => {
        return (
            <div>
                <Button
                    style={{ float: "left", margin: "10px" }}
                    outline
                    color="success"
                    className="px-4"
                    onClick={() => this.initAdminEnableAction()}
                >
                    Enable User
                </Button>
                <Button
                    style={{ float: "left", margin: "10px" }}
                    outline
                    color="danger"
                    className="px-4"
                    onClick={() => this.handleDeleteAction()}
                >
                    Delete User
                </Button>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    var lastProps = state.historyStore[UiAdminDestinations.MemberDetails];
    if (lastProps != undefined) {
        return lastProps;
    }

    return {};
};

const mapActionsToProps = { pushComponentProps: pushComponentProps };

export default connect(mapStateToProps, mapActionsToProps)(MemberDetails);
