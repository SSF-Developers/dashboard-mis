//Core
import React, { Component } from "react";
import { colorTheme, statsStyle } from '../../jsStyles/Style'
import { whiteSurface } from "../../jsStyles/Style"
import { HalfPieChart, FullLineChart, BWTHalfPieChart, BWTFullLineChart } from './components/Charts';
import { DropDownLabel } from '../../components/DisplayLabels'

class Stats extends Component {

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
        console.log('BWTStatsItem -:👉', this.props)
        return (
            <div style={{ ...whiteSurface, background: 'white', marginTop: '20px', width: "100%", height: "100%", padding: "10px", paddingBottom: '20px', display: "flexbox", alignItems: "center" }}>

                <div style={{ width: '30%', float: 'right' }}>
                    <DropDownLabel label={'Duration'} handleUpdate={this.handleUpdate} options={this.actionOptions} />
                </div>

                <this.StatsItem name='Usage Stats' total={this.props.dataSummary.usage} data={this.props.chartData.usage} pieChartData={this.props.pieChartData.usage} />

                {/* UI */}

                {
                    this.props.uiResult.collection_stats === "true" &&
                    (
                        <>
                            < this.StatsItem name='Collection Stats' total={this.props.dataSummary.collection} data={this.props.chartData.collection} pieChartData={this.props.pieChartData.collection} />
                            < this.StatsItem name='UPI Stats' total={this.props.dataSummary.upiCollection} data={this.props.chartData.upiCollection} pieChartData={this.props.pieChartData.upiCollection} />
                        </>
                    )
                }
                {
                    this.props.uiResult.bwt_stats === "true" && this.props.bwtDataSummary !== undefined ?
                        <this.BWTStatsItem name='Recycled Water' total={this.props.bwtDataSummary.waterRecycled} data={this.props.bwtChartData.waterRecycled} pieChartData={this.props.bwtPieChartData.usage} />
                        : null
                }
                <this.StatsItem name='Feedback Stats' total={this.props.dataSummary.feedback} data={this.props.chartData.feedback} pieChartData={this.props.pieChartData.feedback} />

            </div>
        );
    }

    StatsItem = (props) => {
        return (
            <div style={{ marginTop: '20px' }}>
                <div className='row' style={{ ...statsStyle.elementTitle, width: '98%', margin: 'auto', padding: '10px', background: colorTheme.primary }}>
                    {props.name}
                </div>

                <div className='row' style={{ width: '100%', margin: 'auto' }}>
                    <div className='col-md-4'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "100%", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>

                            <div style={{ height: '180px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '90%', height: '100%', margin: 'auto' }}>
                                    <HalfPieChart data={props.pieChartData} />
                                </div>
                            </div>

                            <div style={{ ...statsStyle.pieLabel, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-30px' }}>
                                {props.total}
                            </div>

                            <div style={{ ...statsStyle.pieLabel, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {props.name}
                            </div>

                        </div>
                    </div>

                    <div className='col-md-8'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "100%", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>
                            <FullLineChart data={props.data} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    BWTStatsItem = (props) => {
        return (
            <div style={{ marginTop: '20px' }}>
                <div className='row' style={{ ...statsStyle.elementTitle, width: '98%', margin: 'auto', padding: '10px', background: colorTheme.primary }}>
                    {props.name}
                </div>

                <div className='row' style={{ width: '100%', margin: 'auto' }}>
                    <div className='col-md-4'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "100%", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>

                            <div style={{ height: '180px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '90%', height: '100%', margin: 'auto' }}>
                                    <BWTHalfPieChart data={props.pieChartData} />
                                </div>
                            </div>

                            <div style={{ ...statsStyle.pieLabel, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-30px' }}>
                                {props.total}
                            </div>

                            <div style={{ ...statsStyle.pieLabel, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {props.name}
                            </div>

                        </div>
                    </div>

                    <div className='col-md-8'>
                        <div className='col-md-12' style={{ ...whiteSurface, background: 'white', width: "100%", height: '220px', padding: "10px", display: "flexbox", alignItems: "center" }}>
                            <BWTFullLineChart data={props.data} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}




export default Stats;