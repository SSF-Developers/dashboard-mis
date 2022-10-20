import React, { Component } from "react";
const tableStyle = {
    overflow: {
      whiteSpace: "wrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  };
  
class TableHeader extends Component {
  state = {
    SelectionMode: "Off",
    data: [],
    selectedIndex: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined) {
      this.setState({
        SelectionMode: nextProps.SelectionMode,
        data: nextProps.data,
        selectedIndex: this.createSelectedIndex(
          nextProps.SelectionMode,
          nextProps.data
        )
      });
    }
  }

  getSelectedHeaders() {
    return this.state.selectedIndex;
  }

  createSelectedIndex(columnSelection, data) {
    var selectedIndex = [];
    for (var i = 0; i < data.length; i++) {
      if (columnSelection === "All-Columns")
        selectedIndex.push({ title: data[i], selection: true });

      if (columnSelection === "None-Columns")
        selectedIndex.push({ title: data[i], selection: false });
    }

    return selectedIndex;
  }

  renderOnlyHeaders() {
    var dataCopy = this.props.data;
    if (
      this.state.SelectionMode === "All-Rows" ||
      this.state.SelectionMode === "All-Columns"
    ) {
      dataCopy.unshift("Select");
    }

    return dataCopy.map((mData, index) => {
      console.log("",index, mData);
      return (
        <th style={{ width: this.getWidth() }}>
          <div
            class={"row align-content-center"}
            style={{ width: "100%", marginLeft: "15px" }}
          >
            <div class={"col-md-12"} style={tableStyle.overflow}>
              {mData}
            </div>
          </div>
        </th>
      );
    });
  }

  onCheckboxChange(e, mData, index) {
    var selectedIndexCopy = this.state.selectedIndex;
    selectedIndexCopy[index].selection = !selectedIndexCopy[index].selection;
    this.setState({
      selectedIndex: selectedIndexCopy
    });
  }

  getWidth() {
    var size = this.state.data.length;
    var percent = 100 / size;
    return Math.floor(percent) + "%";
  }

  renderSelectionHeaders() {
    return this.state.data.map((mData, index) => {
      return (
        <th style={{ width: this.getWidth() }}>
          <div
            class={"row align-content-center"}
            style={{ width: "100%", marginLeft: "15px" }}
          >
            <div class={"col-md-1"}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.selectedIndex[index].selection}
                onChange={e => this.onCheckboxChange(e, mData, index)}
              />
            </div>
            <div class={"col-md-11"} style={tableStyle.overflow}>
              {mData}
            </div>
          </div>
        </th>
      );
    });
  }

  render() {
    // return this.state.SelectionMode === "All-Columns" ||
    //   this.state.SelectionMode === "None-Columns"
    //   ? this.renderSelectionHeaders()
    //   : this.renderOnlyHeaders();
    
    return this.renderOnlyHeaders();

  }
}

export default TableHeader;
