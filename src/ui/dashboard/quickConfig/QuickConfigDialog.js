import React, { Component } from "react";
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup,
  InputGroupAddon, Input,
  InputGroupText,
  TabContent,
  TabPane,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
import { dashboardStyle } from '../../../jsStyles/Style'
import { OdsConfigList } from '../../../components/ConfigLabels'
import { executePublishConfigLambda } from '../../../awsClients/complexLambdas'
import { whiteSurface } from "../../../jsStyles/Style"
import { ThreeSixty } from "@material-ui/icons";
import DropDown from '../../../components/DropDown'
import RxInputCheckbox from '../../../components/RxInputCheckbox'
import { CabinType } from '../../../nomenclature/nomenclature'
import { UsageChargeConfigView } from '../../../components/QuickConfigLabels'
import QuickConfigDialogTab from "./QuickConfigDialogTab";
class QuickConfigDialog extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: props.activeTab
    };
  }

  title = ""
  onClickAction
  state = {
    visibility: false
  };

  async submitConfig() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== undefined)
      this.setState({ message: nextProps.message });
  }

  toggleDialog = () => {
    this.setState((state, props) => ({
      visibility: !state.visibility
    }));
  };

  showDialog = (onClickAction) => {
    this.title = 'Quick Config';
    if (onClickAction !== undefined)
      this.onClickAction = onClickAction
    else
      this.onClickAction = undefined
    this.setState((state, props) => ({
      visibility: !state.visibility
    }));
  };

  onClick = () => {
    this.submitConfig();
  }

  updateConfig = (configName, configValue) => {

  }

  handleUpdate = () => {

  }

  toggle(configTabType) {
    this.setState({
      activeTab: configTabType
    });
  }

  tabPane() {
    return (
      <>
      {this.props.tabData.map((item, index) => {
        return <TabPane tabId={item.type}>
        <QuickConfigDialogTab 
        configTab = {item.type}
        handleUpdate = {this.props.handleUpdate}
        configView = {item.configView}
        clientList = {this.props.clientList}
        />
      </TabPane>
        
      })}
      </>
    );
  }



  render() {
    return (
      <Modal
        isOpen={this.state.visibility}
        toggle={this.isEnabled}
        className={"modal-la"}
        style={{ width: "900px" }}
      >
        <ModalHeader style={{ background: '#5DC0A6', color: `white` }} toggle={this.toggleDialog}>{this.title}</ModalHeader>
        <ModalBody
          style={{
            width: "100%",
            height: '600px',
            overflowY: 'scroll'
          }}
        >
          <table style={{ width: "100%", padding: '0px' }}>
            <tbody>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{
                    ...whiteSurface, background: 'white', marginTop: '20px',
                    width: "100%", padding: "10px"
                  }}>
                    <div className="animated fadeIn">
                      <Row>
                        <Col xs="12" md="12" >
                          <Nav tabs>
                            {this.props.tabData.map((item, index) => {
                              return <NavItem>
                                <NavLink
                                  active={this.state.activeTab === item.type}
                                  onClick={() => {
                                    this.toggle(item.type);
                                  }}
                                >
                                  {item.label}
                                </NavLink>
                              </NavItem>
                              
                            })}




                          </Nav>
                          <TabContent activeTab={this.state.activeTab}>
                            {this.tabPane()}
                          </TabContent>
                        </Col>
                      </Row>
                    </div>
                  </div>

                </td>
              </tr>

            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>

          <Button color="primary" onClick={this.onClick}>
            SUBMIT
          </Button>{" "}

        </ModalFooter>
      </Modal>
    );
  }
}

export default QuickConfigDialog;
