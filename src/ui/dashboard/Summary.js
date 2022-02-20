//Core
import React, { Component } from "react";

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
import {NoAxisLineChart} from './components/Charts';
    
const tempData = [
    {
      name: 'Page A',
      all: 5000,
    },
    {
      name: 'Page B',
      all: 2210,
    },
    {
      name: 'Page C',
      all: 2290,
    },
    {
      name: 'Page D',
      all: 2000,
    },
    {
      name: 'Page E',
      all: 2181,
    },
    {
      name: 'Page F',
      all: 2500,
    },
    {
      name: 'Page G',
      all: 0,
    },
  ];

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
        
    }

    render() {
        console.log("Summary",this.props)
        return (
            <div
                className="animated fadeIn"
                style={{
                    
                }}>

                <div className="row" >
                <div className="col-md-4">
                    <this.Item name="Total Usage" value ={this.props.dataSummary.usage} data={this.props.chartData.usage}/>
                </div>

                <div className="col-md-4">
                    
                <this.Item name="Average Feedback" value ={this.props.dataSummary.feedback} data={this.props.chartData.feedback}/>
                </div>

                <div className="col-md-4">
                    
                <this.Item name="Water Saved" value ={"0 Lts"} data={tempData}/>
                </div>
                
            </div>
            </div>
        );
    }

    Item = (props) => {
        return (

            <div className='row' style={{...whiteSurface,background:'white', width: "100%", padding: "10px",  display: "flexbox", alignItems: "center" }}>
                
                <div className='col-md-4' >
                <div className='col-md-12'>
                <div className="row">
                        {props.name}
                    </div>
                    <div className="row">
                        {props.value}
                    </div>
                </div>
                    
                </div>
                
                <div className='col-md-8' >
                <div className='col-md-12' >
                    <NoAxisLineChart data={props.data}/>
                </div>
                </div>
            </div>
        );
    }
}




export default Summary;