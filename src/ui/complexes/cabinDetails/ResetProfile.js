//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart';

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
import NoDataComponent from '../../../components/NoDataComponent'
import NameValue from "../../../Entity/NameValue"
import DataList from "../../../components/list/DataList"
import {getCabinHealthData} from "../utils/ComplexUtils"


export default function ResetProfile(props) {
    return (

        // <UsageProfileList data={props.usageProfile} />

        <div style={{ ...whiteSurface, width:'100%',background: "white", padding: "10px 10px 10px 10px"}}>
            
            <div style={{...cabinDetailsStyle.componentTitle}} >
                Reset Profile
            </div>

            <div style={{...whiteSurface,width:'100%'}} >
                <ComponentSelector resetProfile={props.resetProfile}/>
                
            </div>

        </div>

    );
};

function ComponentSelector(props) {
    if(props.resetProfile.length != 0)
    return(<NoDataComponent />)


    else return(<DataList data={props.resetProfile}/>);
}