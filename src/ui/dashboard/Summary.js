import React, { Component } from "react";
import { whiteSurface } from "../../jsStyles/Style"
import { NoAxisLineChart } from './components/Charts';

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
    console.log("Summary", this.props)
    return (
      <div
        className="animated fadeIn"
        style={{}}
      >
        <div className="row" style={{ justifyContent: "space-between" }}>
          {this.props.uiResult.data.total_usage === "true" &&
            (
              <div className="col-md-4">
                <this.Item name="Total Usage" value={this.props.dataSummary.usage} data={this.props.chartData.usage} />
              </div>
            )
          }
          {
            this.props.uiResult.data.average_feedback === "true" &&
            (
              <div className="col-md-4">
                <this.Item name="Average Feedback" value={this.props.dataSummary.feedback} data={this.props.chartData.feedback} />
              </div>
            )
          }
          {
            this.props.uiResult.data.water_saved === "true" &&
            (
              <div className="col-md-4">
                {
                  this.props.bwtDataSummary !== undefined ?
                    <this.Item name="Water Saved" value={this.props.bwtDataSummary.waterRecycled} data={this.props.bwtChartData.waterRecycled} />
                    : null

                }
              </div>
            )
          }
        </div>
      </div>
    );
  }

  Item = (props) => {
    return (

      <div className='row' style={{ ...whiteSurface, background: 'white', width: "100%", padding: "10px", display: "flexbox", alignItems: "center" }}>

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
            <NoAxisLineChart data={props.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;