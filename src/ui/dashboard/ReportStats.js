//Core
import React, { Component } from "react";
import { colorTheme, statsStyle } from '../../jsStyles/Style'

//ReactUI
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Button
} from "reactstrap";

import { whiteSurface } from "../../jsStyles/Style"
import { NoAxisLineChart, HalfPieChart, FullLineChart } from './components/ReportChart';
import { DropDownLabel } from '../../components/DisplayLabels'


class ReportStats extends Component {

    actionOptions = ['15 Days', '30 Days', '45 Days', '60 Days', '90 Days'];
    actionValues = [15, 30, 45, 60, 90];
    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();

    }

    createChartData() {

    }

    handleUpdate = (configName, configValue) => {
        console.log('_updateCommand', configName, configValue);
        var index = this.actionOptions.indexOf(configValue)
        this.props.setDurationSelection(this.actionValues[index])
    }
    render() {
        return (
            <div style={{ ...whiteSurface, background: 'white', marginTop: '10px', width: "100%", height: "100%", padding: "0px 10px", paddingBottom: '10px', display: "flexbox", alignItems: "center" }}>
                <this.StatsItem name='Usage Stats' total={this.props.dataSummary.usage} data={this.props.chartData.usage} pieChartData={this.props.pieChartData.usage} />

                <this.StatsItem name='Collection Stats' total={this.props.dataSummary.collection} data={this.props.chartData.collection} pieChartData={this.props.pieChartData.collection} />

                <this.StatsItem name='Feedback Stats' total={this.props.dataSummary.feedback} data={this.props.chartData.feedback} pieChartData={this.props.pieChartData.feedback} />
            </div>
        );
    }

    StatsItem = (props) => {
        return (
            <div style={{ marginTop: '10px' }}>
                <div className='row' style={{ ...statsStyle.elementTitle, width: '100%', margin: 'auto', padding: '10px', background: colorTheme.primary }}>
                    {props.name}
                </div>

                <div className='row' style={{ width: '100%', margin: 'auto' }}>
                    <div className='col-md-4'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "100%", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>

                            <div style={{ height: '180px', width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "-10px", marginTop: "-40px" }}>
                                <div style={{ width: '100%', height: '100%', margin: 'auto' }}>
                                    <HalfPieChart data={props.pieChartData} />
                                </div>
                            </div>

                            <div style={{ ...statsStyle.pieLabel, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "80px" }}>
                                {props.total}
                            </div>

                            <div style={{ ...statsStyle.pieLabel, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "80px" }}>
                                {props.name}
                            </div>

                        </div>
                    </div>


                    <div className='col-md-8'
                    >
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "500px", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>
                            <FullLineChart data={props.data} />
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}




export default ReportStats;