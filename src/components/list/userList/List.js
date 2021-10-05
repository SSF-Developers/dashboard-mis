import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "reactstrap/lib/Button";
import TableHeader from "./TableHeader";
import { Link } from "react-router-dom";
import {fromUserList} from "../../../parsers/listDataParsers"

class List extends Component {

  state = {
    
  };

  dataList = []

  constructor(props) {
    super(props);
    this.dataList = fromUserList(this.props.data)
    this.getHeaderData = this.getHeaderData.bind(this);
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== undefined) {
      
    }
  }

  

  render = () => {
    return (
      <div>
        <Table
          hover
          bordered
          striped
          responsive
          size="sm"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead>
            <tr>
              <TableHeader
                ref={this.tableHeader}
                data={this.getHeaderData()}
              />
            </tr>
          </thead>
          <tbody>
            {this.dataList.map((rowData, index) =>
              this.loadRows(index, rowData)
            )}
          </tbody>
        </Table>
      </div>
    );
  };

  loadRows = (index, rowData) => {
    var data = Object.values(rowData);
    return <tr>{this.getData(data,index)}</tr>;
  };

  getData(data,rowIndex) {
    console.log("_getRowData",data);
    return data.map((item, index) => {

          if(index != 0){
            return (
              <td>
                <div className={"col-md-12"}>
                  <div className={"row justiy-content-center"}>{item}</div>
                </div>
              </td>
            );
          }
          return (
            <td>
              <div className={"col-md-12"}>
                <div className={"row justiy-content-center"}>
                <Link
                    to={{
                      pathname: "/administration/memberDetails",
                      data: this.props.data[rowIndex]
                    }}
                  >
                    {item}
                  </Link>
                  
              </div>
              </div>
            </td>
          );
        
    });
  }

  getHeaderData() {
    var row = this.dataList[0];
    console.log("_getHaderData",row);
    //console.log("_getHaderData",this.dataList);
    if (row !== undefined) {
      {
        var data = Object.keys(row);
        console.log("_getHaderData",data);
        return data;
      }
    } else return [];
  }
  
}

export default List;
