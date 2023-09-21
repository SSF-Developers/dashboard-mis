import React from "react";
import { Table } from "reactstrap";

export default function UsageProfileList2(props) {
    console.log('UsageProfileList2 -:👉', props)
    return (
        <div style={{ height: '100%', width: '98%', margin: "auto", padding: "2px 5px" }}>
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
                        <th >Re-Water</th>
                        <th >Feedback</th>
                        {
                            props.uiResult.collection_stats === "true" ? <>
                                <th >Collection</th>
                                <th >UPI Collection</th>
                            </> : null
                        }

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
                            {props.res5.map((rowData, index) =>
                                loadRows6(index, rowData, props)
                            )}
                        </td>
                        <td>
                            {props.res2.map((rowData, index) =>
                                loadRows3(index, rowData, props)
                            )}
                        </td>


                        {
                            props.uiResult.collection_stats === "true" ? <>
                                <td>
                                    {props.res.map((rowData, index) =>
                                        loadRows4(index, rowData)
                                    )}
                                </td>
                                <td>
                                    {props.res4.map((rowData, index) =>
                                        loadRows5(index, rowData)
                                    )}
                                </td>
                            </> : null
                        }
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
                                {props.data.bwtpieChartData.usage.map((rowData, index) =>
                                    loadRows6(index, rowData)
                                )}
                            </td>
                            <td>
                                {props.data.pieChartData.feedback.map((rowData, index) =>
                                    loadRows0(index, rowData)
                                )}
                            </td>


                            {
                                props.uiResult.collection_stats === "true" ? <>
                                    <td>
                                        {props.data.pieChartData.collection.map((rowData, index) =>
                                            loadRows4(index, rowData)
                                        )}
                                    </td>
                                    <td>
                                        {props.data.pieChartData.upiCollection.map((rowData, index) =>
                                            loadRows5(index, rowData)
                                        )}
                                    </td>
                                </> : null
                            }
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
function loadRows3(index, rowData, props) {
    console.log('props-dipu -:👉', props)
    var data = Object.values(rowData);
    return <div>
        {rowData.value === 5 ?
            5 : (rowData.value / props.pieLength).toPrecision(2) < 2 && (rowData.value / props.pieLength).toPrecision(2) > 0 ?
                3.5 : (rowData.value / props.pieLength).toPrecision(2) < 4 && (rowData.value / props.pieLength).toPrecision(2) >= 2 ?
                    4 : (rowData.value / props.pieLength).toPrecision(2) == 0.0 ? 5 : (rowData.value / props.pieLength).toPrecision(2)}
    </div>

};
function loadRows0(index, rowData) {
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
        {rowData.value}
    </div>

};
function loadRows6(index, rowData) {
    console.log(rowData, "ROWDATA-ROWDATA");
    var data = Object.values(rowData);
    return <div>
        {rowData.value}
    </div>

};