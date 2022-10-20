import React from "react";
import { connect } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    Input,
    InputGroup,
    Row,
    CardHeader
} from "reactstrap";
import { whiteSurface } from "../../jsStyles/Style"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import {
    executelistVendorAdminsLambda,
    executeCreateVendorLambda
} from "../../awsClients/vendorLambda";
import { pushComponentProps } from "../../redux/actions/history-actions"
import { UiAdminDestinations } from "../../nomenclature/nomenclature"
import { setVendorList } from "../../redux/actions/vendor-actions";
import DropDown from "../../components/DropDown";

class AddVendorMember extends React.Component {

    state = {

    };

    userDetailsNameValueList = []

    constructor(props) {
        super(props);
        this.state = {
        };
        this.initializeFormDetails();
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.confirmationDialog = React.createRef();
    }

    componentWillUnmount() {
        console.log("_memberDetails", "_restoreProps-saved", this.props);
    }

    componentDidMount() {
        this.fetchAndInitClientList()
    }

    async fetchAndInitClientList() {
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

    async initCreateVendorRequest(createUserRequest) {
        this.loadingDialog.current.showDialog();
        try {
            let result = await executeCreateVendorLambda(createUserRequest);
            this.messageDialog.current.showDialog(result.message,
                result.status === 1 ? ("Vendor added successfully") : result.status === -1 ? ("Please try again!") : result.status === -2 && ("Vendor Admin is already assigned to other complexes. Please choose other Admin")
                , () => { this.props.history.goBack() })
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    handleDeleteAction = () => {

        this.confirmationDialog.current.showDialog("Confirm Action", "To delete the user permenently, type 'DELETE' below", "DELETE", this.initAdminDeleteAction)
    }

    onClientSelected = (index, value) => {
        console.log('index-index -:👉', index)
        this.formDetails.vendor_admin = value;
    }

    populateClientList = () => {
        var clientNameList = []
        for (let mClient of this.props.vendorList) {
            clientNameList.push(mClient);
        }
        return clientNameList;
    }

    initializeFormDetails() {
        this.formDetails = {
            vendor_name: "Vendor",
            admin: "ssf_developer",
            adminRole: "Super Admin",
            assigned_by: "ssf_developer",
            beneficiary: "asdf",
            buisnessName: "TOKYO",
            contact: "11 1110 1110",
            email: "tokyo@tokyo.com",
            gstNumber: "GST11111GST",
            ifsc_code: "HDFC00000",
            userName: "asdfghjkl",
            vendor_admin: "",
            accountNumber: ""
        }
    }

    onSubmit = () => {

        // if (this.formDetails.userName === "") {
        //     this.messageDialog.current.showDialog("Validation Error", "Please enter a valid user name.")
        // } else if (this.formDetails.tempPassword === "") {
        //     this.messageDialog.current.showDialog("Validation Error", "Please enter a valid temporary password.")
        // }
        // else {
        this.initCreateVendorRequest(this.formDetails);
        //this.props.addMember(User.getTestTeamUser(this.formDetails.userName))
        //this.props.addMember(newUser)
        //this.messageDialog.current.showDialog("Success","User added successfully", ()=>{this.props.history.goBack()})
        // }
    };


    render() {
        //👇
        console.log('USER -:👉', this.props.user)
        //👆
        return (
            <div className="col-md-10 offset-md-2" style={{ ...whiteSurface, width: "80%", margin: "10px auto", background: "white" }}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />
                <ConfirmationDialog ref={this.confirmationDialog} />

                <div className="" style={{ margin: "50px", clear: "both" }}>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <b style={{ margin: "auto" }} className="text-muted">Vendor Details</b>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <Input
                                                type="text"
                                                placeholder="Contact Name"
                                                onChange={(event) =>
                                                    (this.formDetails.vendor_name = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <Input
                                                type="text"
                                                placeholder="Contact Email"
                                                onChange={(event) =>
                                                    (this.formDetails.email = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <Input
                                                type="text"
                                                placeholder="Contact Number"
                                                onChange={(event) =>
                                                    (this.formDetails.contact = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                placeholder="Business Name"
                                                onChange={(event) =>
                                                    (this.formDetails.buisnessName = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <b style={{ margin: "auto" }} className="text-muted">Bank Account</b>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <InputGroup className="mb-4">
                                            <Input
                                                type="text"
                                                placeholder="IFSC Code"
                                                onChange={(event) =>
                                                    (this.formDetails.ifsc_code = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <Input
                                                type="text"
                                                placeholder="Account Number"
                                                onChange={(event) =>
                                                    (this.formDetails.accountNumber = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <Input
                                                type="text"
                                                placeholder="Beneficiary"
                                                onChange={(event) =>
                                                    (this.formDetails.beneficiary = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                placeholder="User Name"
                                                onChange={(event) =>
                                                    (this.formDetails.userName = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <b style={{ margin: "auto" }} className="text-muted">GST Details</b>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                placeholder="GST Number"
                                                onChange={(event) =>
                                                    (this.formDetails.gstNumber = event.target.value)
                                                }
                                            />
                                        </InputGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <b style={{ margin: "auto" }} className="text-muted">Vendor Admins</b>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <InputGroup>
                                            <DropDown
                                                options={this.populateClientList()}
                                                onSelection={this.onClientSelected} />
                                        </InputGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div className={"row justiy-content-center"}
                        style={{ width: "100%" }}>

                        <Button
                            style={{ margin: "auto" }}
                            color="primary"
                            className="px-4"
                            onClick={this.onSubmit}>
                            Submit
                        </Button>
                    </div>
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
        user: state.authentication.user,
    };
};

const mapActionsToProps = { pushComponentProps: pushComponentProps, setVendorList: setVendorList };

export default connect(mapStateToProps, mapActionsToProps)(AddVendorMember);
