import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Label, Input, Button } from "reactstrap";
import logo from "../assets/img/brand/no_data_02.png";

export default function NoDataComponent(props)  {
  var labelStyle = {}
  if ('withPadding' in props){
    labelStyle = {...labelStyle, margin:"20px"}
  }

  return (
    <div  style={{}}>
        <img
              src={logo}
              style={{
                display: "block",
                marginTop: "20px",
                width: "40%",
                margin:"auto",
                borderRadius: "5%",
              }}
              />
    </div>
  );
}