import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Label, Input, Button } from "reactstrap";
import { NameValueList } from "../../../components/DisplayLabels"
import NameValue from "../../../Entity/NameValue"
import { whiteSurface } from "../../../jsStyles/Style"
import { fromUserDetails } from "../../../parsers/listDataParsers"
import MessageDialog from "../../../dialogs/MessageDialog";
import LoadingDialog from "../../../dialogs/LoadingDialog";
import ConfirmationDialog from "../../../dialogs/ConfirmationDialog";
import { executeEnableUserLambda, executeDisableUserLambda, executeDeleteUserLambda } from "../../../awsLambdaClients/administrationLambdas"
import StateList from "../../../components/accessTree/readOnly/SateList"
import NoDataComponent from "../../../components/NoDataComponent"
import {getAccessSummary} from "../../../components/accessTree/accessTreeUtils"
class MemberAccess extends React.Component {

    state = {

    };

    accessSummary = [];
    listData = [];

    constructor(props) {
        super(props);
        this.accessSummary = getAccessSummary(props.user.permissions.country.states);
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
                        onClick={() => {
                            this.props.history.push({pathname: "/administration/defineAccess",memberUserName: this.props.user})
                          }}
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
        if (this.props.user.permissions.country.recursive == 1) {
            return <this.SuperAdminAcceess />
        } else if (this.props.user.permissions.country.states.length == 0) {
            return (<NoDataComponent />);
        } else {
            console.log("_accessTree",this.props.user.permissions.country.states)
            return (<StateList listData={this.props.user.permissions.country.states} />);
        }
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

export default MemberAccess;
