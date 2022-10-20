import React from "react";
import PropTypes from "prop-types";
import TreeItem from "./TreeItem";
import CityList from "./CityList"
import { compactComplexnavStyle } from "../../../jsStyles/Style"
import { TreeItemType } from "../../../nomenclature/nomenclature"
import TreeEdge from "../../../Entity/TreeEdge";

class DistrictList extends React.Component {

  state = {
    text: ""
  };

  constructor(props) {
    super(props);
    console.log(props, "DistrictList: constructor(2)");
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
    // Create an array of objects
    let jsonObject = this.props.listData.map(JSON.stringify);
    console.log(jsonObject);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    console.log(uniqueArray, "uniqueArray");
    return (
      <div style={{ overflow: "auto" }}>
        {uniqueArray.map((item, index) => {
          console.log(item, "ITEM-ITEM");
          return this.renderRow(item, index);
          // return <this.DetailsElement data={item} />;

        })}
      </div>

    );
  }

  handleToggle = () => {
    console.log("_toggle")
  }

  renderRow = (item, districtIndex) => {
    return (
      <TreeItem
        type={TreeItemType.District}
        treeEdge={new TreeEdge(this.props.treeEdge.stateIndex, districtIndex)}
        expanded={false}
        displayData={item.name}
        displayDataStyle={compactComplexnavStyle.districtFont}
        listComponent={this.getListComponent(item, districtIndex)}
        handleComplexSelection={this.props.handleComplexSelection} />
    )
  }

  getListComponent = (item, districtIndex) => {

    return (
      < CityList
        listData={item.cities}
        treeEdge={new TreeEdge(this.props.treeEdge.stateIndex, districtIndex)}
        handleComplexSelection={this.props.handleComplexSelection}
      />
    );
  }
}

DistrictList.propTypes = {
  listData: PropTypes.array
};

export default DistrictList;
