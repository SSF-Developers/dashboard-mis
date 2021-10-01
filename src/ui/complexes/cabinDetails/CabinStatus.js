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

export default function CabinStatus(props) {
    return (

        <div className="col-md-12" style={{ ...whiteSurface, background: "white", padding: "10px 10px 10px 10px"}}>
            
            <div  style={{...cabinDetailsStyle.cabinStatus.componentTitle}} >
                Cabin Status
            </div>

            <div className="row" >
                <div className="col-md-6" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} />
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>0.0 PPM</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Methane Concentration</div>
                        </div>

                    </div>
                </div>

                <div className="col-md-6" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white", marginTop: "10px" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} />
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>0.0 PPM</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Methane Concentration</div>
                        </div>

                    </div>
                </div>

                <div className="col-md-6" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white", marginTop: "10px" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} />
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>0.0 PPM</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Methane Concentration</div>
                        </div>

                    </div>
                </div>

                <div className="col-md-6" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white", marginTop: "10px" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} />
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>0.0 PPM</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Methane Concentration</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );

};