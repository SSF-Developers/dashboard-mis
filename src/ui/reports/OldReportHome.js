import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Form, Label, Input, InputGroup } from "reactstrap";
import { setDashboardData } from "../../redux/actions/dashboard-actions";
import { setReportData } from "../../redux/actions/report-actions";
import { setResetData } from "../../redux/actions/extra-actions";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executeFetchDashboardLambda } from "../../awsClients/administrationLambdas";
import { executeDeleteUserSchedulerLambda, executeFetchReportLambda2 } from "../../awsClients/incidenceLambdas";
import InputDatePicker from "../../components/InputDatePicker";
import { statsStyle, whiteSurfaceForScheduler } from "../../jsStyles/Style";
import Stats from '../dashboard/Stats';
import ComplexNavigationFullHeight from "./ComplexNavigationFullHeight";
import ComplexNavigationFullHeight2 from "./ComplexNavigationFullHeight2";
import { getAccessSummary } from "../../components/accessTree/accessTreeUtils";
import moment from "moment";
import "../complexes/ComplexComposition.css";
class ReportsHome extends Component {

    reportParms = { complex: 'all', duration: '15' }
    arrayComplex
    complex = [
        "KRH_GSCDL",
        "GSCDCL_H_COURT"
    ]

    constructor(props) {
        super(props);
        this.state = {
            cabinDetails: 'cabinDetailsData',
            button_one: false,
            showDropdown: false,
            AssignDetails: {
                duration: null,
                bwt: false,
                email: "",
                schedule: false,
                rateValue: "",
                rateUnit: "days",
                scheduleDuration: "",
                ScheduleStartDate: "",
                ScheduleEndDate: "",
                selectedDate: ""
            },
            usageStats: true,
            collectionStats: true,
            upiStats: true,
            feedbackStats: true,
            bwtStats: true,
            minEndDate: null,
            isEndDateEnabled: false
        };
        this.complexComposition = React.createRef();
        this.messageDialog = React.createRef();
        this.loadingDialog = React.createRef();
        this.fetchDashboardData = this.fetchDashboardData.bind(this);
        this.setComplexSelection = this.setComplexSelection.bind(this);
        this.setDurationSelection = this.setDurationSelection.bind(this);
        this.executeDeleteUserSchedulerLambda = this.executeDeleteUserSchedulerLambda.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPDF = this.getPDF.bind(this);
        this.showFields = this.showFields.bind(this);
        this.bwtShowFields = this.bwtShowFields.bind(this);
        this.updateAssignDetailsField = this.updateAssignDetailsField.bind(this);
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

    _handleChange = (event) => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    }

    toggleDialog = () => {
        this.setState((state, props) => ({
            visibility: !state.visibility
        }));
        this.resetData(); // call the function to reset the data
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
        this.resetData(); // call the function to reset the data
        setTimeout(() => {
            this.props.setResetData()
        }, 1000);
    };


