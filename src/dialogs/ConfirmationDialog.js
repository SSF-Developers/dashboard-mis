import { thingShadow } from "aws-iot-device-sdk";
import React, { Component } from "react";
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup,
  InputGroupAddon,Input,
  InputGroupText
} from "reactstrap";

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    this.renderData = this.renderData.bind(this);
  }

  title = ""
  message = ""
  onClickAction
  action = "none";

  state = {
    confirmAction: false,
    visibility: false,
    message: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== undefined)
      this.setState({ message: nextProps.message });
  }

  toggle = () => {
    this.setState((state, props) => ({
      visibility: !state.visibility
    }));
  };

  showDialog = (title, message,action, onClickAction) => {
    this.action = action;
    this.title = title;
    this.message = message;
    if (onClickAction !== undefined)
      this.onClickAction = onClickAction
    else
      this.onClickAction = undefined
    this.setState((state, props) => ({
      visibility: !state.visibility
    }));
  };

  onClick = () => {
    this.toggle();
    if (this.onClickAction !== undefined) {
      this.onClickAction();
    }
  }

  checkConfirmation = (text) => {
    if (text.toUpperCase() === this.action.toUpperCase()) {
      this.setState({
        confirmAction: true
      })
    } else {
      this.setState({
        confirmAction: false
      })
    }
  }

  renderData() {
    return (
      <Modal
        isOpen={this.state.visibility}
        toggle={this.toggle}
        className={"modal-sm"}
        style={{ width: "600px" }}
      >
        <ModalHeader toggle={this.toggle}>{this.title}</ModalHeader>
        <ModalBody
          style={{
            width: "100%"
          }}
        >
          <div
            className={"row justify-content-center"}
            style={{ margin: "auto", width:"90%" }}
          >
            {this.message}
          </div>
          
          <InputGroup className="mb-3" style={{marginTop:"20px"}}>
            <Input
              type="text"
              placeholder="Action"
              style={{textTransform:"uppercase"}}
              onChange={(event) => this.checkConfirmation(event.target.value)}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <this.ActionSelector />
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    return this.renderData();
  }

  ActionSelector = () => {
    if (this.state.confirmAction)
      return (<Button color="primary" onClick={this.onClick}>
        Confirm
      </Button>);
    else return (
      <Button color="primary" disabled="true" onClick={this.onClick}>
        Confirm
      </Button>
    );
  }
}

export default ConfirmationDialog;
