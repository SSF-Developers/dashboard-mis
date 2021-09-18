import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class MessageDialog extends Component {
  constructor(props) {
    super(props);
    this.renderData = this.renderData.bind(this);
  }

  title = ""
  message = ""
  onClickAction

  state = {
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

  showDialog = (title,message,onClickAction) => {
      this.title = title;
      this.message = message;
      if(onClickAction !== undefined)
        this.onClickAction = onClickAction
    else
    this.onClickAction = undefined
    this.setState((state, props) => ({
      visibility: !state.visibility
    }));
  };

  onClick = () =>{
      this.toggle();
      if(this.onClickAction !== undefined){
          this.onClickAction();
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
}

export default MessageDialog;
