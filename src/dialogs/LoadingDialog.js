import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";

class LoadingDialog extends Component {
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

  showDialog = () => {
    this.setState((state, props) => ({
      visibility: true
    }));
  };

  closeDialog = () => {
    this.setState((state, props) => ({
      visibility: false
    }));
  }

  renderData() {
    return (
      <Modal
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        isOpen={this.state.visibility}
        toggle={this.toggle}
        className={"modal-sm"}
        
        style={{
          width: "600px",
            backgroundColor: "white",
            opacity: "0.6"
          }}
      >
        <ModalBody
          style={{
            background:"",
            // backgroundColor: "red",
            // opacity: "0.6"
          }}
        >
          {/* <div
            class={"row justify-content-center"}
            style={{ marginTop: "10px" }}
          >
            <Spinner color="primary" />
            
          </div>
          <div
            class={"row justify-content-center"}
            style={{ marginTop: "10px" }}
          > */}
            Loading...
{/*             
          </div> */}
        </ModalBody>
      </Modal>
    );
  }

  render() {
    return this.renderData();
  }
}

export default LoadingDialog;
