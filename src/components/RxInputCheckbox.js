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

  componentDidMount(){
      this.setState({
        text: this.props.text
      });
  }

  
  onCheckboxChange = (e) => {
    //console.log("_check", e.target.checked);
    this.props.onChange(e.target.checked)
 }

 


  render() {
    return ( <this.ComponentSelector /> );
  }

  ComponentSelector = () => {
    if ('readOnly' in this.props) {
      return (
        <input 
        type="checkbox" 
        checked={true}
        enabled={false}
        />
      );
    }else {
      return (
        <Input
          type="checkbox"
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
