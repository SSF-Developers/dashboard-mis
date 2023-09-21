//Core
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

import ComplexComposition from "./ComplexComposition";
import ComplexNavigationCompact from "./ComplexNavigationCompact";
import CabinDetails from "./CabinDetails";
import MessageDialog from "../../dialogs/MessageDialog";
import AWS from "aws-sdk";
import AWSMqttClient from "aws-mqtt";
import { savePayload } from "../../redux/actions/complex-actions";

class ComplexDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData'
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
    }

    render() {
        const client = new AWSMqttClient({
            region: AWS.config.region,
            credentials: AWS.config.credentials,
            endpoint: "a372gqxqbver9r-ats.iot.ap-south-1.amazonaws.com",
            expires: 600,
            clientId: "test123" + Math.floor(Date.now() / 1000),
            will: {
                topic: "WillMsg",
                payload: "Connection Closed abnormally..!",
                qos: 0,
                retain: false,
            },
        });
        // console.log("client", client);
        client.on("connect", () => {
            console.log("connect");
            client.subscribe(
                "$aws/events/presence/#"
            );
            client.on("subscribe", () => {
                console.log("subscribe");

            })
        });
        client.on("message", (topic, message) => {
            // console.log("topic", topic);
            var json = JSON.parse("" + message);
            // console.log("message", json);
            this.props.handlePayload(json, topic);
        });
        client.on("close", () => {
            // console.log("close");
        });
        client.on("offline", () => {
            // console.log("offline");
        });
        return (
            <div
                className="animated fadeIn"
                style={{
                    padding: "10px"
                }}>

                <div className="row" >
                    <div className="col-md-2"
                        style={{}}>
                        <MessageDialog ref={this.messageDialog} />
                        <ComplexNavigationCompact />
                        <ComplexComposition />

                    </div>
                    <div className="col-md-10" style={{}}>
                        <CabinDetails />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
    };
};

const mapActionsToProps = {
    handlePayload: savePayload,
};

export default connect(mapStateToProps, mapActionsToProps)(ComplexDetails);