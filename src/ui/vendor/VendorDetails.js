import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { NameVendorList } from "../../components/DisplayLabels"
import NameValue from "../../Entity/NameValue"
import { whiteSurface } from "../../jsStyles/Style"
import { fromVendorDetails } from "../../parsers/listDataParsers"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import { pushComponentProps } from "../../redux/actions/history-actions"
import { UiAdminDestinations } from "../../nomenclature/nomenclature"
import { executeDeleteVendorLambda, executelistVendorAdminsLambda } from "../../awsClients/vendorLambda";
import { setVendorList } from "../../redux/actions/vendor-actions";
import "./VendorDetails.css"

class VendorDetails extends React.Component {

    state = {
    };

    userDetailsNameValueList = []

    constructor(props) {
        super(props);

        this.state = {
        };

        var userDetails = fromVendorDetails(this.props.user);
        Object.keys(userDetails).map((item, value) => {
            this.userDetailsNameValueList.push(new NameValue(item, userDetails[item]))
        })

        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.confirmationDialog = React.createRef();
        this.initAdminDeleteAction = this.initAdminDeleteAction.bind(this);

    }

    componentWillUnmount() {
        console.log("_memberDetails", "_restoreProps-saved", this.props);
        this.props.pushComponentProps(UiAdminDestinations.MemberDetails, this.props);
    }

    handleDeleteAction = () => {

        this.confirmationDialog.current.showDialog("Confirm Action", "To delete the Vendor Details permenently, type 'DELETE' below", "DELETE", this.initAdminDeleteAction)
    }

    async initAdminDeleteAction() {
        this.loadingDialog.current.showDialog();
        try {
            let vendorDetailsData = {
                vendor_name: this.props.user.vendor_name,
                admin: this.props.user.admin,
                vendor_admin: this.props.user.vendor_admin,
                vendor_id: this.props.user.vendor_id
            }
            var result = await executeDeleteVendorLambda(vendorDetailsData);
            console.log("result", result);
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Success", "User deleted successfully", () => { this.props.history.goBack() })
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    componentDidMount() {
        this.fetchAndInitVendorAdminsList()
    }

    async fetchAndInitVendorAdminsList() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executelistVendorAdminsLambda();
            this.props.setVendorList(result.vendorList);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    render() {
        console.log("delete_vendor", this.props)
        return (
            <div className="col-md-10 offset-md-2" style={{ ...whiteSurface, width: "80%", margin: "auto", background: "white", marginTop: "20px" }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <ConfirmationDialog ref={this.confirmationDialog} />
                <this.ActionButtons />

                <div
                    style={{ margin: "50px 150px", clear: "both" }}
                >
                    <NameVendorList data={this.userDetailsNameValueList} withPadding />
                </div>
            </div>
        );
    }

    ActionButtons = () => {
        return (
            <div style={{ display: "flex", margin: "0px 30px" }}>
                <div className="link-button"
                    style={{
                        marginTop: "17px"
                    }}
                >
                    <Link
                        to={{
                            pathname: "/vendor/updateVendor",
                            data: this.props.user,
                            vendorList: this.props.vendorList
                        }}
                    >
                        Update Vendor Details
                    </Link>
                </div>
                <div>
                    <Button
                        style={{ float: "left", margin: "10px" }}
                        outline
                        color="danger"
                        className="px-4"
                        onClick={() => this.handleDeleteAction()}
                    >
                        Delete Vendor Details
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    var lastProps = state.historyStore[UiAdminDestinations.MemberDetails];
    if (lastProps != undefined) {
        return lastProps;
    }

    return {
        vendorList: state.vendor.vendorList,
    };
};

const mapActionsToProps = { pushComponentProps: pushComponentProps, setVendorList: setVendorList };

export default connect(mapStateToProps, mapActionsToProps)(VendorDetails);
