import React, { Component } from "react";
import {
    Button, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import { BwtConfigList } from '../../../components/ConfigLabels'
import {
    getBwtConfigData,
    getKeyBwtConfig,
    getBwtTopicName,
    getPublishPayloadBwt,
    getPublishMetadata
} from '../utils/BWTComplexUtils'
import { executePublishConfigLambda } from '../../../awsClients/complexLambdas'

class BWTConfig extends Component {

    constructor(props) {
        super(props);
        this.renderData = this.renderData.bind(this);
        this.bwtConfig = undefined
    }

    title = ""
    onClickAction

    bwtConfig
    state = {
        visibility: false
    };

    async submitConfig() {
        this.props.loadingDialog.current.showDialog();
        try {
            var topic = getBwtTopicName('BWT_CONFIG', this.props.complex.complexDetails, this.props.cabin, this.props.complex.hierarchy)
            var payload = getPublishPayloadBwt(this.bwtConfig, this.props.complex.complexDetails, this.props.cabin)
            var metadata = getPublishMetadata('BWT', this.props.complex.complexDetails, this.props.cabin, this.props.user)
            var result = await executePublishConfigLambda(topic, payload, metadata);
            this.props.messageDialog.current.showDialog("Success", 'New config submitted successfully', this.toggle())

            this.props.loadingDialog.current.closeDialog();

        } catch (err) {
            console.log('_fetchCabinDetails', "_err", err);
            this.props.loadingDialog.current.closeDialog();
            this.props.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== undefined)
            this.setState({ message: nextProps.message });
    }

    toggle = () => {
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };

    showDialog = (bwtConfig, onClickAction) => {
        this.bwtConfig = bwtConfig;

        this.title = 'BWT Config';
        if (onClickAction !== undefined)
            this.onClickAction = onClickAction
        else
            this.onClickAction = undefined
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };

    onClick = () => {
        this.submitConfig();
    }

    renderData() {
        return (
            <Modal
                isOpen={this.state.visibility}
                toggle={this.toggle}
                className={"modal-la"}
                style={{ width: "900px" }}
            >
                <ModalHeader style={{ background: '#5DC0A6', color: `white` }} toggle={this.toggle}>{this.title}</ModalHeader>
                <ModalBody
                    style={{
                        width: "100%",
                        height: '600px',
                        overflowY: 'scroll'
                    }}
                >
                    <this.ComponentSelector />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onClick}>
                        OK
                    </Button>{" "}

                </ModalFooter>
            </Modal>
        );
    }

    render() {
        return this.renderData();
    }

    updateConfig = (configName, configValue) => {
        this.bwtConfig.data[getKeyBwtConfig(configName)] = configValue

    }

    ComponentSelector = () => {
        if (this.bwtConfig === undefined)
            return (<div></div>)

        return (
            <div>
                <BwtConfigList handleUpdate={this.updateConfig} data={getBwtConfigData(this.bwtConfig.data)} />
            </div>
        )
    }
}

export default BWTConfig;
