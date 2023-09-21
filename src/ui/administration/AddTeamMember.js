import React from "react";
import { connect } from "react-redux";
import { getCreateUserRoleList, isClientSpecificRole, getRole, getRoleName } from "./utils/AdminUtils"
import { UserRoles } from "../../nomenclature/nomenclature";
import Dropdown from "../../components/DropDown"
import RxInputText from "../../components/RxInputText"
import * as Styles from "../../jsStyles/Style"
import { addTeamMember, setClientList } from "../../redux/actions/administration-actions"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executelistClientsLambda, executeCreateUserLambda } from "../../awsClients/administrationLambdas"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import Client from "../../Entity/User/Client"

class AddTeamMember extends React.Component {

  state = {
    selectedRole: UserRoles.Undefined
  };

  formDetails = {}

  constructor(props) {
    super(props);
    this.initializeFormDetails();
    this.fetchAndInitClientList = this.fetchAndInitClientList.bind(this);
    this.initCreateUserRequest = this.initCreateUserRequest.bind(this);
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
    this.organisationNameRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined) {

    }
  }

  componentDidMount() {
    this.fetchAndInitClientList()
  }

  async fetchAndInitClientList() {
    this.loadingDialog.current.showDialog();
    try {
      var result = await executelistClientsLambda();
      this.props.setClientList(result.clientList);
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message)
    }
  }

  async initCreateUserRequest(createUserRequest) {

    this.loadingDialog.current.showDialog();
    try {
      var roleName = getRoleName(createUserRequest.userRole);
      var requestCopy = { ...createUserRequest };
      requestCopy['userRole'] = roleName;
      console.log("newUser-11", requestCopy, this.props.userDetails);

      await executeCreateUserLambda(requestCopy, this.props.userDetails);
      this.messageDialog.current.showDialog("Success", "User added successfully", () => { this.props.history.goBack() })
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message)
    }
  }

  initializeFormDetails() {
    this.formDetails = {
      userName: "",
      tempPassword: "",
      userRole: getRole(getCreateUserRoleList(this.props.userDetails.userRole)[0]),
      clientName: "",
      organisationName: ""
    }
    //this.formDetails['userRole'] = getRole(getCreateUserRoleList(this.props.userDetails.userRole)[0])
  }

  onRoleSelected = (index, value) => {
    console.log("_selected", "onRoleSelected", value)
    this.formDetails.userRole = getRole(value)
    this.setState({
      selectedRole: this.formDetails.userRole
    });
  }

  onClientSelected = (index, value) => {
    var selectedRole = this.formDetails.userRole;
    var selectedClient = {}
    if (isClientSpecificRole(selectedRole)) {
      selectedClient = this.props.clientList[index];
    } else {
      selectedClient = Client.getSSF();
    }
    console.log("_onClientSelected", selectedClient)
    this.formDetails.clientName = selectedClient.name;
    this.formDetails.organisationName = selectedClient.organisation;
    console.log("_onClientSelected-2", this.formDetails)

    this.organisationNameRef.current.setText(this.formDetails.organisationName);
  }

  populateClientList = () => {
    var clientList = [];
    var selectedRole = this.formDetails.userRole;
    if (isClientSpecificRole(selectedRole)) {
      clientList = this.props.clientList;
    } else {
      clientList = [];
      clientList.push(Client.getSSF());
    }

    var client = [];
    if (clientList.length == 0)
      client = Client.getInstance();
    else
      client = clientList[0];

    this.formDetails.clientName = client.name;
    this.formDetails.organisationName = client.organisation;
    if (this.organisationNameRef.current !== null)
      this.organisationNameRef.current.setText(this.formDetails.organisationName);

    console.log("_list", this.formDetails)
    var clientNameList = []
    for (let mClient of clientList) {
      if (mClient.name === this.props.userDetails.clientName) {
        clientNameList.push(mClient.name);
      }
      if (this.props.userDetails.clientName === "SSF") {
        clientNameList.push(mClient.name);
      }
      //for (const mClient in clientList) {
    }

    return clientNameList;
  }

  onSubmit = () => {

    if (this.formDetails.userName === "") {
      this.messageDialog.current.showDialog("Validation Error", "Please enter a valid user name.")
    } else if (this.formDetails.tempPassword === "") {
      this.messageDialog.current.showDialog("Validation Error", "Please enter a valid temporary password.")
    }
    else {
      this.initCreateUserRequest(this.formDetails);
      //this.props.addMember(User.getTestTeamUser(this.formDetails.userName))
      //this.props.addMember(newUser)
      //this.messageDialog.current.showDialog("Success","User added successfully", ()=>{this.props.history.goBack()})
    }
  };

  render() {
    //👇
    console.log('this.props.userDetails -:👉', this.props.userDetails)
    //👆
    return (
      <div className="col-md-12">
        <MessageDialog
          ref={this.messageDialog}
        />
        <LoadingDialog
          ref={this.loadingDialog}
        />

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <p style={Styles.formLabel}>User Details</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        onChange={(event) => this.formDetails.userName = event.target.value}
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
                        placeholder="Temporary Password"
                        onChange={(event) => this.formDetails.tempPassword = event.target.value}
                      />
                    </InputGroup>

                    <p className="text-muted">User Role</p>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Dropdown
                        options={getCreateUserRoleList(this.props.userDetails.userRole)}
                        onSelection={this.onRoleSelected} />
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
                  <Form>
                    <p style={Styles.formLabel}>Client Selection</p>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Dropdown
                        options={this.populateClientList()}
                        onSelection={this.onClientSelected} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <RxInputText
                        ref={this.organisationNameRef}
                        text={this.formDetails.organisationName}
                        placeholder="Organisation Name"
                      />
                    </InputGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <div className={"row justiy-content-center"}
            style={{ width: "100%" }}>

            <Button
              style={{ margin: "auto" }}
              color="primary"
              className="px-4"
              onClick={this.onSubmit}>
              Submit
            </Button>

          </div>

        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userDetails: state.authentication.user,
    clientList: state.administration.clientList,
    x: 1
  };
};

const mapActionsToProps = { addMember: addTeamMember, setClientList: setClientList };
export default connect(mapStateToProps, mapActionsToProps)(AddTeamMember);