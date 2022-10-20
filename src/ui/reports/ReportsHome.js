import React, { Component } from "react";
import { connect, useDispatch } from "react-redux";
import {
    Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup,
    Input,
} from "reactstrap";
import { setDashboardData } from "../../redux/actions/dashboard-actions";
import { setReportData, setReportReset } from "../../redux/actions/report-actions";
import { setResetData } from "../../redux/actions/extra-actions";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executeFetchDashboardLambda } from "../../awsClients/administrationLambdas"
import { executeFetchReportLambda } from "../../awsClients/incidenceLambdas"
import InputDatePicker from "../../components/InputDatePicker"
import { colorTheme, dashboardStyle, statsStyle, whiteSurface } from "../../jsStyles/Style"
import Stats from '../dashboard/Stats'
import ComplexNavigationFullHeight from "./ComplexNavigationFullHeight";
import ComplexNavigationFullHeight2 from "./ComplexNavigationFullHeight2";
import NoDataComponent from "../../components/NoDataComponent";
import List from "../../components/list/userList/List";
import { getAccessSummary } from "../../components/accessTree/accessTreeUtils";
import Box from '@material-ui/core/Box';
import UsageProfileList2 from "../../components/list/ReportData";
import ReportStats from "../dashboard/ReportStats";
import ReportStats2 from "../dashboard/ReportStats2";
import html2pdf from "html2pdf-jspdf2"
import U_SMILEY from '../../assets/img/brand/U_SMILEY.png';
import Report_Cover from '../../assets/img/brand/Report_Cover.png';
import moment from "moment";
import FileSaver from "file-saver";
import XLSX from "xlsx";

class ReportsHome extends Component {

