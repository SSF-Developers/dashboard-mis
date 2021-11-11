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
import {NoAxisLineChart} from './Charts';

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
    }

    Item = (props) => {
        return (

            <div className='row' style={{...whiteSurface,background:'white', width: "100%", padding: "10px",  display: "flexbox", alignItems: "center" }}>
                
                <div className='col-md-4' >
                <div className='col-md-12'>
                <div className="row">
                        Total Usage
                    </div>
                    <div className="row">
                        14,000
                    </div>
                </div>
                    
                </div>
                
                <div className='col-md-8' >
                <div className='col-md-12' >
                    <NoAxisLineChart />
                </div>
                
                </div>
               
                

            </div>
        );
    }

    render() {
        return (
            <div
                className="animated fadeIn"
                style={{
                    
                }}>

                <div className="row" >
                <div className="col-md-4">
                    <this.Item />

                </div>

                <div className="col-md-4">
                    
                <this.Item />
                </div>

                <div className="col-md-4">
                    
                <this.Item />
                </div>
                
            </div>
            </div>
        );
    }
}




export default Summary;