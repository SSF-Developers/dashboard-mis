import React, { Component } from "react";
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup,
  InputGroupAddon,Input,
  InputGroupText
} from "reactstrap";
import {OdsConfigList} from '../../../components/ConfigLabels'
import {
  getOdsConfigData,
  getKeyOdsConfig,
  getTopicName,
  getPublishPayloadOds,
  getPublishMetadata
} from '../utils/ComplexUtils'
import {executePublishConfigLambda} from '../../../awsClients/complexLambdas'

class ODSConfig extends Component {

  constructor(props) {
    super(props);
    this.renderData = this.renderData.bind(this);
    this.odsConfig = undefined
  }

  title = ""
  onClickAction

  odsConfig
  state = {
    visibility: false
  };

  async submitConfig() {
    this.props.loadingDialog.current.showDialog();
    try {
        var topic = getTopicName('ODS_CONFIG',this.props.complex.complexDetails,this.props.cabin,this.props.complex.hierarchy)
        var payload = getPublishPayloadOds(this.odsConfig,this.props.complex.complexDetails,this.props.cabin)
        var metadata = getPublishMetadata('ODS',this.props.complex.complexDetails,this.props.cabin,this.props.user)
        var result = await executePublishConfigLambda(topic,payload,metadata);
        this.props.messageDialog.current.showDialog("Success", 'New config submitted successfully',this.toggle())
      

        this.props.loadingDialog.current.closeDialog();
        

    } catch (err) {
        console.log('_fetchCabinDetails',"_err", err);
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

  showDialog = (odsConfig,onClickAction) => {
    this.odsConfig = odsConfig;

      this.title = 'ODS Config';
      if(onClickAction !== undefined)
        this.onClickAction = onClickAction
    else
    this.onClickAction = undefined
    this.setState((state, props) => ({
      visibility: !state.visibility
    }));
  };

  onClick = () =>{
    this.submitConfig();
  }

  renderData() {
    return (
      <Modal
        isOpen={this.state.visibility}
        toggle={this.toggle}
        className={"modal-la"}
        style={{ width: "900px"}}
      >
        <ModalHeader style={{background:'#5DC0A6', color: `white`}} toggle={this.toggle}>{this.title}</ModalHeader>
        <ModalBody
          style={{
            width: "100%",
            height:'600px', 
            overflowY:'scroll'
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

  updateConfig = (configName, configValue) =>{
    this.odsConfig.data[getKeyOdsConfig(configName)] = configValue
  }

  ComponentSelector = () =>{
    if(this.odsConfig === undefined)
    return(<div></div>)

    return(
      <div>
        <OdsConfigList data={getOdsConfigData(this.odsConfig.data)}/>
      </div>
    )
  }
}

export default ODSConfig;
