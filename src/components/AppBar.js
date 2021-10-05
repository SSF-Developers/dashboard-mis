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
  

  return (
    <div>
      <Navbar color="light" light expand="md">
          
        <NavbarBrand href="/">
        <img src={logo} style={{width:180}} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink >Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>{props.history.push("/complex/complexTree")}}>Complexes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/complex/complexTree">Incidence</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Reports</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>{props.history.push("/administration")}}>Administration</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppBar;