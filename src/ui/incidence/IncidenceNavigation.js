// Core
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { executeFetchCompletedUserAccessTree } from "../../awsClients/administrationLambdas";
import {
  colorTheme,
  whiteSurfaceCircularBorder,
  complexCompositionStyle,
} from "../../jsStyles/Style";
import icToilet from "../../assets/img/icons/ic_toilet.png";
import {
  getAccessSummary,
  getComplexHierarchy,
} from "../../components/accessTree/accessTreeUtils";
import { setOwnAccessTree } from "../../redux/actions/authentication-actions";
import { updateSelectedComplex } from "../../redux/actions/complex-actions";
import NoDataComponent from "../../components/NoDataComponent";
import StateList from "../../components/accessTree/complexNavCompact/SateList";

class IncidenceNavigation extends Component {
  constructor(props) {
    super(props);
    console.log(props, "_stateList");

    this.state = {
      cabinDetails: "cabinDetailsData",
    };
    this.selectionSummary = React.createRef();
    this.stateList = React.createRef();
  }

  componentDidMount() {
    console.log("DefineAccess");
    if (this.props.accessTree === undefined) {
      this.initFetchCompletedUserAccessTreeAction();
    }
  }

  handleComplexSelection = (treeEdge) => {
    console.log("HandleComplexSelection", treeEdge);
    var stateIndex = treeEdge.stateIndex;
    var districtIndex = treeEdge.districtIndex;
    var cityIndex = treeEdge.cityIndex;
    var complexIndex = treeEdge.complexIndex;

    var complex =
      this.props.accessTree.country.states[stateIndex].districts[districtIndex]
        .cities[cityIndex].complexes[complexIndex];

    var hierarchy = getComplexHierarchy(this.props.accessTree, treeEdge);
    this.props.updateSelectedComplex(complex, hierarchy);
  };

  async initFetchCompletedUserAccessTreeAction() {
    try {
      var result = await executeFetchCompletedUserAccessTree(
        this.props.user.userName
      );
      this.props.setOwnAccessTree(result);
      console.log("defineData", result);
    } catch (err) {
      console.log(err, "err");
    }
  }
  render() {
    return (
      <div className="row" style={{ background: "white", padding: "5px" }}>
        <this.Header />
        <this.ComponentSelector />
      </div>
    );
  }

  ComponentSelector = () => {
    if (this.props.accessTree == undefined) {
      return <NoDataComponent />;
    } else {
      return (
        <StateList
          ref={this.stateList}
          listData={this.props.accessTree}
          button={this.props.button}
          handleComplexSelection={this.handleComplexSelection}
        />
      );
    }
  };
  Header = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: colorTheme.primary,
          padding: "10px",
        }}
      >
        <div
          style={{
            ...whiteSurfaceCircularBorder,
            float: "left",
            padding: "10px",
            width: "50px",
            height: "50px",
          }}
        >
          <img
            src={icToilet}
            style={{ widht: "30px", height: "30px", borderRadius: "5%" }}
          />
        </div>
        <div style={{ float: "left", marginLeft: "10px" }}>
          <div style={{ ...complexCompositionStyle.complexTitleClient }}>
            {"User Access Tree"}
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    accessTree: state.authentication.accessTree,
    accessSummary: getAccessSummary(state.authentication.accessTree),
  };
};

const mapActionsToProps = {
  setOwnAccessTree: setOwnAccessTree,
  updateSelectedComplex: updateSelectedComplex,
};
export default connect(mapStateToProps, mapActionsToProps)(IncidenceNavigation);