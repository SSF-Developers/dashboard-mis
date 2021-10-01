//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart'
//ReactUI
import {
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

export default function CabinHealth(props) {
    return (

        <div className="col-md-12" style={{ ...whiteSurface, background: "white", padding: "10px 10px 10px 10px"}}>
            
            <div  style={{...cabinDetailsStyle.cabinStatus.componentTitle}} >
                Cabin Status
            </div>

            
        </div>

    );

};