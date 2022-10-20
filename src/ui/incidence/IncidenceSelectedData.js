//Core
import React, { Component, Fragment } from "react";
//Redux
import { connect } from "react-redux";
import {
  pushComplexComposition,
  updateSelectedCabin,
} from "../../redux/actions/complex-actions";
//ReactUI
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";

//Functionality
import { executeGetComplexCompositionLambda } from "../../awsClients/complexLambdas";
import { thingShadow } from "aws-iot-device-sdk";
//CustomUI

import {
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

class IncidenceSelectedData extends Component {
  constructor(props) {
    super(props);
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
    this.fetchComplexComposition = this.fetchComplexComposition.bind(this);
  }

  componentDidMount() {
    if (
      this.props.complex !== undefined &&
      this.props.complexStore[this.props.complex.name] == undefined
    )
      this.fetchComplexComposition();
  }

  componentDidUpdate() {
    if (
      this.props.complex !== undefined &&
      this.props.complexStore[this.props.complex.name] == undefined
    )
      this.fetchComplexComposition();
  }

  async fetchComplexComposition() {
    this.loadingDialog.current.showDialog();
    try {
      var result = await executeGetComplexCompositionLambda(
        this.props.complex.name
      );
      this.props.pushComplexComposition(
        this.props.hierarchy,
        this.props.complex,
        result
      );
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message);
    }
  }

  render() {
    return (
      <div
        className="row"
        style={{ marginTop: "10px", background: "white", padding: "5px" }}
      >
        <MessageDialog ref={this.messageDialog} />
        <LoadingDialog ref={this.loadingDialog} />
        <this.ComponentSelector />
      </div>
    );
  }

  ComponentSelector = () => {
    var complex = undefined;
    if (this.props.complex !== undefined)
      complex = this.props.complexStore[this.props.complex.name];
    //var complex = this.props.complexStore['TEST_AWS'];
    if (complex !== undefined)
      return (
        <Fragment>
          <this.ComplexHeader />
        </Fragment>
      );
    return <div></div>;
  };

  ComplexHeader = () => {
    var complex = this.props.complexStore[this.props.complex.name];

    return (
      <div style={{ width: "-webkit-fill-available" }}>
        <Form>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="State"
              value={complex.complexDetails.name}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="District"
              value={complex.hierarchy.city}
            />
          </InputGroup>

          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="City"
              value={complex.hierarchy.state + ":" + complex.hierarchy.district}
            />
          </InputGroup>
        </Form>
      </div>
    );
  };

  setSelectedCabin = (cabin) => {
    this.props.updateSelectedCabin(cabin);
  };
}

const mapStateToProps = (state) => {
  console.log("_onComplexSelection", state.complexStore);

  return {
    complexStore: state.complexStore,
    complex: state.complexStore.complex,
    cabin: state.complexStore.cabin,
    hierarchy: state.complexStore.hierarchy,
  };
};

const mapActionsToProps = {
  pushComplexComposition: pushComplexComposition,
  updateSelectedCabin: updateSelectedCabin,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(IncidenceSelectedData);