    async fetchDashboardData() {
        console.log("this.props.user", this.props.user)
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

    // eslint-disable-next-line no-dupe-class-members
    handleChange(e) {
        if (this.state.button_one === false) {
            this.setState({ button_one: true }, () => console.log(this.state.button_one, "button"));
        } else if (this.state.button_one === true) {
            this.setState({ button_one: false }, () => console.log(this.state.button_one, "button-true"));
        }
    }

    showFields(event) {
        const targetValue = event.target.value;
        const dropdown = document.getElementById('dropdown'); // Replace 'dropdown' with the ID of your dropdown element

        if (targetValue === "yesschedule") {
            // show the fields for scheduling
            console.log("showing schedule fields");
            dropdown.classList.remove('disabledbutton');
            this.setState({
                AssignDetails: {
                    ...this.state.AssignDetails,
                    schedule: true,
                },
            });

        } else if (targetValue === "noschedule") {
            // hide the fields for scheduling
            console.log("hiding schedule fields");
            dropdown.classList.add('disabledbutton');

            this.setState({
                AssignDetails: {
                    ...this.state.AssignDetails,
                    schedule: false,
                },
            });
        }
    }
    handleStartDateSelect = (date) => {
        // const { assignDetails } = this.state;
        console.log("handleStartDateSelect", date)

        this.updateAssignDetailsField("ScheduleStartDate", date);

        // Update the minimum date for the end date
        const nextDay = moment(date).add(1, "day").toDate();
        // this.updateAssignDetailsField("ScheduleEndDate", null); // Reset the end date value
        this.setState({ minEndDate: nextDay, isEndDateEnabled: true });
    };

    bwtShowFields = (event) => {
        const targetValue = event.target.value;
        if (targetValue === "yesbwt") {
            this.setState({
                AssignDetails: {
                    ...this.state.AssignDetails,
                    bwt: true,
                },
            });
        } else if (targetValue === "nobwt") {
            this.setState({
                AssignDetails: {
                    ...this.state.AssignDetails,
                    bwt: false,
                },
            });
        }
    };

    updateAssignDetailsField = (field, value) => {
        const { AssignDetails } = this.state;
        const updatedAssignDetails = { ...AssignDetails };

        switch (field) {
            case 'duration':
                const startDate = new Date();
                const endDate = moment(value);
                const dayDifference = Math.abs(endDate.diff(startDate, 'days'));
                updatedAssignDetails.duration = dayDifference;
                updatedAssignDetails.selectedDate = value;
                break;
            case 'email':
                updatedAssignDetails.email = value;
                break;
            case 'schedule':
                updatedAssignDetails.schedule = value;
                break;
            case 'rateValue':
                updatedAssignDetails.rateValue = value;
                break;
            case 'rateUnit':
                updatedAssignDetails.rateUnit = value;
                break;
            case 'scheduleDuration':
                updatedAssignDetails.scheduleDuration = value;
                break;
            case 'ScheduleStartDate':
                updatedAssignDetails.ScheduleStartDate = value;
                break;
            case 'ScheduleEndDate':
                updatedAssignDetails.ScheduleEndDate = value;
                break;
            default:
                break;
        }

        this.setState({ AssignDetails: updatedAssignDetails }, () => {
            console.log('AssignDetails updated:', updatedAssignDetails);
        });
    };

    componentDidMount() {
        if (!this.props.hasDashboardData) {
            this.fetchDashboardData(15);
        }
    };

    render() {
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
                                >
                                    <Stats
                                        setDurationSelection={this.setDurationSelection}
                                        handleComplexSelection={this.handleComplexSelection}
                                        chartData={this.props.dashboardData.dashboardChartData}
                                        pieChartData={this.props.dashboardData.pieChartData}
                                        dataSummary={this.props.dashboardData.dataSummary}
                                        bwtChartData={this.props.dashboardData.bwtdashboardChartData}
                                        bwtPieChartData={this.props.dashboardData.bwtpieChartData}
                                        bwtDataSummary={this.props.dashboardData.bwtdataSummary}
                                        dashboardUpiChartData={this.props.dashboardData.dashboardUpiChartData}
                                        pieChartUpiData={this.props.dashboardData.pieChartUpiData}
                                        uiResult={this.props.dashboardData.uiResult.data}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.visibility}
                    toggle={this.isEnabled}
                    className={"modal-xl"}
                >
                    <ModalHeader style={{ background: '#5DC0A6', color: `white` }} toggle={this.toggleDialog}>{this.title}</ModalHeader>
                    <ModalBody
                        style={{
                            width: "100%",
                            height: '540px',
                            display: "flex"
                        }}
                    >
                        <div style={{
                            width: "100%",
                            ...whiteSurfaceForScheduler, background: 'white'
                        }}>
                            <label style={{
                                marginBottom: "0px"
                            }}>
                                <h5>
                                    Select Complex
                                </h5>
                            </label>
                            <ComplexNavigationFullHeight2 setComplexSelection={this.setComplexSelection} />
                        </div>
                        <div
                            className="scheduleReport"
                            style={{
                                width: "100%",
                                marginLeft: "15px"
                            }}>

                            <div
                                className="scheduleReport"
                                style={{ ...whiteSurfaceForScheduler, background: 'white', height: "36%" }}>
                                <div style={{
                                    ...statsStyle.scheduleTitle
                                }}>
                                    <InputDatePicker
                                        value={this.state.AssignDetails.selectedDate}
                                        onSelect={(value) => this.updateAssignDetailsField("duration", value)}
                                        minDate={new Date("01-02-2023")}
                                        maxDate={new Date()}
                                        onlyDate
                                        label="Select Past Date"
                                        type="date"
                                        placeholder="End Date"
                                        className="date-picker-input"
                                    />
                                </div>
                                <Form>
                                    <FormGroup>
                                        <InputGroup style={{ marginTop: "15px" }} className="mb-3">
                                            <Label
                                                style={{
                                                    ...statsStyle.scheduleTitle,
                                                    width: "33.5%",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >Email</Label>
                                            <Input
                                                style={{
                                                    width: "200px"
                                                }}
                                                type="text"
                                                placeholder="Email"
                                                onChange={(event) => this.updateAssignDetailsField("email", event.target.value)}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                            <Label
                                                style={{
                                                    ...statsStyle.scheduleTitle,
                                                    width: "33.5%",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >Select Stats</Label>

                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "65%"
                                            }}>
                                                <div className="React__checkbox">
                                                    <Label>
                                                        Usage&nbsp;&nbsp;
                                                        <Input
                                                            type="checkbox"
                                                            name="usageStats"
                                                            className="React__checkbox--input"
                                                            onChange={this._handleChange}
                                                            defaultChecked
                                                        />
                                                        <span
                                                            className="React__checkbox--span"
                                                        />
                                                    </Label>
                                                </div>

                                                {this.props.dashboardData.uiResult.data.collection_stats === "true" && <>
                                                    <div className="React__checkbox">
                                                        <Label>
                                                            Collection&nbsp;&nbsp;
                                                            <Input
                                                                type="checkbox"
                                                                name="collectionStats"
                                                                className="React__checkbox--input"
                                                                onChange={this._handleChange}
                                                                defaultChecked
                                                            />
                                                            <span
                                                                className="React__checkbox--span"
                                                            />
                                                        </Label>
                                                    </div>
                                                    <div className="React__checkbox">
                                                        <Label>
                                                            UPI&nbsp;&nbsp;
                                                            <Input
                                                                type="checkbox"
                                                                name="upiStats"
                                                                className="React__checkbox--input"
                                                                onChange={this._handleChange}
                                                                defaultChecked
                                                            />
                                                            <span
                                                                className="React__checkbox--span"
                                                            />
                                                        </Label>
                                                    </div>

                                                </>}
                                                <div className="React__checkbox">
                                                    <Label>
                                                        Feedback&nbsp;&nbsp;
                                                        <Input
                                                            type="checkbox"
                                                            name="feedbackStats"
                                                            className="React__checkbox--input"
                                                            onChange={this._handleChange}
                                                            defaultChecked
                                                        />
                                                        <span
                                                            className="React__checkbox--span"
                                                        />
                                                    </Label>
                                                </div>
                                                {this.props.dashboardData.uiResult.data.bwt_stats === "true" && (
                                                    <div className="React__checkbox">
                                                        <Label>
                                                            BWT&nbsp;&nbsp;
                                                            <Input
                                                                type="checkbox"
                                                                name="bwtStats"
                                                                className="React__checkbox--input"
                                                                onChange={this._handleChange}
                                                                defaultChecked
                                                            />
                                                            <span
                                                                className="React__checkbox--span"
                                                            />
                                                        </Label>
                                                    </div>

                                                )}
                                                {/* {this.props.dashboardData.uiResult.data} */}
                                            </div>
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                            </div>
                            <div
                                className="scheduleReport"
                                style={{ ...whiteSurfaceForScheduler, background: 'white', margin: "10px 0px 0px 0px" }}>
                                <Form style={{ margin: "10px 0px 0px 0px" }}>
                                    <FormGroup>
                                        <InputGroup className="mb-3" style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{
                                                ...statsStyle.scheduleTitle,
                                                width: '34%'
                                            }}>
                                                <p>Schedule Report</p>
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <Label
                                                    className="container-report"
                                                >
                                                    YES&nbsp;&nbsp;
                                                    <Input
                                                        type="radio"
                                                        className="radio-input"
                                                        value="yesschedule"
                                                        name="radio"
                                                        // disabled
                                                        onChange={this.showFields}
                                                    />
                                                    <span class="checkmark"></span>
                                                </Label>
                                                <Label
                                                    className="container-report"
                                                    style={{ marginLeft: "170%" }}
                                                >NO&nbsp;&nbsp;
                                                    <Input
                                                        type="radio"
                                                        className="radio-input"
                                                        value="noschedule"
                                                        name="radio"
                                                        onChange={this.showFields}
                                                        defaultChecked
                                                    />
                                                    <span class="checkmark"></span>
                                                </Label>
                                            </div>

                                        </InputGroup>
                                        <Form id="dropdown" className="disabledbutton" style={{ marginTop: "-30px" }}>
                                            <FormGroup>
                                                <p
                                                    style={{
                                                        ...statsStyle.scheduleLabel
                                                    }}
                                                >This report provides details of all Complexes that were used in the selected time range.
                                                </p>
                                                <InputGroup style={{}} className="mb-3">
                                                    <div style={{ width: "33%" }}>
                                                        <Label
                                                            style={{
                                                                ...statsStyle.scheduleTitle,
                                                                display: "flex",
                                                                alignItems: "center"
                                                            }}
                                                        >Rate</Label>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        width: "67%"
                                                    }} >
                                                        <Input
                                                            style={{
                                                            }}
                                                            type="number"
                                                            placeholder="Value"
                                                            min="0"
                                                            onChange={(event) => {
                                                                const inputValue = event.target.value;
                                                                if (inputValue >= 0) {
                                                                    this.updateAssignDetailsField("rateValue", inputValue);
                                                                }
                                                            }}
                                                        />
                                                        <Input
                                                            type="text"
                                                            id="exampleSelect"
                                                            placeholder="Days"
                                                            defaultValue='Days'
                                                            disabled="true"
                                                        />
                                                    </div>
                                                </InputGroup>
                                                <p
                                                    style={{
                                                        ...statsStyle.scheduleLabel
                                                    }}
                                                >A schedule that runs at a regular rate, such as every " {this.state.AssignDetails.rateValue ? this.state.AssignDetails.rateValue : "10"} Days ".</p>
                                                <div style={{ display: "flex" }}>
                                                    <Label
                                                        style={{
                                                            ...statsStyle.scheduleTitle,

                                                            display: "flex",
                                                            alignItems: "center",
                                                            width: "51%"
                                                        }}
                                                    >Report Duration</Label>
                                                    <Input
                                                        type="select"
                                                        name="select"
                                                        id="exampleSelect"
                                                        onChange={(event) => this.updateAssignDetailsField("scheduleDuration", event.target.value)}
                                                    >
                                                        <option>Last 15 days</option>
                                                        <option>Last 30 days</option>
                                                        <option>Last 45 days</option>
                                                        <option>Last 60 days</option>
                                                        <option>Last 75 days</option>
                                                        <option>Last 90 days</option>
                                                    </Input>
                                                </div>
                                                <div style={{
                                                    ...statsStyle.scheduleTitle,
                                                    margin: "10px 0px"
                                                }}>
                                                    <InputDatePicker
                                                        value={this.state.AssignDetails.ScheduleStartDate}
                                                        // onSelect={(value) => this.updateAssignDetailsField("ScheduleStartDate", value)}
                                                        onSelect={this.handleStartDateSelect}
                                                        minDate={moment().add(1, "days").toDate()}
                                                        maxDate={new Date("01-12-2030")}
                                                        onlyDate
                                                        label="Schedule start time"
                                                        type="date"
                                                        placeholder="Schedule start"
                                                        className="date-picker-input"
                                                    />
                                                </div>