    reportParms = { complex: 'all', duration: '15' }
    arrayComplex
    complex = [
        "KRH_GSCDL",
        "GSCDCL_H_COURT"
    ]
    AssignDetails = {
        duration: ""
    }
    arrayOfPie = []
    arrayOfPie2 = []
    arrayOfPie3 = []
    arrayOfDash = []
    arrayOfDash2 = []
    arrayOfDash3 = []
    arrayOfSum = []
    arrayOfSum2 = []
    arrayOfSum3 = []

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData',
            AccesDataFulllist: [],
            complex: [],
            excelData: [],
            excelData2: [],
            excelData3: [],
            startDate: new Date(),
            endDate: new Date(),
            button_one: false,
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.fetchDashboardData = this.fetchDashboardData.bind(this);
        this.setComplexSelection = this.setComplexSelection.bind(this);
        this.setDurationSelection = this.setDurationSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPDF = this.getPDF.bind(this);
        this.start = this.start.bind(this);
        this.handleEcxel = this.handleEcxel.bind(this);
    }
    state = {
        visibility: false
    };

    handleChange(event) {
        let complex = []
        for (let index = 0; index < event.target.value.length; index++) {
            complex.push(event.target.value[index])

        }
        this.setState({
            complex: complex
        });
    }

    toggleDialog = () => {
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };

    showDialog = (onClickAction) => {
        this.title = 'REPORT DATA';
        if (onClickAction !== undefined)
            this.onClickAction = onClickAction
        else
            this.onClickAction = undefined
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };


    async fetchDashboardData() {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeFetchDashboardLambda(this.props.user.userName, this.reportParms.duration, this.reportParms.complex);
            this.props.setDashboardData(result);
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log('_lambda', err)
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    setComplexSelection(complex) {
        this.reportParms.complex = complex.name;
        this.fetchDashboardData();
    }

    setDurationSelection(duration) {
        this.reportParms.duration = duration;
        this.fetchDashboardData();
    }
    componentDidMount() {
        if (!this.props.hasDashboardData) {
            this.fetchDashboardData(15);
        }
    };
    // eslint-disable-next-line no-dupe-class-members
    handleChange(e) {
        if (this.state.button_one === false) {
            this.setState({ button_one: true }, () => console.log(this.state.button_one, "button"));
        } else if (this.state.button_one === true) {
            this.setState({ button_one: false }, () => console.log(this.state.button_one, "button-true"));
        }
    }


    render() {
        let element = []
        if (this.props.accessSummary[4].value.length > 1) {
            for (let index = 0; index < this.props.accessSummary[4].value.length; index++) {
                element.push(this.props.accessSummary[4].value[index].name)
            }
            const mySet = new Set(element)
            this.arrayComplex = [...mySet]
        }
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };
        let calculatedDay = moment(this.state.startDate)
        let calculatedDay2 = moment(this.state.endDate)
        let dayDifference = calculatedDay2.diff(calculatedDay, 'days')
        this.AssignDetails.duration = Math.abs(dayDifference)
        return (
            <div
                className="animated fadeIn"
                style={{}}>
                <MessageDialog ref={this.messageDialog} />
                <LoadingDialog ref={this.loadingDialog} />

                <table style={{ width: "100%", height: '100%', padding: '0px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '20%' }}
                            >
                                <div style={{ width: '100%', marginTop: '20px', padding: '10px', height: '100%', alignItems: 'flex-start' }}>
                                    <ComplexNavigationFullHeight setComplexSelection={this.setComplexSelection} />
                                    {
                                        this.state.button_one ? (
                                            <div class="container" style={{
                                                textAlign: "center",
                                                marginTop: "20px",
                                                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                                                padding: "20px",
                                                backgroundColor: "white",
                                            }}>
                                                <div class="progress" id="progress" style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "30px",
                                                    marginBottom: "20px",
                                                    backgroundColor: "#e2e2e2",
                                                    borderRadius: "40px",
                                                }}>
                                                    <p class="counter" id="counter" style={{
                                                        position: "absolute",
                                                        left: "50%",
                                                        top: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        zIndex: "1",
                                                        color: "white"
                                                    }}>0%</p>
                                                    <div class="bar" id="bar" style={{
                                                        position: "absolute",
                                                        borderRadius: "40px",
                                                        height: "100%",
                                                        width: "0%",
                                                        backgroundColor: "#5DC0A6",
                                                    }}></div>
                                                </div>
                                                <p class="success" id="success" style={{ color: "#20a8d8" }}></p>
                                            </div>
                                        ) : null
                                    }
                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            marginTop: "20px",
                                        }}>
                                        <Button
                                            style={{
                                                width: "100%",
                                                padding: "5%",
                                            }}
                                            color="primary"
                                            outline
                                            className="px-4"
                                            onClick={() => { this.showDialog() }}
                                        >
                                            Download Report
                                        </Button>
                                    </div>
                                </div>
                            </td>
                            <td style={{ width: '80%' }}>
                                <div
                                    style={{ width: "100" }}
                                // style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Stats
                                        setDurationSelection={this.setDurationSelection}
                                        handleComplexSelection={this.handleComplexSelection}
                                        chartData={this.props.dashboardData.dashboardChartData}
                                        pieChartData={this.props.dashboardData.pieChartData}
                                        dataSummary={this.props.dashboardData.dataSummary}
                                        uiResult={this.props.dashboardData.uiResult.data}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="document" style={{
                                    ...dashboardStyle.itemTitleLa,
                                    background: "white",
                                    marginLeft: "-100000px", position: "absolute",
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: "100%"
                                }} >
                                    <this.MyDoc />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.visibility}
                    toggle={this.isEnabled}
                    className={"modal-la"}
                >
                    <ModalHeader style={{ background: '#5DC0A6', color: `white` }} toggle={this.toggleDialog}>{this.title}</ModalHeader>
                    <ModalBody
                        style={{
                            width: "100%",
                            height: '600px',
                        }}
                    >
                        <label style={{ paddingTop: "20px" }}>
                            <h5>
                                Select Complex
                            </h5>
                        </label>
                        <ComplexNavigationFullHeight2 setComplexSelection={this.setComplexSelection} />

                        <label style={{ paddingTop: "10px" }}>
                            <h5>
                                Select Duration
                            </h5>
                        </label>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <InputDatePicker
                                value={this.state.endDate}
                                onSelect={(value) => {
                                    this.setState({ endDate: value }, () => console.log(this.state.endDate, "endDate-endDate"));
                                }}
                                maxDate={new Date()}
                                onlyDate
                                label="Select Past Date"
                                type="date"
                                placeholder="End Date"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            style={{ margin: "auto" }}
                            color="primary"
                            className="px-4"
                            onClick={this.getPDF}
                        >
                            Download Pdf
                        </Button>
                        <Button
                            style={{ margin: "auto" }}
                            color="primary"
                            className="px-4"
                            onClick={this.handleEcxel}
                        >
                            Download Sheet
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }

    async fetchReportData() {
        const complexData = this.props.complexData
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeFetchReportLambda(this.props.user.userName, this.AssignDetails.duration, complexData);
            this.props.setReportData(result);
            this.messageDialog.current.showDialog("Report Generated", "File will be saved in your Downloads, it will take few seconds");
            var element = document.getElementById('documenttohtml');
            var opt = {
                margin: 1,
                filename: 'DataReport.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 2, allowTaint: true },
                jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
            };

            setTimeout(() => {
                html2pdf().from(element).set(opt).save();
                this.props.setReportReset()
                this.props.setResetData()
                this.arrayOfPie = []
                this.arrayOfPie2 = []
                this.arrayOfPie3 = []
                this.arrayOfDash = []
                this.arrayOfDash2 = []
                this.arrayOfDash3 = []
                this.arrayOfSum = []
                this.arrayOfSum2 = []
                this.arrayOfSum3 = []
            }, 10000);
            this.start()
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log('_lambda', err)
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    formatDataForSubmissionList = () => {
        const rawData = this.props.reportData
        const filterData = [];
        const filterData2 = [];
        const filterData3 = [];
        if (rawData !== undefined && rawData.length > 0) {
            return (
                rawData.map((ticketData, index) => {
                    ticketData && ticketData.dashboardChartData.collection.forEach((item) => {
                        filterData.push({
                            ComplexName: ticketData.complexName,
                            Date: item.date,
                            All: item.all,
                            MaleWC: item.mwc,
                            FemaleWC: item.fwc,
                            PDWC: item.pwc,
                            MaleUR: item.mur,
                        });
                    });
                    this.setState({ excelData: filterData })
                    // return filterData;
                    ticketData && ticketData.dashboardChartData.usage.forEach((item) => {
                        filterData2.push({
                            ComplexName: ticketData.complexName,
                            Date: item.date,
                            All: item.all,
                            MaleWC: item.mwc,
                            FemaleWC: item.fwc,
                            PDWC: item.pwc,
                            MaleUR: item.mur,
                        });
                    });
                    this.setState({ excelData2: filterData2 })
                    // return filterData;
                    ticketData && ticketData.dashboardChartData.feedback.forEach((item) => {
                        filterData3.push({
                            ComplexName: ticketData.complexName,
                            Date: item.date,
                            All: item.all,
                            MaleWC: item.mwc > 5 ? 5 : item.mwc,
                            FemaleWC: item.fwc > 5 ? 5 : item.fwc,
                            PDWC: item.pwc > 5 ? 5 : item.pwc,
                            MaleUR: item.mur > 5 ? 5 : item.mur,
                        });
                    });
                    this.setState({ excelData3: filterData3 })
                    // return filterData;
                })
            )
        }
    }

    downloadXLSX = () => {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileName = `Complex Raw Data Download Sheet`;
        const fileExtension = ".xlsx";
        const worksheet = XLSX.utils.json_to_sheet(this.state.excelData);
        const worksheet2 = XLSX.utils.json_to_sheet(this.state.excelData2);
        const worksheet3 = XLSX.utils.json_to_sheet(this.state.excelData3);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Collection");
        XLSX.utils.book_append_sheet(workbook, worksheet2, "Usage");
        XLSX.utils.book_append_sheet(workbook, worksheet3, "Feedback");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    async fetchReportData2() {
        const complexData = this.props.complexData
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeFetchReportLambda(this.props.user.userName, this.AssignDetails.duration, complexData);
            this.props.setReportData(result);
            this.messageDialog.current.showDialog("Report Generated", "File will be saved in your Downloads, it will take few seconds");
            this.formatDataForSubmissionList()
            this.downloadXLSX()
            this.start2()
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log('_lambda', err)
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }
    handleEcxel() {
        this.fetchReportData2()
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    }

    getPDF() {
        this.fetchReportData();
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
    };

    ReportListSelector = (props) => {
        if (props.teamList.length === 0) {
            return <NoDataComponent />;
        }
        return <List data={props.teamList} />;
    }
    start = () => {
        this.setState({ button_one: true }, () => console.log(this.state.button_one, "button"));
        const bar = document.getElementById('bar');
        let width = 1;
        const success = document.getElementById('success')
        const counter = document.getElementById('counter')
        setInterval(() => {
            if (width >= 100) {
                success.innerHTML = 'Dowload completed!'
                clearInterval()
            } else {
                width++;
                bar.style.width = width + '%';
                counter.innerHTML = width + '%';
            }

        }, 100)

    }
    start2 = () => {
        this.setState({ button_one: true }, () => console.log(this.state.button_one, "button"));
        const bar = document.getElementById('bar');
        let width = 1;
        const success = document.getElementById('success')
        const counter = document.getElementById('counter')
        setInterval(() => {
            if (width >= 100) {
                success.innerHTML = 'Dowload completed!'
                clearInterval()
            } else {
                width++;
                bar.style.width = width + '%';
                counter.innerHTML = width + '%';
            }
        }, 5)
    }
    MyDoc = (props) => {
        const displayData = this.props.reportData
        // DashBoard
        let dashResult = this.arrayOfDash.flat()
        let dashResult2 = this.arrayOfDash2.flat()
        let dashResult3 = this.arrayOfDash3.flat()

        var o = {}
        var o1 = {}
        var o2 = {}
        const dasRes = dashResult.reduce(function (r, e) {
            var key = e.date + '|' + e.dateIndex;
            if (!o[key]) {
                o[key] = e;
                r.push(o[key]);
            } else {
                o[key].mwc += e.mwc;
                o[key].fwc += e.fwc;
                o[key].mur += e.mur;
                o[key].all += e.all;
                o[key].pwc += e.pwc;
            }
            return r;
        }, []);
        const dasRes2 = dashResult2.reduce(function (r, e) {
            var key = e.date + '|' + e.dateIndex;
            if (!o1[key]) {
                o1[key] = e;
                r.push(o1[key]);
            } else {
                o1[key].mwc += e.mwc;
                o1[key].fwc += e.fwc;
                o1[key].mur += e.mur;
                o1[key].all = e.all;
                o1[key].pwc += e.pwc;
            }
            return r;
        }, []);
        const dasRes3 = dashResult3.reduce(function (r, e) {
            var key = e.date + '|' + e.dateIndex;
            if (!o2[key]) {
                o2[key] = e;
                r.push(o2[key]);
            } else {
                o2[key].mwc += e.mwc;
                o2[key].fwc += e.fwc;
                o2[key].mur += e.mur;
                o2[key].all += e.all;
                o2[key].pwc += e.pwc;
            }
            return r;
        }, []);


        let pieResult = this.arrayOfPie.flat()
        let pieResult2 = this.arrayOfPie2.flat()
        let pieResult3 = this.arrayOfPie3.flat()


        const res = Array.from(pieResult.reduce(
            (m, { name, value }) => m.set(name, (m.get(name) || 0) + value), new Map
        ), ([name, value]) => ({ name, value }));
        const res2 = Array.from(pieResult2.reduce(
            (m, { name, value }) => m.set(name, (m.get(name) || 0) + value), new Map
        ), ([name, value]) => ({ name, value }));
        const res3 = Array.from(pieResult3.reduce(
            (m, { name, value }) => m.set(name, (m.get(name) || 0) + value), new Map
        ), ([name, value]) => ({ name, value }));

        // Summary-Chart
        let sumResult = this.arrayOfSum.flat()
        let sumResult2 = this.arrayOfSum2.flat()
        let sumResult3 = this.arrayOfSum3.flat()

        const sumRes = sumResult.reduce((partialSum, a) => partialSum + a, 0)
        // FEEDBACK
        const arrOfNum = [];

        sumResult2.forEach(str => {
            arrOfNum.push(Number(str));
        });

        // 
        let uniqueArray = arrOfNum.reduce((a, b) => a + b, 0) / arrOfNum.length
        //👇
        console.log('uniqueArray - TEST -:👉', uniqueArray)
        //👆
        const sumRes3 = sumResult3.reduce((partialSum, a) => partialSum + a, 0)
        var currentTime = new Date()
        if (displayData !== undefined && displayData.length > 0) {
            return (
                <div style={{
                    width: "100%", height: "100%",
                    ...whiteSurface, background: "white",
                }}
                    id="documenttohtml"
                >
                    <div
                        style={{
                            background: "white",
                            backgroundImage: "url(" + Report_Cover + ")",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            height: "1080px",
                        }}>
                        <div style={{
                            float: "right",
                            paddingTop: "900px",
                            marginRight: "50px"
                        }}>
                            <h4>Report Generated at:</h4>
                            <h5>
                                {moment(currentTime).format("ddd Do-MM-YYYY")}
                            </h5>
                            <h4>Report Duration:</h4>
                            <h5>
                                {moment(currentTime).subtract(this.AssignDetails.duration, 'd').format("ddd Do-MM-YYYY")} - {moment(currentTime).format("ddd Do-MM-YYYY")}
                            </h5>
                        </div>
                    </div>
                    <div
                        style={{
                            background: "white",
                        }} class="html2pdf__page-break"></div>
                    <div style={{
                        ...whiteSurface, background: "white",
                    }}>
                        <div className='row' style={{ ...statsStyle.elementTitle, width: '98%', margin: 'auto', padding: '10px', background: colorTheme.primary }}>
                            Summary Report For All Complex
                        </div>
                        <UsageProfileList2
                            res={res}
                            res2={res2}
                            res3={res3}
                        />
                        {dasRes2 && dasRes.length > 1 &&
                            <ReportStats2
                                res={res}
                                res2={res2}
                                res3={res3}
                                dasRes={dasRes}
                                dasRes2={dasRes2}
                                dasRes3={dasRes3}
                                sumRes={sumRes}
                                uniqueArray={uniqueArray}
                                sumRes3={sumRes3}
                            />
                        }

                        <div style={{
                            marginTop: "-130px",
                            float: "right",
                            position: "absolute",
                            marginLeft: "525px"
                        }}>
                            <img height="150px" src={U_SMILEY} />

                        </div>
                    </div>
                    <div
                        style={{
                            background: "white",
                        }}
                        class="html2pdf__page-break">
                    </div>
                    {
                        displayData.map((ticketData, index) => {
                            let pData = ticketData.pieChartData.collection
                            let pData2 = ticketData.pieChartData.feedback
                            let pData3 = ticketData.pieChartData.usage
                            let dData = ticketData.dashboardChartData.collection
                            let dData2 = ticketData.dashboardChartData.feedback
                            let dData3 = ticketData.dashboardChartData.usage
                            let sData = ticketData.dataSummary.collection
                            let sData2 = ticketData.dataSummary.feedback
                            let sData3 = ticketData.dataSummary.usage
                            this.arrayOfDash.push(dData)
                            this.arrayOfDash2.push(dData2)
                            this.arrayOfDash3.push(dData3)
                            this.arrayOfSum.push(sData)
                            this.arrayOfSum2.push(sData2)
                            this.arrayOfSum3.push(sData3)
                            this.arrayOfPie.push(pData)
                            this.arrayOfPie2.push(pData2)
                            this.arrayOfPie3.push(pData3)
                            return (
                                <div
                                    style={{
                                        ...whiteSurface,
                                        background: "white",
                                    }}
                                >
                                    <div className='row' style={{ ...statsStyle.elementTitle, width: '98%', margin: 'auto', padding: '10px', background: colorTheme.primary }}>
                                        Data Report For Complex : {ticketData.complexName}
                                    </div>
                                    <UsageProfileList2 data={ticketData} />
                                    <ReportStats
                                        setDurationSelection={this.setDurationSelection}
                                        handleComplexSelection={this.handleComplexSelection}
                                        chartData={ticketData.dashboardChartData}
                                        pieChartData={ticketData.pieChartData}
                                        dataSummary={ticketData.dataSummary}
                                    />
                                    <div style={{
                                        marginTop: "-130px",
                                        float: "right",
                                        position: "absolute",
                                        marginLeft: "525px"
                                    }}>
                                        <img height="150px" src={U_SMILEY} />
                                    </div>
                                    <div
                                        style={{
                                            background: "white",
                                        }} class="html2pdf__page-break"></div>
                                </div>

                            )
                        }
                        )
                    }
                </div >
            );
        }
        return (
            null
        )

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        dashboardData: state.dashboard.data,
        hasDashboardData: state.dashboard.hasData,
        reportData: state.report.data,
        hasReportData: state.report.hasData,
        complexData: state.extra.data,
        hasComplexData: state.extra.hasData,
        accessTree: state.authentication.accessTree,
        accessSummary: getAccessSummary(state.authentication.accessTree)

    };
};

const mapActionsToProps = { setDashboardData: setDashboardData, setReportData: setReportData, setReportReset: setReportReset, setResetData: setResetData };
export default connect(mapStateToProps, mapActionsToProps)(ReportsHome);