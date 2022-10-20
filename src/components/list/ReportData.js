import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "reactstrap/lib/Button";

export default function UsageProfileList2(props) {
    //👇
    console.log('UsageProfileList2 -:👉', props)
    //👆
    return (
        <div style={{ height: '100%', width: '98%', margin: "auto", padding: "2px 10px" }}>
            <Table
                hover
                striped
                responsive
                bordered
                size="sm"
            >
                <thead>
                    <tr>
                        <th >Cabin Type</th>
                        <th >Usage</th>
                        <th >Feedback</th>
                        <th >Collection</th>
                        {/* <th >New Ticket</th> */}
                    </tr>
                </thead>
                <tbody>
                    {props.res ? <>
                        <td>
                            {props.res.map((rowData, index) =>
                                loadRows1(index, rowData)
                            )}
                        </td>
                        <td>
                            {props.res3.map((rowData, index) =>
                                loadRows2(index, rowData)
                            )}
                        </td>
                        <td>
                            {props.res2.map((rowData, index) =>
                                loadRows3(index, rowData)
                            )}
                        </td>

                        <td>
                            {props.res.map((rowData, index) =>
                                loadRows4(index, rowData)
                            )}
                        </td>
                    </>

                        : ("")
                    }
                    {
                        props.data ? <>
                            <td>
                                {props.data.pieChartData.usage.map((rowData, index) =>
                                    loadRows1(index, rowData)
                                )}
                            </td>
                            <td>
                                {props.data.pieChartData.usage.map((rowData, index) =>
                                    loadRows2(index, rowData)
                                )}
                            </td>
                            <td>
                                {props.data.pieChartData.feedback.map((rowData, index) =>
                                    loadRows3(index, rowData)
                                )}
                            </td>

                            <td>
                                {props.data.pieChartData.collection.map((rowData, index) =>
                                    loadRows4(index, rowData)
                                )}
                            </td>
                        </> : ("")
                    }

                    {/* <td>
                        {props.data.activeTickets.map((rowData, index) =>
                            loadRows5(index, rowData)
                        )}
                    </td> */}
                </tbody>
            </Table>
        </div>)
}

function loadRows1(index, rowData) {
    var data = Object.values(rowData);
    return <div>
        {rowData.name}
    </div>


};
function loadRows2(index, rowData) {
    var data = Object.values(rowData);
    return <div>
        {rowData.value}
    </div>

};
function loadRows3(index, rowData) {
    var data = Object.values(rowData);
    return <div>
        {rowData.value}
    </div>

};
function loadRows4(index, rowData) {
    var data = Object.values(rowData);
    return <div>
        {rowData.value}
    </div>

};
function loadRows5(index, rowData) {
    console.log(rowData, "ROWDATA-ROWDATA");
    var data = Object.values(rowData);
    return <div>
        {rowData.name}
    </div>

};