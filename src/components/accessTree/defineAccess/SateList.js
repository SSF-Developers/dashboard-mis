import React from "react";
import PropTypes from "prop-types";
import DistrictList from "./DistrictList"
import TreeItem from "./TreeItem";
import { stateFont } from "../../../jsStyles/Style"
import {TreeItemType} from "../../../nomenclature/nomenclature"
import TreeEdge from "../../../Entity/TreeEdge";

class SateList extends React.Component {

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
      <div style={{ padding: "10px 10px 10px 10px", overflowY:"auto", height:"500px"}}>
        {this.props.listData.map((item, index) => {
          return this.renderRow(item, index);
        })}
      </div>
    );
  }

  handleToggle = () => {

  }

  renderRow = (item, stateIndex) => {
    var treeEdge = new TreeEdge(stateIndex)
    return (
      <TreeItem  
      treeEdge = {new TreeEdge(stateIndex)}
      type = {TreeItemType.State}
      recursiveAccess={item.recursive==1}
      expanded={false}
      selected = {false}
      displayData={item.name}
      displayDataStyle={stateFont}
      listComponent={this.getListComponent(item,stateIndex)}
      handleUserSelection = {this.props.handleUserSelection}/>
    )
  }

  getListComponent = (item,stateIndex) => {
    return (
          < DistrictList
          treeEdge = {new TreeEdge(stateIndex)} 
          listData={item.districts} 
          handleUserSelection = {this.props.handleUserSelection}/>
    );
  }

}

SateList.propTypes = {
  stateListData: PropTypes.array
};

export default SateList;
