import React from "react";
import { connect } from "react-redux";
import { UserRoles } from "../../nomenclature/nomenclature";
import * as Styles from "../../jsStyles/Style"
import {
  colorTheme,
  whiteSurface3,
  statsStyle,
  complexCompositionStyle,
  whiteSurfaceCircularBorder
} from "../../jsStyles/Style"
import { addTeamMember, setClientList, setUiList, setUiReset } from "../../redux/actions/administration-actions"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import { executelistClientsLambda, executePermissionUiLambda, executeFetchUILambda } from "../../awsClients/administrationLambdas"
import {
  Button,
  Container,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import "./GrantPermissions.css"
import icToilet from "../../assets/img/icons/ic_toilet.png";


class GrantPermissions extends React.Component {

  state = {
    selectedRole: UserRoles.Undefined
  };

  uiDetails = {}
  selectedClient = {}

  constructor(props) {
    super(props);
    this.fetchAndInitClientList = this.fetchAndInitClientList.bind(this);
    this.initCreatePermissionRequest = this.initCreatePermissionRequest.bind(this);
    this.fetchClientWiseUI = this.fetchClientWiseUI.bind(this);
    this.initializeUiDetails();
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined) {
    }
  }

  componentDidMount() {
    this.fetchAndInitClientList()
    setTimeout(() => {
      this.initializeUiDetails();
    }, 5000);
  }

  initializeUiDetails() {
    this.uiDetails = {
      clientName: "",
      collection_stats: this.props.data.collection_stats,
      methane: this.props.data.methane,
      ammonia: this.props.data.ammonia,
      luminous: this.props.data.luminous,
      usage_charge: this.props.data.usage_charge,
      carbon_monooxide: this.props.data.carbon_monooxide,
      air_dryer_health: this.props.data.air_dryer_health,
      choke_health: this.props.data.choke_health,
      tap_health: this.props.data.tap_health,
      usage_charge_profile: this.props.data.usage_charge_profile,
      air_dryer_profile: this.props.data.air_dryer_profile,
      rfid_profile: this.props.data.rfid_profile,
      alp: this.props.data.alp,
      mp1_valve: this.props.data.mp1_valve,
      mp2_valve: this.props.data.mp2_valve,
      mp3_valve: this.props.data.mp3_valve,
      mp4_valve: this.props.data.mp4_valve,
      turbidity_value: this.props.data.turbidity_value,
      total_usage: this.props.data.total_usage,
      average_feedback: this.props.data.average_feedback,
      water_saved: this.props.data.water_saved,
      bwt_stats: this.props.data.bwt_stats
    }
  }
  async fetchAndInitClientList() {
    this.loadingDialog.current.showDialog();
    try {
      var result = await executelistClientsLambda();
      this.props.setClientList(result.clientList);
      this.fetchClientWiseUI("SSF")
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message)
    }
  }

  async fetchClientWiseUI(data) {
    this.loadingDialog.current.showDialog();
    try {
      var result = await executeFetchUILambda(data);
      this.props.setUiList(result.data);
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message)
    }
  }

  async initCreatePermissionRequest(createUserRequest) {
    this.loadingDialog.current.showDialog();
    try {
      var requestCopy = { ...createUserRequest };
      await executePermissionUiLambda(requestCopy);
      this.props.setUiReset()
      this.messageDialog.current.showDialog("Success", "UI added successfully", () => {
        this.props.history.goBack()
      })
      this.loadingDialog.current.closeDialog();
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!", err.message)
    }
  }

  onClientSelected = (event) => {
    this.uiDetails.clientName = event.target.value
    this.fetchClientWiseUI(event.target.value)
  }

  onSubmit = () => {
    this.initCreatePermissionRequest(this.uiDetails);
  };

  render() {
    console.log('props -:👉', this.props)

    return (
      <div>
        <div
          className="animated fadeIn"
          style={{ padding: "10px" }}>
          <div className="col-md-13">
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                background: colorTheme.primary,
                padding: "10px",
                marginTop: '20px'
              }}
            >

              <div style={{ float: "left", marginLeft: "10px" }}>
                <div style={{ ...complexCompositionStyle.complexTitleClientMax }}>
                  {"UI CUSTOMIZATION"}
                </div>
              </div>
            </div>
            <div style={{ ...whiteSurface3, background: "white", padding: "10px 10px 10px 10px" }}>
              <Form>
                <p style={Styles.formLabel}>Client Selection</p>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    onChange={(event) =>
                      (this.onClientSelected(event))
                    }
                  >
                    <option disabled selected hidden >
                      Select Client
                    </option>
                    {
                      this.props.clientList !== undefined && this.props.clientList.map((data, index) => {
                        return (
                          <option value={data.name}>
                            {data.name}
                          </option>
                        )
                      })
                    }

                  </Input>
                </InputGroup>
              </Form>
            </div>
          </div>
          <div className="row" >
            <div className="col-md-4"
            >
              <MessageDialog
                ref={this.messageDialog}
              />
              <LoadingDialog
                ref={this.loadingDialog}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  background: colorTheme.primary,
                  padding: "10px",
                  marginTop: '20px'
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
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "5%",
                    }}
                  />
                </div>

                <div style={{ float: "left", marginLeft: "10px" }}>
                  <div style={{ ...complexCompositionStyle.complexTitleClientMax }}>
                    {"Dashboard"}
                  </div>
                </div>
              </div>
              <div style={{ ...whiteSurface3, background: "white", padding: "10px 10px 10px 10px", height: "450px" }}>
                <Form>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>Total Indicator</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label class="switch">Total Usage
                      <input
                        type="checkbox"
                        onClick={(event) => (
                          this.uiDetails.total_usage = event.target.checked
                        )}
                        name="Total Usage"
                        defaultChecked={
                          this.props.data.total_usage === "false" ? false : this.props.data.total_usage}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Average Feedback
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.average_feedback = event.target.checked)
                        }
                        name="Average Feedback"
                        defaultChecked={this.props.data.average_feedback === "false" ? false : this.props.data.average_feedback}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Water Saved
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.water_saved = event.target.checked)
                        }
                        name="Water Saved"
                        defaultChecked={this.props.data.water_saved === "false" ? false : this.props.data.water_saved}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>Collection</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label class="switch">Collection Stats
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.collection_stats = event.target.checked)
                        }
                        name="Collection"
                        defaultChecked={this.props.data.collection_stats === "false" ? false : this.props.data.collection_stats}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Usage QuickConfig
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.usage_charge = event.target.checked)
                        }
                        name="usage_charge"
                        defaultChecked={this.props.data.usage_charge === "false" ? false : this.props.data.usage_charge}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Usage Profile
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.usage_charge_profile = event.target.checked)
                        }
                        name="usage_charge_profile"
                        defaultChecked={this.props.data.usage_charge_profile === "false" ? false : this.props.data.usage_charge_profile}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>BWT</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label class="switch">Re-Water Stats
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.bwt_stats = event.target.checked)
                        }
                        name="Collection"
                        defaultChecked={this.props.data.bwt_stats === "false" ? false : this.props.data.bwt_stats}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-md-4" >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  background: colorTheme.primary,
                  padding: "10px",
                  marginTop: '20px'
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
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "5%",
                    }}
                  />
                </div>

                <div style={{ float: "left", marginLeft: "10px" }}>
                  <div style={{ ...complexCompositionStyle.complexTitleClientMax }}>
                    {"Complex"}
                  </div>
                </div>
              </div>
              <div style={{ ...whiteSurface3, background: "white", padding: "10px 10px 10px 10px", height: "450px" }}>
                <Form>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>Cabin Status</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label class="switch">Carbon monooxide
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.carbon_monooxide = event.target.checked)
                        }
                        name="Carbon monooxide"
                        defaultChecked={this.props.data.carbon_monooxide === "false" ? false : this.props.data.carbon_monooxide}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Methane
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.methane = event.target.checked)
                        }
                        name="Methane"
                        defaultChecked={this.props.data.methane === "false" ? false : this.props.data.methane}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Ammonia
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.ammonia = event.target.checked)
                        }
                        name="Ammonia"
                        defaultChecked={this.props.data.ammonia === "false" ? false : this.props.data.ammonia}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Luminous
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.luminous = event.target.checked)
                        }
                        name="Luminous"
                        defaultChecked={this.props.data.luminous === "false" ? false : this.props.data.luminous}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>Cabin Health</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label class="switch">Air Dryer
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.air_dryer_health = event.target.checked)
                        }
                        name="Air Dryer"
                        defaultChecked={this.props.data.air_dryer_health === "false" ? false : this.props.data.air_dryer_health}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Choke
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.choke_health = event.target.checked)
                        }
                        name="Choke"
                        defaultChecked={this.props.data.choke_health === "false" ? false : this.props.data.choke_health}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">Tap
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.tap_health = event.target.checked)
                        }
                        name="Tap"
                        defaultChecked={this.props.data.tap_health === "false" ? false : this.props.data.tap_health}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>Usage Profile</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* <label class="switch">Usage Charges
                        <input
                          type="checkbox"
                          onClick={(event) =>
                            (this.uiDetails.usage_charge_profile = event.target.checked)
                          }
                          name="Usage Charges"
  
                          defaultChecked={this.uiDetails.collection_stats}
                        />
                        <span class="slider round"></span>
                      </label> */}
                    <label class="switch">Air Dryer
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.air_dryer_profile = event.target.checked)
                        }
                        name="Air Dryer"
                        defaultChecked={this.props.data.air_dryer_profile === "false" ? false : this.props.data.air_dryer_profile}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">RFID
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.rfid_profile = event.target.checked)
                        }
                        name="RFID"
                        defaultChecked={this.props.data.rfid_profile === "false" ? false : this.props.data.rfid_profile}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-md-4" ><div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                background: colorTheme.primary,
                padding: "10px",
                marginTop: '20px'
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
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5%",
                  }}
                />
              </div>

              <div style={{ float: "left", marginLeft: "10px" }}>
                <div style={{ ...complexCompositionStyle.complexTitleClientMax }}>
                  {"BWT"}
                </div>
              </div>
            </div>
              <div style={{ ...whiteSurface3, background: "white", padding: "10px 10px 10px 10px", height: "450px" }}>
                <Form>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>System Health</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label class="switch">ALP
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.alp = event.target.checked)
                        }
                        name="ALP"
                        defaultChecked={this.props.data.alp === "false" ? false : this.props.data.alp}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">MP1 Valve
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.mp1_valve = event.target.checked)
                        }
                        name="MP1 Valve"
                        defaultChecked={this.props.data.mp1_valve === "false" ? false : this.props.data.mp1_valve}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">MP2 Valve
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.mp2_valve = event.target.checked)
                        }
                        name="MP2 Valve"
                        defaultChecked={this.props.data.mp2_valve === "false" ? false : this.props.data.mp2_valve}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">MP3 Valve
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.mp3_valve = event.target.checked)
                        }
                        name="MP2 Valve"
                        defaultChecked={this.props.data.mp3_valve === "false" ? false : this.props.data.mp3_valve}
                      />
                      <span class="slider round"></span>
                    </label>
                    <label class="switch">MP4 Valve
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.mp4_valve = event.target.checked)
                        }
                        name="MP2 Valve"
                        defaultChecked={this.props.data.mp4_valve === "false" ? false : this.props.data.mp4_valve}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div>
                    <p style={{ ...statsStyle.cardLabel }}>Usage</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label class="switch">Turbidity Value
                      <input
                        type="checkbox"
                        onClick={(event) =>
                          (this.uiDetails.turbidity_value = event.target.checked)
                        }
                        name="Turbidity Value"
                        defaultChecked={this.props.data.turbidity_value === "false" ? false : this.props.data.turbidity_value}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <Container >
          <div className={"row justiy-content-center"}
            style={{ width: "100%", padding: "20px" }}>
            <Button
              style={{ margin: "auto" }}
              color="primary"
              className="px-5"
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
    data: state.administration.data,
    x: 1
  };
};

const mapActionsToProps = { addMember: addTeamMember, setClientList: setClientList, setUiList: setUiList, setUiReset: setUiReset };
export default connect(mapStateToProps, mapActionsToProps)(GrantPermissions);