                                                <div style={{
                                                    ...statsStyle.scheduleTitle
                                                }}>
                                                    <InputDatePicker
                                                        value={this.state.AssignDetails.ScheduleEndDate}
                                                        onSelect={(value) => this.updateAssignDetailsField("ScheduleEndDate", value)}
                                                        // minDate={moment().add(2, "days").toDate()}
                                                        minDate={this.state.minEndDate}
                                                        maxDate={new Date("01-12-2030")}
                                                        onlyDate
                                                        label="Schedule end time"
                                                        type="date"
                                                        placeholder="Schedule end"
                                                        className="date-picker-input"
                                                        disabled={!this.state.isEndDateEnabled}
                                                    />
                                                </div>


                                            </FormGroup>
                                        </Form>
                                    </FormGroup>
                                </Form>
                            </div>
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
                    </ModalFooter>
                </Modal>
            </div >
        );
    }

    async fetchReportData() {
        console.log("uiResult", this.props.dashboardData.uiResult.data.bwt_stats)
        console.log("bwt_stats", this.props.dashboardData.uiResult.data.bwt_stats === "false")
        const complexData = this.props.complexData
        const bwt_stats = this.props.dashboardData.uiResult.data.bwt_stats
        const collection_stats = this.props.dashboardData.uiResult.data.collection_stats

        // const duration = this.state.AssignDetails.duration;
        // const schedule = this.state.AssignDetails.schedule;
        // const rateValue = this.state.AssignDetails.rateValue;
        // const scheduleDuration = this.state.AssignDetails.scheduleDuration;
        // const ScheduleStartDate = this.state.AssignDetails.ScheduleStartDate;
        // const ScheduleEndDate = this.state.AssignDetails.ScheduleEndDate;
        // const email = this.state.AssignDetails.email;
        const {
            duration,
            schedule,
            rateValue,
            scheduleDuration,
            ScheduleStartDate,
            ScheduleEndDate,
            email,
        } = this.state.AssignDetails;
        if (collection_stats === "false") {
            this.setState({
                collectionStats: false,
                upiStats: false,
            });
        }
        if (bwt_stats === "false") {
            this.setState({ bwtStats: false });
        }


        const usageStats = this.state.usageStats;
        const collectionStats = this.state.collectionStats;
        const upiStats = this.state.upiStats;
        const feedbackStats = this.state.feedbackStats;
        const bwtStats = this.state.bwtStats;

        try {
            // Validation check
            // if (!complexData.length) {
            //     this.messageDialog.current.showDialog("Validation Error", "Please Select Complex.");
            //     return;
            // } else if (duration === null) {
            //     this.messageDialog.current.showDialog("Validation Error", "Please Select Past Date.");
            //     return;
            // } else if (usageStats === false && collectionStats === false && upiStats === false && feedbackStats === false && bwtStats === false) {
            //     this.messageDialog.current.showDialog("Validation Error", "Please Select atleast one stats.");
            //     return;
            // } else if (schedule === true) {
            //     if (rateValue === "") {
            //         this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule Rate Value.");
            //         return;
            //     } else if (scheduleDuration === "") {
            //         this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule Duration.");
            //         return;
            //     } else if (ScheduleStartDate === "") {
            //         this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule Start Date.");
            //         return;
            //     } else if (email === "") {
            //         this.messageDialog.current.showDialog("Validation Error", "Please enter an email address if you wish to schedule a report.");
            //         return;
            //     } else if (ScheduleEndDate === "") {
            //         this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule End Date.");
            //         return;  // Exit function if validation error occurs
            //     }
            // }
            if (!complexData.length) {
                this.messageDialog.current.showDialog("Validation Error", "Please Select Complex.");
                return;
            }

            if (duration === null) {
                this.messageDialog.current.showDialog("Validation Error", "Please Select Past Date.");
                return;
            }

            if (!usageStats && !collectionStats && !upiStats && !feedbackStats && !bwtStats) {
                this.messageDialog.current.showDialog("Validation Error", "Please Select at least one stat.");
                return;
            }

            if (
                schedule &&
                (rateValue === "" ||
                    scheduleDuration === "" ||
                    ScheduleStartDate === "" ||
                    email === "" ||
                    ScheduleEndDate === "")
            ) {
                if (rateValue === "") {
                    this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule Rate Value.");
                } else if (scheduleDuration === "") {
                    this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule Duration.");
                } else if (ScheduleStartDate === "") {
                    this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule Start Date.");
                } else if (email === "") {
                    this.messageDialog.current.showDialog("Validation Error", "Please enter an email address if you wish to schedule a report.");
                } else if (ScheduleEndDate === "") {
                    this.messageDialog.current.showDialog("Validation Error", "Please Select Schedule End Date.");
                }
                return;
            }


            this.loadingDialog.current.showDialog();

            var result = await executeFetchReportLambda2(this.props.user.userName,
                this.props.user.clientName,
                this.state.AssignDetails.duration,
                this.state.AssignDetails.bwt,
                this.state.AssignDetails.email,
                this.state.AssignDetails.schedule,
                this.state.AssignDetails.rateValue,
                "days",
                this.state.AssignDetails.scheduleDuration,
                this.state.AssignDetails.ScheduleStartDate,
                this.state.AssignDetails.ScheduleEndDate,
                this.state.usageStats,
                this.state.collectionStats,
                this.state.upiStats,
                this.state.feedbackStats,
                this.state.bwtStats,
                complexData
            );

            if (result.body.message == 'User Already exist') {
                const userName = result.body.userName;
                this.messageDialog.current.showDialog(
                    "Failure",
                    <>
                        "Scheduler Already exist"
                        <InputGroup className="mb-3" style={{ marginTop: "20px", justifyContent: "center" }}>
                            <Button
                                color="danger"
                                style={{ textTransform: "uppercase" }}
                                onClick={() => this.executeDeleteUserSchedulerLambda(userName)}
                            >
                                Delete User
                            </Button>
                        </InputGroup>
                    </>,
                    () => { this.props.history.goBack() }
                )
            } else {
                this.props.setReportData(result);
                var link = result.body.link
                this.messageDialog.current.showDialog(
                    "Report Generated",
                    <a href={link} target="_blank" without rel="noopener noreferrer" download={link}>Link for your PDF</a>
                );
            }
            this.loadingDialog.current.closeDialog();
            this.resetData(); // call the function to reset the data
            setTimeout(() => {
                this.props.setResetData()
            }, 1000);
            this.setState((state, props) => ({
                visibility: !state.visibility
            }));
        } catch (err) {
            console.log('_lambda', err)
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }



    resetData() {
        this.setState({
            AssignDetails: {
                duration: null,
                bwt: false,
                email: "",
                schedule: false,
                rateValue: "",
                rateUnit: "",
                scheduleDuration: "",
                ScheduleStartDate: "",
                ScheduleEndDate: "",
                selectedDate: ""
            }
        });
        this.setState({
            usageStats: true,
            collectionStats: true,
            upiStats: true,
            feedbackStats: true,
            bwtStats: true,
        })
    }

    async executeDeleteUserSchedulerLambda(userName) {
        this.loadingDialog.current.showDialog();
        try {
            var result = await executeDeleteUserSchedulerLambda(userName);
            this.messageDialog.current.showDialog("Success", "User deleted successfully", () => { this.props.history.goBack() })
            this.loadingDialog.current.closeDialog();
        } catch (err) {
            console.log('_lambda', err)
            this.loadingDialog.current.closeDialog();
            this.messageDialog.current.showDialog("Error Alert!", err.message)
        }
    }

    getPDF() {
        this.fetchReportData();
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        dashboardData: state.dashboard.data,
        hasDashboardData: state.dashboard.hasData,
        complexData: state.extra.data,
        hasComplexData: state.extra.hasData,
        accessTree: state.authentication.accessTree,
        accessSummary: getAccessSummary(state.authentication.accessTree)

    };
};

const mapActionsToProps = { setDashboardData: setDashboardData, setResetData: setResetData, setReportData: setReportData };
export default connect(mapStateToProps, mapActionsToProps)(ReportsHome);