import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import {
  pushComplexComposition,
  updateSelectedCabin,
} from "../../redux/actions/complex-actions";
import {
  addTeamMember,
  setClientList,
} from "../../redux/actions/administration-actions";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executeGetComplexCompositionLambda } from "../../awsClients/complexLambdas";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { executeCreateTicketLambda, executeGetFileS3, executeS3Bucket, executeUploadFileS3, uploadToS3Bucket } from "../../awsClients/incidenceLambdas";
import IncidenceNavigation from "./IncidenceNavigation";
import moment from "moment";
import { whiteSurface } from "../../jsStyles/Style";

class CreateNewTicket extends React.Component {
  formDetails = {};
  fakeData = [];
  constructor(props) {
    super(props);
    this.initCreateTicketRequest = this.initCreateTicketRequest.bind(this);
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
    this.organisationNameRef = React.createRef();
    this.selectFiles = this.selectFiles.bind(this);
    this.state = {
      button_one: false,
      previewImages: [],
      imageName: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.timestamp = Date.now();
    this.fetchComplexComposition = this.fetchComplexComposition.bind(this);
  }
  componentDidMount() {
    if (
      this.props.complex !== undefined &&
      this.props.complexStore[this.props.complex.name] == undefined
    )
      this.fetchComplexComposition();
  }

  componentDidUpdate() {
    if (
      this.props.complex !== undefined &&
      this.props.complexStore[this.props.complex.name] == undefined
    )
      this.fetchComplexComposition();
  }


  async fetchComplexComposition() {
    this.loadingDialog.current.showDialog();
    try {
      var result = await executeGetComplexCompositionLambda(
        this.props.complex.name
      );
      this.props.pushComplexComposition(
        this.props.hierarchy,
        this.props.complex,
        result
      );
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message);
    }
  }


  handleClick(e) {
    if (this.state.button_one === false) {
      this.setState({ button_one: true }, () => console.log(this.state.button_one, "button"));
    } else if (this.state.button_one === true) {
      this.setState({ button_one: false }, () => console.log(this.state.button_one, "button-true"));
    }
  }

