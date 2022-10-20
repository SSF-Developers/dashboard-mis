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
import NameValue from "../../../Entity/NameValue"
import UsageProfileList from "../../../components/list/DataList"
import { getCabinHealthData } from "../utils/ComplexUtils"
import NoDataComponent from '../../../components/NoDataComponent'
import { getUsageProfileDisplayData } from '../utils/ComplexUtils'

const item = new NameValue("Name", "3")
const item2 = new NameValue("NameLonger", "3")
const healthList = [item, item2, item, item2, item, item, item]

export default function UsageProfile(props) {
    console.log(' BWT-:👉', props.usageProfile)
    return (

        // <UsageProfileList data={props.usageProfile} />

        <div style={{ ...whiteSurface, background: "white", marginTop: '20px', padding: "10px 10px 10px 10px" }}>

            <div style={{ ...cabinDetailsStyle.componentTitle }} >
                Usage Profile
            </div>

            <div style={{ ...whiteSurface }} >
                <ComponentSelector
                    usageProfile={getUsageProfileDisplayData(props)}
                    uiResult={props.uiResult}
                />
            </div>

        </div>

    );
};

function ComponentSelector(props) {
    //👇
    console.log(' props-usageProfile-:👉', props)
    //👆
    if (props.usageProfile.length == 0)
        return (<NoDataComponent />)


    else return (
        <UsageProfileList
            data={props.usageProfile}
            uiResult={props.uiResult}
        />);
}