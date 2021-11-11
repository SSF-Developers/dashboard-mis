import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "reactstrap/lib/Button";

export default function UsageProfileList(props) {
  return (
    <div style={{ height:'400px',width:'100%', overflowY:'scroll' }}>
      <Table
        hover
        striped
        responsive
        bordered
        size="sm"
      >
        <thead>
          <tr >
            {TableHeader(props.data[0])}
          </tr>
        </thead>
        <tbody>
          {props.data.map((rowData, index) =>
            loadRows(index, rowData)
          )}
        </tbody>
      </Table>
    </div>)
}

function TableHeader(rowData) {
  var tableLabels = Object.keys(rowData);

  return tableLabels.map((mData, index) => {
    return (
      <th >
        <div
          style={{ width: '120px' }}
        >
          {mData}
        </div>
      </th>
    );
  });
}

function loadRows(index, rowData) {
  var data = Object.values(rowData);
  return <tr>{TableRow(data, index)}</tr>;
};

function TableRow(data) {
  return data.map((item, index) => {

    return (
      <td>
        <div>
          <div >{item}</div>
        </div>
      </td>
    );
  });
}