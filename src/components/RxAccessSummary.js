import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Label, Input, Button } from "reactstrap";
import { NameValueList } from "./DisplayLabels";

class RxAccessSummary extends React.Component {

  state = {
    accessSummary : {}
  };

  constructor(props) {
    super(props);
    this.state = {
      accessSummary: this.props.accessSummary
    };
  }

  componentDidMount(){
      
  }


  setAccessSummary(accessSummary) {
    this.setState({
      accessSummary: accessSummary
    });
  }


  render() {
    return ( <this.ComponentSelector /> );
  }

  ComponentSelector = () => {
    return ( <NameValueList data={this.state.accessSummary} />);
    }
}

// RxInputCheckbox.propTypes = {
//   text: PropTypes.string,
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func
// };

export default RxAccessSummary;
