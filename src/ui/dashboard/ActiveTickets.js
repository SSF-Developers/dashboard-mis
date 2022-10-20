//Core
import React, { Component } from "react";

//ReactUI
import { Card, CardBody, CardHeader, Col, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";

import {
  dashboardStyle,
  whiteCircleSurface,
  whiteSurface,
  colorTheme,
  whiteSurfaceCircularBorder,
} from "../../jsStyles/Style";
import icToilet from "../../assets/img/icons/ic_toilet.png";
import icEarth from "../../assets/img/icons/eco_home.png";
import {
  NoFaultElement,
  FaultHeader,
  NoFaultHeader,
} from "../../components/DisplayLabels";
import { Table } from "reactstrap";

class ActiveTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cabinDetails: "cabinDetailsData",
    };
    this.complexComposition = React.createRef();
    this.messageDialog = React.createRef();
  }

  render() {
    return (
      <div
        className="animated fadeIn"
        style={{ ...whiteSurface, background: "white", marginTop: "20px" }}
      >
        <this.HeaderSelector />
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flexbox",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          <this.ComponentSelector />
        </div>
      </div>
    );
  }
  HeaderSelector = () => {
    if (this.props.data !== undefined && this.props.data.length > 0) {
      return (
        <FaultHeader
          title="Active Tickets"
          label={this.props.data.length + " Ticket(s) Active"}
        />
      );
    }
    return (
      <NoFaultHeader title="Active Tickets" label="All units working fine" />
    );
  };

  ComponentSelector = () => {
    if (this.props.data !== undefined && this.props.data.length !== 0) {
      var displayData = [...this.props.data];
      if (this.props.data.length > 10) {
        displayData = this.props.data.slice(0, 10);
      }
      return (
        <div className="row">
          {displayData.map((ticketData, index) =>
            this.ActiveTicketItem(ticketData)
          )}
        </div>
      );
    }
    return (
      <div
        className="col-md-12"
        style={{ margin: "10px 0px 0px 0px", padding: "0px 0px 0px 0px" }}
      >
        <NoFaultElement
          icon={icEarth}
          title="No active tickets listed. Tickets once generated will be listed here."
        />
      </div>
    );
  };

  ActiveTicketItem = (props) => {
    var border = "";
    return (
      <Link
        to={{
          pathname: `/Incidence/TicketDetails/${props.ticket_id}`,
          state: {
            complex: props.ticket_id,
            title: props.title,
            status: props.ticket_status,
            priority: props.criticality,
            name: props.complex_name,
            state: props.state_code,
            district: props.district_name,
            city: props.city_name,
            role: props.creator_role,
            id: props.creator_id,
            timestamp: props.timestamp,
            comment: props.description,
            data: props
          },
        }}
        className="col-md-4"
        style={{ textDecoration: 'none' }}

      >
        <div
          style={{
            border: "2px solid #5DC0A6",
            height: "140px",
            margin: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: colorTheme.primary,
              height: "60px",
              padding: "10px",
            }}
          >
            <div
              style={{
                ...whiteSurfaceCircularBorder,
                float: "left",
                padding: "10px",
                width: "30px",
                height: "30px",
              }}
            >
              <img
                src={icToilet}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "5%",
                }}
              />
            </div>

            <div
              style={{
                ...dashboardStyle.itemTitle,
                float: "left",
                marginLeft: "10px",
              }}
            >
              {props.complex_name}
            </div>
          </div>

          <div
            style={{
              ...whiteSurface,
              background: "white",
              margin: "-8px 10px 0px 10px",
              padding: "10px",
            }}
          >
            <div style={{ ...dashboardStyle.itemDescriprtion }}>
              <this.CabinHealthItem data={props} />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  CabinHealthItem = (props) => {
    return (
      <div style={{}}>
        <this.CabinHealthRow data={props.data} />
      </div>
    );
  };

  CabinHealthRow = (props) => {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              float: "left",
              width: "5px",
              height: "5px",
              background: "red",
            }}
          />

          <div
            style={{
              ...dashboardStyle.itemDescriprtionBold,
              float: "left",
              marginLeft: "10px",
            }}
          >
            {props.data.ticket_id}
          </div>

          <div
            style={{
              ...dashboardStyle.itemDescriprtion,
              float: "right",
              marginLeft: "180px",
            }}
          >
            Status:
          </div>

          <div
            style={{
              ...dashboardStyle.itemDescriprtionBold,
              float: "right",
              marginLeft: "10px",
            }}
          >
            {props.data.ticket_status}
          </div>
        </div>

        <div
          style={{
            ...dashboardStyle.itemDescriprtion,
            float: "none",
            clear: "both",
            marginLeft: "10px",
          }}
        >
          {props.data.title}
        </div>
      </div>
    );
  };
}

export default ActiveTickets;
