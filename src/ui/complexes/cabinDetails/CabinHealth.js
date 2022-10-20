//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart'
//ReactUI
import {
  Table,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button
} from "reactstrap";
//JsStyles
import {
  colorTheme,
  whiteSurface,
  complexCompositionStyle,
  cabinDetailsStyle,
  whiteSurfaceCircularBorder
} from "../../../jsStyles/Style"
import NameValue from "../../../Entity/NameValue"
import { getCabinHealthData } from "../utils/ComplexUtils";

const item = new NameValue("Name", "3")
const item2 = new NameValue("NameLonger", "3")
const healthList = [item, item2, item, item2, item, item, item]

export default function CabinHealth(props) {
  console.log('healthVal', props)

  return (

    <div className="col-md-12" style={{ ...whiteSurface, marginTop: '20px', background: "white", padding: "10px 10px 10px 10px" }}>

      <div style={{ ...cabinDetailsStyle.componentTitle }} >
        Cabin Health
      </div>

      <div style={{ ...whiteSurface, width: '100%' }} >
        <HealthList cabinHealth={getCabinHealthData(props)} />
      </div>

    </div>

  );
};

function HealthList(props) {
  return (
    <div style={{}}>
      <Table
        hover
        striped
        responsive
        bordered
        size="sm"
      >
        <thead>
          <tr >
            {TableHeader(props.cabinHealth)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {TableRow(props.cabinHealth)}
          </tr>
        </tbody>
      </Table>
    </div>)
}

function TableHeader(data) {
  console.log('healthVal-1', data)
  return data.map((mData, index) => {
    return (
      <th style={{ background: '#5DC0A6' }}>
        <div
          style={{ fontSize: "10px", width: '120px' }}
        >
          {mData.name}
        </div>
      </th>
    );
  });
}

function TableRow(data) {
  console.log('healthVal', data)
  return data.map((item, index) => {

    return (
      <td>
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: "0" }}>

          <img
            src={item.icon}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "5%",
            }} />

          <div
            style={{
              ...cabinDetailsStyle.cabinHealth.itemTitle,
            }}>
            {item.value}
          </div>
        </div>
      </td>
    );
  });
}