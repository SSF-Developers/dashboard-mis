import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import List from "../../components/list/vendorList/List";
import { setTeamList } from "../../redux/actions/vendor-actions";
import { removeComponentProps } from "../../redux/actions/history-actions";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import NoDataComponent from "../../components/NoDataComponent";
import { UiAdminDestinations } from "../../nomenclature/nomenclature";
import { executeReadVendorLambda } from "../../awsClients/vendorLambda";

class VendorHome extends Component {
    constructor(props) {
        super(props);
        this.FooterComponent = this.FooterComponent.bind(this);
        this.mDataSummaryComponent = React.createRef();
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.fetchAndInitTeam = this.fetchAndInitTeam.bind(this);
    }

    state = {};
    async fetchAndInitTeam() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeReadVendorLambda(this.props.user.userName);
            //👇
            console.log('result -:👉', result)
            //👆
            this.props.setTeamList(result.teamDetails);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message);
        }
    }

    componentDidMount() {
        this.props.removeComponentProps(UiAdminDestinations.MemberAccess);
        this.props.removeComponentProps(UiAdminDestinations.MemberDetails);
        this.fetchAndInitTeam();
    }

    render() {

        return (
            <div
                className="animated fadeIn"
                style={{
                    padding: "10px",
                }}
            >
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />

                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card>
                            <CardHeader>
                                <h1>Vendor Management</h1>
                            </CardHeader>
                            <CardBody>
                                <this.FooterComponent teamSize={this.props.teamList.length} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card>
                            <CardBody>
                                <this.Greeting teamList={this.props.teamList} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    Greeting = (props) => {
        if (props.teamList.length === 0) {
            return <NoDataComponent />;
        }
        return <List data={props.teamList} />;
    };

    FooterComponent(props) {
        console.log("_footer", props);
        return (
            <div className={"row"} style={{ margin: "0px", width: "100%" }}>
                <div
                    className={"col-md-8"}
                    style={{
                        justifyContent: "right",
                        alignItems: "right",
                        float: "right",
                    }}
                >
                    <div className={"row-md-12"}>
                        <b>Team Size: </b>
                        <i>{props.teamSize}</i>
                    </div>
                </div>
                {this.props.user.userRole == "Super Admin" &&
                    <div
                        className={"col-md-4"}
                        style={{
                            display: "flex",
                            justifyContent: "space-around"
                        }}
                    >
                        <Button
                            onClick={() => {
                                this.props.history.push("/vendor/addVendorMember");
                            }}
                            outline
                            color="primary"
                            className="px-4"
                            style={{
                                float: "right",
                            }}
                        >
                            Add Vendor Member
                        </Button>
                    </div>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        teamList: state.vendor.teamList,
        user: state.authentication.user,
    };
};

const mapActionsToProps = {
    setTeamList: setTeamList,
    removeComponentProps: removeComponentProps,
};

export default connect(mapStateToProps, mapActionsToProps)(VendorHome);
