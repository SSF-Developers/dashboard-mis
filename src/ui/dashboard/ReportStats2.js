//Core
import React, { Component } from "react";
import { colorTheme, statsStyle } from '../../jsStyles/Style'
import { whiteSurface } from "../../jsStyles/Style"
import { BWTFullLineChart } from "./components/Charts";
import { BWTHalfPieChart } from "./components/ReportChart";
import { HalfPieChart, FullLineChart } from './components/ReportChart';


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
        // console.log('_updateCommand', configName, configValue);
        var index = this.actionOptions.indexOf(configValue)
        this.props.setDurationSelection(this.actionValues[index])
    }

    render() {
        console.log(this.props, "DASHBOARD-CHART");
        return (
            <div style={{ ...whiteSurface, background: 'white', marginTop: '5px', width: "100%", height: "100%", padding: "0px 10px", paddingBottom: '10px', display: "flexbox", alignItems: "center" }}>
                <this.StatsItem name='Usage Stats'
                    total={this.props.sumRes3}
                    chartData={this.props.dasRes3}
                    pieChartData={this.props.res3} />

                {
                    this.props.uiResult.collection_stats === "true" ?
                        <>
                            <this.StatsItem name='Collection Stats'
                                total={this.props.sumRes}
                                chartData={this.props.dasRes}
                                pieChartData={this.props.res} />

                            <this.StatsItem name='UPI Stats'
                                total={this.props.sumRes4}
                                chartData={this.props.dasRes4}
                                pieChartData={this.props.res4} />
                        </> : null
                }

                <this.BWTStatsItem name='Recycled Water'
                    total={this.props.sumRes5}
                    chartData={this.props.dasRes5}
                    pieChartData={this.props.res5} />
                <this.StatsItem name='Feedback Stats'
                    total={this.props.uniqueArray}
                    chartData={this.props.dasRes2}
                    pieChartData={this.props.res2} />

            </div>
        );
    }
    BWTStatsItem = (props) => {
        return (
            <div style={{ marginTop: '10px' }}>
                <div className='row' style={{ ...statsStyle.elementTitle, width: '98%', margin: 'auto', padding: '10px', background: colorTheme.primary }}>
                    {props.name}
                </div>

                <div className='row' style={{ width: '100%', margin: 'auto' }}>
                    <div className='col-md-4'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "100%", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>

                            <div style={{ height: '179px', width: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "-10px", marginTop: "-40px" }}>
                                <div style={{ width: '100%', height: '100%', margin: 'auto' }}>
                                    <BWTHalfPieChart data={props.pieChartData} />
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

                    <div className='col-md-8'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "650px", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>
                            <BWTFullLineChart data={props.chartData} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    StatsItem = (props) => {
        console.log(props);
        return (
            <div style={{ marginTop: '10px' }}>
                <div className='row' style={{ ...statsStyle.elementTitle, width: '100%', margin: 'auto', padding: '10px', background: colorTheme.primary }}>
                    {props.name}
                </div>

                <div className='row' style={{ width: '100%', margin: 'auto' }}>
                    <div className='col-md-4'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "100%", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>
                            {
                                this.props.uiResult.collection_stats === "true" ?
                                    <div style={{ height: '179px', width: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "-10px", marginTop: "-40px" }}>
                                        <div style={{ width: '100%', height: '100%', margin: 'auto' }}>
                                            <HalfPieChart data={props.pieChartData} />
                                        </div>
                                    </div>
                                    :
                                    <div style={{ height: '180px', width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "-10px", marginTop: "-40px" }}>
                                        <div style={{ width: '100%', height: '100%', margin: 'auto' }}>
                                            <HalfPieChart data={props.pieChartData} />
                                        </div>
                                    </div>
                            }

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
                        {
                            this.props.uiResult.collection_stats === "true" ?
                                <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "650px", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>
                                    <FullLineChart data={props.chartData} />
                                </div>
                                :
                                <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "500px", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>
                                    <FullLineChart data={props.chartData} />
                                </div>
                        }

                    </div>
                </div>
            </div >

        )
    }
}




export default ReportStats;