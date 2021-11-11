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
    usageAndFeedbackStyle,
    cabinDetailsStyle,
    whiteSurfaceCircularBorder
} from "../../../jsStyles/Style"
import NameValue from "../../../Entity/NameValue"
import { getCabinHealthData } from "../utils/ComplexUtils";
import UsageIcon from '../../../assets/img/icons/eco_home.png'
import FeedbackIcon from '../../../assets/img/icons/ic_quick_access_active.png'



export default function CabinUsageFeedback(props) {

    var totalUsage = 0
    var totalFeedback = 0

    console.log('_usageAndFeedback', props.usageAndFeedback, props.usageAndFeedback.length)
    if (props.usageAndFeedback  !== -1) {
        totalUsage = props.usageAndFeedback.TotalUsage;
        totalFeedback = props.usageAndFeedback.AverageFeedback;
    }

    return (
        <div className="col-md-12" style={{ marginBottom: '20px' }}>

            {/* <div style={{ ...cabinDetailsStyle.componentTitle }} >
                Usage and Feedback
            </div> */}

            <div className='row' style={{}}>

                <div className="col-md-6" style={{   }} >
                    <Usage totalUsage={totalUsage} />
                </div>

                <div className="col-md-6" style={{   }} >
                    <Feedback totalFeedback={totalFeedback} />
                </div>
            </div>
        </div>
    );
};

function Loader() {
    var style = {
        border: '16px solid #eee',
        borderTop: '16px solid #3ae',
        borderRadius: '50%',
        width: '1cm',
        height: '1cm',
        animation: 'spin 2s linear infinite',
    }
    return (
        <div style={style}>
            <style>{`
            @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
            }
        `}</style>
        </div>
    )
}

function Usage(props) {
    var style = {
        ...usageAndFeedbackStyle.bottomRightCurvedSurface,
        animation: 'usage 10s linear infinite'
    }
    return (
        <div style={style}>
            <style>{`
            @keyframes usage {

                 0% {
                    background: #5DC0A6;
                  }
                  25% {
                    background: #7AFFDC;
                  }
                  50% {
                    background: #5DC0A6;
                  }
                  75% {
                    background: #7AFFDC;
                  }
                  100% {
                    background: #5DC0A6;
                  }
            }
        `}</style>

            <div style={{ display: 'block' }}>

                <div style={{ ...usageAndFeedbackStyle.circleSurface, margin: 'auto', width: '30px', height: '30px' }}>
                    <img
                        src={UsageIcon}
                        style={{
                            width: "30px",
                            height: "30px",
                        }} />
                </div>

                <div style={{ ...usageAndFeedbackStyle.name }}>Total Usage</div>

            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'right' }}>
                <div style={{ ...usageAndFeedbackStyle.value }}>{props.totalUsage}</div>
            </div>
        </div>


    )
}

function Feedback(props) {
    var style = {
        ...usageAndFeedbackStyle.topLeftCurvedSurface,
        animation: 'feedback 10s linear infinite',
    }
    return (
        <div style={style}>
            <style>{`
            @keyframes feedback {

                 0% {
                    background: #7AFFDC;
                  }
                  25% {
                    background: #5DC0A6;
                  }
                  50% {
                    background: #7AFFDC;
                  }
                  75% {
                    background: #5DC0A6;
                  }
                  100% {
                    background: #7AFFDC;
                  }
            }
        `}</style>

            <div style={{ display: 'block' }}>

                <div style={{ ...usageAndFeedbackStyle.circleSurface, margin: 'auto', width: '30px', height: '30px' }}>
                    <img
                        src={FeedbackIcon}
                        style={{
                            width: "30px",
                            height: "30px",
                        }} />
                </div>

                <div style={{ ...usageAndFeedbackStyle.name }}>Feedback</div>
            </div>

            <div style={{ width: '75%', display: 'flex', justifyContent: 'right' }}>
                <div style={{ ...usageAndFeedbackStyle.value }}>{props.totalFeedback}</div>
            </div>
        </div>


    )
}


