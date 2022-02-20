import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Label, Input, Button } from "reactstrap";

class RxInputCheckbox extends React.Component {

  state = {
    text: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      text: this.props.text
    });
  }


  onCheckboxChange = (e) => {
    console.log("_check", e.target.checked);
    this.props.onChange(e.target.checked)
  }




  render() {
    return (<this.ComponentSelector />);
  }

  ComponentSelector = () => {
    if ('withLabel' in this.props) {
      return (
      <label>
        <input
          type="checkbox"
          //checked={this.props.selected}
          enabled={false}
          onChange={e => this.onCheckboxChange(e)}
        />
        {"  "+this.props.label}</label>
      );
    }
    else if ('readOnly' in this.props) {
      return (
        <input
          type="checkbox"
          checked={true}
          enabled={false}
        />
      );
    } else {
      return (
        <Input
          type="checkbox"
          checked={this.props.selected}
          onChange={e => this.onCheckboxChange(e)}
        />
      );
    }
  }
}

// RxInputCheckbox.propTypes = {
//   text: PropTypes.string,
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func
// };

export default RxInputCheckbox;
