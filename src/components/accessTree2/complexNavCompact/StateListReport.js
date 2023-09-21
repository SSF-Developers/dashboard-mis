import React from "react";
import PropTypes from "prop-types";
import DistrictList from "./DistrictList"
import TreeItem from "./TreeItem";
import { compactComplexnavStyle } from "../../../jsStyles/Style"
import { TreeItemType } from "../../../nomenclature/nomenclature"
import TreeEdge from "../../../Entity/TreeEdge";
import "../../../ui/complexes/ComplexComposition.css";


class SateListReport extends React.Component {

    state = {
        text: ""
    };

    constructor(props) {
        super(props);
        console.log("_stateList")
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
            <div className="stateListReport" style={{ overflowY: "auto", height: "36vh", width: '100%' }}>
                {this.props.listData.country.states.map((item, index) => {
                    return this.renderRow(item, index);
                })}
            </div>
        );
    }

    handleToggle = () => {
        console.log("_toggle")
    }

    renderRow = (item, stateIndex) => {
        return (
            <TreeItem
                treeEdge={new TreeEdge(stateIndex)}
                type={TreeItemType.State}
                expanded={false}
                displayData={item.name}
                displayDataStyle={compactComplexnavStyle.stateFont}
                listComponent={this.getListComponent(item, stateIndex)}
                handleComplexSelection={this.props.handleComplexSelection} />
        )
    }

    getListComponent = (item, stateIndex) => {
        return (
            < DistrictList
                treeEdge={new TreeEdge(stateIndex)}
                listData={item.districts}
                handleComplexSelection={this.props.handleComplexSelection} />
        );
    }
}

SateListReport.propTypes = {
    stateListData: PropTypes.array
};

export default SateListReport;
