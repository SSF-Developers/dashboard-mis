import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import logo from "../assets/img/brand/logo.png";

const AppBar = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navLinkStyle = {cursor: 'pointer',fontSize: "16px"}

  return (
    <div >
      <Navbar color="white" light expand="md">

        <NavbarBrand href="/">
          <img src={logo} style={{ width: 180 }} />
        </NavbarBrand>
        
        <NavbarToggler onClick={toggle} />
        
        <Collapse style={{marginLeft:'0px'}}isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink style={navLinkStyle} onClick={() => { props.history.push("/dashboard") }}>Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={navLinkStyle} onClick={() => { props.history.push("/complex/details") }}>Complexes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={navLinkStyle} to="/complex/complexTree">Incidence</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={navLinkStyle} onClick={() => { props.history.push("/reports") }}>Reports</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={navLinkStyle} onClick={() => { props.history.push("/administration") }}>Administration</NavLink>
            </NavItem>
          </Nav>
        </Collapse>

      </Navbar>
    </div>
  );
}

export default AppBar;