  selectFiles(event) {
    let images = [];
    let imageName = [];
    let limit = 5
    if (event.target.files.length > limit) {
      event.preventDefault();
      this.messageDialog.current.showDialog("Limit exceeds", "Only 5 images are allowed",);
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]))
        imageName.push(event.target.files[i])
      }
    }
    this.setState({
      imageName: imageName,
      previewImages: images
    }, () => console.log(images, "imageName"));
  }


  async initCreateTicketRequest(createUserRequest) {
    this.loadingDialog.current.showDialog();
    try {
      var requestCopy = { ...createUserRequest };
      let res = [];
      res.push(await executeCreateTicketLambda(requestCopy));
      let ticketId = res[0].ticketId
      this.messageDialog.current.showDialog("Ticket Submitted", "Ticket successfully submitted, your reference id is: " + ticketId, () => { this.props.history.goBack() });

      if (ticketId && this.state.imageName) {
        Promise.all(this.state.imageName).then((values) => {
          this.state.imageName.forEach((element, index) => {
            let fileId = element
            let NewUpdatedName = "Raise-" + "Photo-" + "10" + index
            let fileName = NewUpdatedName
            executeUploadFileS3(ticketId, fileName, fileId)
          });
        })
      }
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message);
    }
  }

  onSubmit = () => {
    if (this.formDetails.title === "") {
      this.messageDialog.current.showDialog(
        "Validation Error",
        "Please enter a title."
      );
    } else if (this.formDetails.description === "") {
      this.messageDialog.current.showDialog(
        "Validation Error",
        "Please enter a valid description."
      );
    } else if (this.formDetails.complex_name === "") {
      this.messageDialog.current.showDialog(
        "Validation Error",
        "Please enter a valid complex_name."
      );
    }
    else {
      this.initCreateTicketRequest(this.formDetails);
    }
  };


  render() {
    const { previewImages } = this.state;
    console.log(this.props, "THIS_PROPS_USER");
    return (
      <div className="col-md-12">
        <MessageDialog ref={this.messageDialog} />
        <LoadingDialog ref={this.loadingDialog} />

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="text-muted">Unit Selection</p>
                      <Button
                        color="primary"
                        className="px-4"
                        id="button_one"
                        onClick={this.handleClick}
                      >
                        Select Unit
                      </Button>
                    </div>
                  </Form>
                  {this.state.button_one ? (
                    <dvi>
                      <IncidenceNavigation />
                    </dvi>
                  ) : (
                    ""
                  )}
                  <this.ComponentSelector />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <p className="text-muted">Ticket Details</p>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        onChange={(event) =>
                          (this.formDetails.criticality = event.target.value)
                        }
                      >
                        <option value="">
                          Select
                        </option>
                        <option value="Normal">
                          Normal: A non-critical malfunction
                        </option>
                        <option value="Urgent">
                          Urgent: A critical malfunction
                        </option>
                        <option value="Possible Fault">
                          Possible Fault: Possible Malfunction
                        </option>
                      </Input>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Title"
                        onChange={(event) =>
                          (this.formDetails.title = event.target.value)
                        }
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="textarea"
                        placeholder="Description"
                        onChange={(event) =>
                          (this.formDetails.description = event.target.value)
                        }
                      />
                    </InputGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  <div className="form-group multi-preview">
                    {previewImages && (
                      <div>
                        {previewImages.map((img, i) => {
                          return <img style={{
                            ...whiteSurface,
                            background: "white", width: "200px", height: "200px", margin: "10px", borderRadius: "10px", border: "5px solid white"
                          }} src={img} alt={"image-" + i} key={i} />;
                        })}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input type="file" multiple accept="image/*" onChange={this.selectFiles} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <div
            className={"row justiy-content-center"}
            style={{ width: "100%" }}
          >
            <Button
              style={{ margin: "auto" }}
              color="primary"
              className="px-4"
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </div>
        </Container>
      </div>
    );
  }
  ComponentSelector = () => {
    var complex = undefined;
    if (this.props.complex !== undefined)
      complex = this.props.complexStore[this.props.complex.name];
    if (complex !== undefined)
      return (
        <Fragment>
          <this.ComplexHeader />
        </Fragment>
      );
    return <div></div>;
  };

  ComplexHeader = () => {
    const { location } = this.props
    var currentTime = new Date()
    var month = currentTime.getMonth()
    var monthCodes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
    var index = monthCodes[month];
    var year = moment().format('YY');
    var yearMonthCode = (year + "-" + index)
    var complex = this.props.complexStore[this.props.complex.name];
    // this.fakeData.push(complex.hierarchy)
    // if (this.state.button_one === true && this.fakeData.length > 0) {
    //   this.setState({ button_one: false });
    // }
    this.formDetails = {
      assigned_by: "",
      assignemt_type: "",
      assignment_comment: "",
      city_code: complex.hierarchy.cityCode,
      city_name: "",
      client_name: complex.complexDetails.client,
      complex_name: "",
      creator_id: location.state.user.userName,
      creator_role: location.state.user.userRole,
      criticality: "",
      description: "",
      district_code: complex.hierarchy.districtCode,
      district_name: complex.hierarchy.district,
      fileList: [],
      lead_id: "",
      lead_role: "",
      short_thing_name: "",
      state_code: complex.hierarchy.stateCode,
      state_name: complex.hierarchy.state,
      thing_name: "",
      ticket_id: "",
      ticket_status: "",
      timestamp: 0,
      title: "",
      yearMonthCode: yearMonthCode,
    }
    return (
      <div style={{ width: "-webkit-fill-available" }}>
        <Form>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="State"
              value={this.formDetails.complex_name = complex.complexDetails.name}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="District"
              value={this.formDetails.city_name = complex.hierarchy.city}
            />
          </InputGroup>

          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="City"
              value={complex.hierarchy.stateCode + ":" + complex.hierarchy.district}
            />
          </InputGroup>
        </Form>
      </div>
    );
  };
  setSelectedCabin = (cabin) => {
    this.props.updateSelectedCabin(cabin);
  };
}
const mapStateToProps = (state) => {
  return {
    complexStore: state.complexStore,
    complex: state.complexStore.complex,
    cabin: state.complexStore.cabin,
    hierarchy: state.complexStore.hierarchy,
    x: 1,
  };
};

const mapActionsToProps = {
  pushComplexComposition: pushComplexComposition,
  updateSelectedCabin: updateSelectedCabin,
  addMember: addTeamMember,
  setClientList: setClientList,
};
export default connect(mapStateToProps, mapActionsToProps)(CreateNewTicket);