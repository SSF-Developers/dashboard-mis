import React from "react";

import { cabinDetailsStyle } from "../jsStyles/Style"


export function NameValueList(props) {
  var labelStyle = {}

  if ('labelStyle' in props) {
    labelStyle = props.labelStyle
  }

  if ('withPadding' in props) {
    labelStyle = { ...labelStyle, margin: "20px" }
  }

  return (
    <div style={{ margin: "10px 10px 10px 10px", width: "100%" }}>
      {props.data.map((item, index) => {
        return <NameValueLabel data={item} labelStyle={labelStyle} />
      })}
    </div>
  );
}

function NameValueLabel(props) {
  return (
    <div className="row" style={props.labelStyle}>

      <div
        className="col-md-6"
        style={{ textAlign: "right", padding: "0" }}>
        {props.data.name} :
      </div>

      <div
        className="col-md-6"
        style={{
          textAlign: "left",
          padding: "0",
          paddingLeft: "2px"
        }}
      >
        <b> {props.data.value}</b>
      </div>
    </div>
  );
}

export function IconNameValuelList(props) {
  return (
    <div style={{ margin: "10px 10px 10px 10px", width: "100%" }}>
      {props.data.map((item, index) => {
        return <IconNameValuelLabel data={item} />
      })}
    </div>
  );
}

function IconNameValuelLabel(props) {
  return (
    <div 
    className="row"
    style={{display:'flex',alignItems:'center', padding: "0", margin:'20px'}}>

      <div
        className="col-md-2"
        style={{display:'flex',alignItems:'center',justifyContent:'flex-end', padding: "0"}}>
        
        <img
          src={props.data.icon}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "5%",
          }} />
          
        <div
          style={{
            ...cabinDetailsStyle.cabinHealth.itemTitle,
          }}>
          {props.data.name} :
        </div>

        

      </div>

      <div
        className="col-md-6"
        style={{
          ...cabinDetailsStyle.cabinHealth.itemValue,
          textAlign: "left",
          padding: "0",
          paddingLeft: "2px"
        }}
      >
        <b> {props.data.value}</b>
      </div>
    </div>
  );
}