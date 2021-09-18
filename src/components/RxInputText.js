import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Label, Input, Button } from "reactstrap";

class RxInputText extends React.Component {

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

  
  getText() {
    return this.state.text;
  }

  setText(text) {
    this.setState({
      text: text
    });
  }


  render() {
    return (
      <Input
        value={this.state.text}
        type="text"
        placeholder={this.props.placeholder}
        onChange={(event) => this.props.onChange(event.target.value)}
        diisabled
      />
    );
  }
}

RxInputText.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default RxInputText;
