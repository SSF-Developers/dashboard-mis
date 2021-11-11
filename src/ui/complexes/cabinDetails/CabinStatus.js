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
    whiteSurfaceNoMargin,
    complexCompositionStyle,
    cabinDetailsStyle,
    whiteSurfaceCircularBorder
} from "../../../jsStyles/Style"

export default function CabinStatus(props) {
    console.log('_aqiLumen',props.cabinStatus)
    return (
        <div className="col-md-12" style={{...whiteSurface, background:'white'}}>
            <div  style={{...cabinDetailsStyle.componentTitle}} >
                Cabin Status
            </div>

            <div className="row" >
                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} percent={props.cabinStatus.data.concentrationCH4}/>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>{props.cabinStatus.data.concentrationCH4} PPM</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Methane Concentration</div>
                        </div>

                    </div>
                </div>

                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white", marginTop: "10px" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} percent={props.cabinStatus.data.concentrationCO}/>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>{props.cabinStatus.data.concentrationCO} PPM</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Carbon Monoxide Concentration</div>
                        </div>

                    </div>
                </div>

                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white", marginTop: "10px" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} percent={props.cabinStatus.data.concentrationNH3}/>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>{props.cabinStatus.data.concentrationNH3} PPM</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Ammonia Concentration</div>
                        </div>

                    </div>
                </div>

                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface, background: "white", marginTop: "10px" }}>
                        <div style={{}}>
                            <GaugeChart id="gauge-chart1" hideText={true} percent={props.cabinStatus.data.concentrationLuminosityStatus}/>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeValue, display: "flex", justifyContent: "center" }}>{props.cabinStatus.data.concentrationLuminosityStatus} Lumen</div>
                            <div style={{ ...cabinDetailsStyle.cabinStatus.gaugeTitle, display: "flex", justifyContent: "center" }}>Luminous Intensity</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );

};