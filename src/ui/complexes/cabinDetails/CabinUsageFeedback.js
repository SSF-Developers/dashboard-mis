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
    primaryColorCircleSurface,
    cabinDetailsStyle,
    whiteSurfaceCircularBorder,
    usageSurface,
    feedbackSurface
} from "../../../jsStyles/Style"
import NameValue from "../../../Entity/NameValue"
import { getCabinHealthData } from "../utils/ComplexUtils";
import Home from '../../../assets/img/icons/eco_home.png';
import AnimatedBg from "react-animated-bg";


export default function CabinUsageFeedback(props) {
    return (
        <div className="col-md-12" style={{ ...whiteSurface, marginBottom: '10px', background: "white", padding: "10px 10px 10px 10px" }}>

            <div style={{ ...cabinDetailsStyle.componentTitle }} >
                Usage and Feedback
            </div>

            <div className='row' style={{ width: '99%', margin: 'auto' }}>

                <div className="col-md-6" >
                    <Usage />
                </div>

                <div className="col-md-6" >

                    {/* <Feedback /> */}
                </div>
            </div>
        </div>
    );
};

function Usage(props) {
    return (
        <div style={{ ...usageSurface }}>
            <div style={{width:'100%'}}>
            <AnimatedBg
                colors={["#fe8808", "#db1e5f", "#0f0f17", "#71e0d1"]}
                duration={1.5}
                delay={0}
                timingFunction="ease-out"
                className="animated-section"
            >
                <div style={{ display: 'block' }}>

                    <div style={{ ...primaryColorCircleSurface, margin: 'auto', width: '50px', height: '50px' }}>
                        <img
                            src={Home}
                            style={{
                                width: "30px",
                                height: "30px",
                            }} />
                    </div>

                    <div style={{}}>Total Usage</div>
                </div>

                <div style={{ width: '80%', display: 'flex', justifyContent: 'right', paddingRight: '30px' }}>
                    <div style={{}}>13,356</div>
                </div>
            </AnimatedBg>
            </div>
        </div>
    )
}

function Feedback(props) {
    return (
        <div style={{ ...feedbackSurface }}>
            <div style={{ ...primaryColorCircleSurface }}>
                <img
                    src={Home}
                    style={{
                        width: "30px",
                        height: "30px"
                    }} />
            </div>
        </div>




    )
}
