import React, { Component } from "react";

import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import MemberDetails from "./MemberDetails";
import MemberAccess from "./MemberAccess"



class MemberDetailsHome extends Component {

  constructor(props) {
    super(props);
    console.log("_props", props.location.data);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(2).fill("1")
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray
    });
  }

  testUser = {
    "admin": "dev_000000",
    "adminRole": "SuperAdmin",
    "assignedBy": "dev_000000",
    "assignedOn": "1598447936927",
    "clientName": "SSF",
    "createdOn": "2020-08-26T13:18:57.200Z",
    "email": "dd@dd.gg",
    "enabled": false,
    "gender": "Male",
    "lastModifiedOn": "2020-12-11T11:41:26.943Z",
    "organisation": "Sukriti Social Foundation",
    "phoneNumber": "+917654367895",
    "userName": "test",
    "userRole": "Vendor Admin",
    "userStatus": "CONFIRMED",
  };

  tabPane() {
    return (
      <>
        <TabPane tabId="2"><MemberAccess user={this.props.location.data} history={this.props.history}/></TabPane>
        <TabPane tabId="1"><MemberDetails history={this.props.history} user={this.props.location.data}/></TabPane>
        {/* <TabPane tabId="1"><MemberDetails user={this.testUser}/></TabPane> */}
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" >
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  Member Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  Member Access
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
  
}



export default MemberDetailsHome;
