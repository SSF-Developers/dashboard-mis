//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
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

export default function CabinCommands(props) {
    return (
        <div className="col-md-12" style={{ ...whiteSurfaceNoMargin, marginTop: '20px', background: "white", padding: "10px 10px 10px 10px" }}>
            <div style={{ ...cabinDetailsStyle.componentTitle }} >
                Commands And Settings
            </div>

            <div className="row" style={{ padding: '20px' }} >
                
                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>
                    <div
                        style={{ ...whiteSurface,cursor: 'pointer', background: "white" }}
                        onClick={() => {
                            props.ucemsConfig.current.showDialog(props.cabinDetails.ucemsConfig)
                        }}>
                            UCEMS Config
                    </div>
                </div>

                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>

                    <div style={{ ...whiteSurface,cursor: 'pointer', background: "white" }}
                        onClick={() => {
                            props.cmsConfig.current.showDialog(props.cabinDetails.cmsConfig)
                        }}>
                            CMS Config
                    </div>

                </div>

                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface,cursor: 'pointer', background: "white", marginTop: "10px" }}
                    onClick={() => {
                        props.odsConfig.current.showDialog(props.cabinDetails.odsConfig)
                    }}
                    >
                    ODS Config
                    </div>
                </div>

                <div className="col-md-3" style={{ width: "80%", margin: "auto" }}>
                    <div style={{ ...whiteSurface,cursor: 'pointer', background: "white", marginTop: "10px" }}
                   onClick={() => {
                    props.cabinCommands.current.showDialog()
                }}
                >
                        Commands
                        
                    </div>
                </div>
            </div>
        </div>

    );

};