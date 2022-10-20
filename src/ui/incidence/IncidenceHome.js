import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { connect } from "react-redux";
import List from "../../components/list/userList/List";
import { removeComponentProps } from "../../redux/actions/history-actions";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import NoDataComponent from "../../components/NoDataComponent";
import { executeFetchIncidenceLambda } from "../../awsClients/incidenceLambdas";
import { setTicketList } from "../../redux/actions/incidence-actions";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
} from "reactstrap";
import classnames from "classnames";
import RaisedTickets from "./RaisedTickets";
import QueuedTickets from "./QueuedTickets";
import AllActiveTickets from "./AllActiveTickets";
import SelfAssigned from "./SelfAssigned";
import TeamAssigned from "./TeamAssigned";
import ClosedTickets from "./ClosedTickets";


class IncidenceHome extends Component {
  constructor(props) {
    super(props);
    this.mDataSummaryComponent = React.createRef();
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
    this.fetchAndInitTeam = this.fetchAndInitTeam.bind(this);
    this.state = {
      currentActiveTab: "1",
      ticket: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  state = {};

  toggle = (tab) => {
    if (this.currentActiveTab !== tab) this.setState({ currentActiveTab: tab });
  };
  async fetchAndInitTeam() {
    this.loadingDialog.current.showDialog();
    try {
      console.log("_user", this.props.user);
      var result = await executeFetchIncidenceLambda(
        this.props.user.userName,
        this.props.user.userRole
      );
      this.props.setTicketList(result);
      this.setState({
        ticket: result.queuedTickets
      })
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message);
    }
  }

  componentDidMount() {
    // this.props.removeComponentProps(UiAdminDestinations.MemberAccess);
    // this.props.removeComponentProps(UiAdminDestinations.MemberDetails);
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
              <CardBody>
                <this.ComponentSelector />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
  ComponentSelector = () => {
    console.log(this.props.user, "this.props.user");
    return (
      <>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              padding: "10px 0",
              overflowX: "scroll",
            }}
          >
            <Button
              style={{
                margin: "10px 20px",
              }}
              className={classnames(
                { active: this.state.currentActiveTab === "1" },
                "col-md-2 offset-md-2"

              )}
              onClick={() => {
                this.toggle("1");
              }}
              outline
              color="primary"
            >
              Raised Tickets
            </Button>
            <Button
              style={{
                margin: "10px 20px",
              }}
              className={classnames(
                {
                  active: this.state.currentActiveTab === "2",
                },
                "col-md-2 offset-md-2"

              )}
              onClick={() => {
                this.toggle("2");
              }}
              outline
              color="primary"
            >
              Queued Tickets
            </Button>
            {
              this.props.user.userRole === "Super Admin" ? <>
                <Button
                  style={{
                    margin: "10px 20px",
                  }}
                  className={classnames(
                    {
                      active: this.state.currentActiveTab === "3",
                    },
                    "col-md-2 offset-md-2"

                  )}
                  onClick={() => {
                    this.toggle("3");
                  }}
                  outline
                  color="primary"
                >
                  Assigned Tickets
                </Button>
                <Button
                  style={{
                    margin: "10px 20px",
                  }}
                  className={classnames(
                    {
                      active: this.state.currentActiveTab === "4",
                    },
                    "col-md-2 offset-md-2"

                  )}
                  onClick={() => {
                    this.toggle("4");
                  }}
                  outline
                  color="primary"
                >
                  Resolved Tickets
                </Button></> : (
                <>
                  <Button
                    style={{
                      margin: "10px 20px",
                    }}
                    className={classnames(
                      {
                        active: this.state.currentActiveTab === "3",
                      },
                      "col-md-2 offset-md-2"

                    )}
                    onClick={() => {
                      this.toggle("3");
                    }}
                    outline
                    color="primary"
                  >
                    Self-Assigned Tickets
                  </Button>
                  <Button
                    style={{
                      margin: "10px 20px",
                    }}
                    className={classnames(
                      {
                        active: this.state.currentActiveTab === "4",
                      },
                      "col-md-2 offset-md-2"

                    )}
                    onClick={() => {
                      this.toggle("4");
                    }}
                    outline
                    color="primary"
                  >
                    Team-Assigned Tickets
                  </Button>
                </>
              )
            }
            <Button
              style={{
                margin: "10px 20px",
              }}
              className={classnames(
                {
                  active: this.state.currentActiveTab === "5",
                },
                "col-md-2 offset-md-2"

              )}
              onClick={() => {
                this.toggle("5");
              }}
              outline
              color="primary"
            >
              All Active Tickets
            </Button>
            <Button
              style={{
                margin: "10px 20px",
              }}
              className={classnames(
                {
                  active: this.state.currentActiveTab === "6",
                },
                "col-md-2 offset-md-2"
              )}
              onClick={() => {
                this.toggle("6");
              }}
              outline
              color="primary"
            >
              Closed Tickets
            </Button>
          </div>

          <div style={{ marginTop: "30px" }}>
            <TabContent activeTab={this.state.currentActiveTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <RaisedTickets
                      data={this.props.ticketList.allTickets}
                      name={this.props.user} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <QueuedTickets data={this.props.ticketList.queuedTickets} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <SelfAssigned
                      data={this.props.ticketList.allTickets}
                      name={this.props.user.userName}
                      role={this.props.user.userRole} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <TeamAssigned
                      data={this.props.ticketList.allTickets}
                      name={this.props.user.userName}
                      role={this.props.user.userRole} />
                  </Col>
                </Row>
              </TabPane><TabPane tabId="5">
                <Row>
                  <Col sm="12">
                    <AllActiveTickets data={this.props.ticketList.allTickets} />
                  </Col>
                </Row>
              </TabPane><TabPane tabId="6">
                <Row>
                  <Col sm="12">
                    <ClosedTickets data={this.props.ticketList.allTickets} />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </>
    );
  };
}
const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    ticketList: state.incidence.ticketList,
  };
};

const mapActionsToProps = {
  setTicketList: setTicketList,
  removeComponentProps: removeComponentProps,
};

export default connect(mapStateToProps, mapActionsToProps)(IncidenceHome);
