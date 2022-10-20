import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { } from "react-router-dom";
import logo from "../assets/img/brand/logo.png";
import Storage from "../Classes/Storage";
import { useHistory } from "react-router";

const AppBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory()

  const toggle = () => setIsOpen(!isOpen);

  const navLinkStyle = { cursor: "pointer", fontSize: "16px" };

  // var messageDialog = React.createRef();
  // const signOut = (e) => {
  //   e.preventDefault();
  //   console.log(' signout-:👉',)
  //   Storage.clearAll()
  //   history.push("/login");
  // }

  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} style={{ width: 180 }} />
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse style={{ marginLeft: "0px" }} isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={navLinkStyle}
                onClick={() => {
                  props.history.push("/dashboard");
                }}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={navLinkStyle}
                onClick={() => {
                  props.history.push("/complex/details");
                }}
              >
                Complexes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={navLinkStyle}
                onClick={() => {
                  props.history.push("/incidence/tickets");
                }}
              >
                Incidence
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={navLinkStyle}
                onClick={() => {
                  props.history.push("/reports");
                }}
              >
                Reports
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={navLinkStyle}
                onClick={() => {
                  props.history.push("/administration");
                }}
              >
                Administration
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={navLinkStyle}
                onClick={() => {
                  props.history.push("/vendor");
                }}
              >
                Vendor
              </NavLink>
            </NavItem>
          </Nav>
          <Button
            outline
            color="primary"
            className="px-4"
            style={{
              float: "right",
            }}
            onClick={() => {
              props.history.push("/authentication/logout");
            }}
          >
            <i className="fa fa-lock"></i> Logout
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppBar;
