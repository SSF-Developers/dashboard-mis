import React, { Component } from "react";
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup,
  InputGroupAddon, Input,
  InputGroupText
} from "reactstrap";
import { UcemsConfigList } from '../../../components/ConfigLabels'
import { getUcemsConfigData, getPublishPayloadUcems, getTopicName, getKeyUcemsConfig, getPublishMetadata } from '../utils/ComplexUtils'
import { settingsModal } from '../../../jsStyles/Style'
import { executePublishConfigLambda } from '../../../awsClients/complexLambdas'

class UCEMSConfig extends Component {

  constructor(props) {
    super(props);
    this.renderData = this.renderData.bind(this);
    this.ucemsConfig = undefined
  }

  title = ""
  onClickAction

  ucemsConfig
  state = {
    visibility: false
  };

  async submitConfig() {
    this.props.loadingDialog.current.showDialog();
    try {
      var topic = getTopicName('UCEMS_CONFIG', this.props.complex.complexDetails, this.props.cabin, this.props.complex.hierarchy)
      var payload = getPublishPayloadUcems(this.ucemsConfig, this.props.complex.complexDetails, this.props.cabin)
      var metadata = getPublishMetadata('UCEMS', this.props.complex.complexDetails, this.props.cabin, this.props.user)
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

  showDialog = (ucemsConfig, onClickAction) => {
    this.ucemsConfig = ucemsConfig;

    this.title = 'UCEMS Config';
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
    console.log('_updateConfig', getKeyUcemsConfig(configName), configName, configValue)
    this.ucemsConfig.data[getKeyUcemsConfig(configName)] = configValue
    console.log('_updateConfig', this.ucemsConfig)
  }

  ComponentSelector = () => {
    if (this.ucemsConfig === undefined)
      return (<div></div>)

    return (
      <div>
        <div style={{ ...settingsModal.labelTimestamp, width: '100%', textAlign: 'right' }}>Default Values</div>
        <UcemsConfigList handleUpdate={this.updateConfig} data={getUcemsConfigData(this.ucemsConfig.data)} />
      </div>
    )
  }
}

// ComponentSelector = () =>{
//   if(this.ucemsConfig.defaultValues)
//     return(<div style={{...settingsModal.labelTimestamp, width:'100%', textAlign:'right'}}>Default Values</div>)

//   return(<div style={{...settingsModal.labelTimestamp, width:'100%', textAlign:'right'}}>{x()}</div>)
// }

export default UCEMSConfig;
