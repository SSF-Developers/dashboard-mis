import React, { Component } from "react";
import {
    Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup,
    InputGroupAddon, Input,
    InputGroupText
} from "reactstrap";
import { BwtCommandsLabel, BwtBlowerLabel, CommandsLabelOverride, CommandsSelectionLabel } from '../../../components/ConfigLabels'
import {
    getBwtCommand,
    getBwtCommandNames,
    getBwtTopicName,
    getBwtPublishPayloadCommand,
    getPublishMetaCommanddata
} from '../utils/BWTComplexUtils'
import { settingsModal } from '../../../jsStyles/Style'
import { executePublishCommandLambda } from '../../../awsClients/complexLambdas'



class BwtCommands extends Component {

    constructor(props) {
        super(props);
        this.renderData = this.renderData.bind(this);
        this.ucemsConfig = undefined
        this.state = {
            visibility: false,
            command: getBwtCommand('Pump')
        };
    }

    commandData = {
        Duration: 10,
        Action: 1,
        Override: 1
    }
    title = ""
    onClickAction


    async submitConfig() {
        console.log('_commands', this.commandData);
        this.props.loadingDialog.current.showDialog();
        try {
            var topic = getBwtTopicName('Command', this.props.complex.complexDetails, this.props.cabin, this.props.complex.hierarchy)
            var payload = getBwtPublishPayloadCommand(this.state.command, this.commandData, this.props.complex.complexDetails, this.props.cabin)
            var metadata = getPublishMetaCommanddata('Command', this.props.complex.complexDetails, this.props.cabin, this.props.user)
            // console.log('_commands', topic);
            // console.log('_commands', payload);
            // console.log('_commands', metadata);
            var result = await executePublishCommandLambda(topic, payload, metadata);
            this.props.messageDialog.current.showDialog("Success", 'Command submitted successfully', this.toggle())

            this.props.loadingDialog.current.closeDialog();


        } catch (err) {
            console.log('_fetchCabinDetails', "_err", err);
            this.props.loadingDialog.current.closeDialog();
            this.props.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }



    toggle = () => {
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };

    showDialog = (onClickAction) => {

        this.title = 'Cabin Commands';
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
                    <CommandsSelectionLabel
                        handleCommandSelection={this.handleCommandSelection}
                        label={'Commands'}
                        options={getBwtCommandNames()}
                    />
                    <div style={{ ...settingsModal.labelTimestamp, width: '100%', textAlign: 'left' }}>{this.state.command.name}</div>
                    <this.CommandUi />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onClick}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    render() {
        return this.renderData();
    }

    handleCommandSelection = (commandName) => {
        var command = getBwtCommand(commandName);
        console.log('_command', command, commandName)
        this.setState({
            command: command
        })
    }

    handleCommandUpdate = (configName, configValue) => {
        console.log('_updateCommand', configName, configValue)
        if (configValue == "Active mode") {
            this.commandData.Action = 1;
        } else if (configValue == "Drain mode") {
            this.commandData.Action = 2;
        } else if (configValue == "Rinse mode") {
            this.commandData.Action = 3;
        } else if (configValue == "BackWash mode") {
            this.commandData.Action = 4;
        } else if (configValue == "Switch ON") {
            this.commandData.Action = 1;
        } else if (configValue == "Switch OFF") {
            this.commandData.Action = 2;
        } else if (configValue == "Override Command") {
            this.commandData.Action = 1;
        } else if (configValue == "Do Not Override") {
            this.commandData.Action = 2;
        }
        if (configName == "Duration") {
            this.commandData.Duration = configValue
        }
    }

    CommandSelector = () => {
        return (
            <div>

                <CommandsSelectionLabel
                    handleCommandSelection={this.handleCommandSelection}
                    label={'Commands'}
                    options={getBwtCommandNames()}
                />
                <div style={{ ...settingsModal.labelTimestamp, width: '100%', textAlign: 'left' }}>{this.state.command.name}</div>

                <this.CommandUi />
            </div>
        )
    }

    CommandUi = () => {
        console.log('_command', 'CommandUi', this.state.command)
        if (this.state.command.value == 0) {
            return (
                <BwtCommandsLabel handleUpdate={this.handleCommandUpdate} />
            )
        } else if (this.state.command.value == 2) {
            return (
                <BwtBlowerLabel handleUpdate={this.handleCommandUpdate} />
            )
        }

        return (
            <CommandsLabelOverride handleUpdate={this.handleCommandUpdate} />
        )

    }
}

export default BwtCommands;
