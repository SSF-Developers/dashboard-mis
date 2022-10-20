import React, { Component } from "react";
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup,
  InputGroupAddon, Input,
  InputGroupText
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
class QuickConfigDialogTab extends Component {

  constructor(props) {
    super(props);
    this.odsConfig = undefined
  }

  title = ""
  onClickAction
  state = {
    visibility: false
  };



  render() {
    return (
      // <Modal
      //   isOpen={this.state.visibility}
      //   toggle={this.toggle}
      //   className={"modal-la"}
      //   style={{ width: "900px" }}
      // >
      //   <ModalHeader style={{ background: '#5DC0A6', color: `white` }} toggle={this.toggle}>{this.title}</ModalHeader>
      //   <ModalBody
      //     style={{
      //       width: "100%",
      //       height: '600px',
      //       overflowY: 'scroll'
      //     }}
      //   >
      <table style={{ width: "100%", padding: '0px' }}>
        <tbody>
          <tr>
            <td style={{ width: '100%' }}>
              <div style={{ ...dashboardStyle.label, width: '100%' }}>
                Below listed parameters control the Usage Charge and Payment Mode settings for the units. The changes made here will take effect for all the units/cabins as per the selections made in the Config-Scope Section.
              </div>
            </td>
          </tr>



          <tr>
            <td style={{ width: '100%' }}>
              <div style={{
                ...whiteSurface, background: 'white', marginTop: '20px',
                width: "100%", padding: "10px"
              }}>
                <this.ClientSelection />
              </div>

            </td>
          </tr>

          <tr>
            <td style={{ width: '100%' }}>
              <div >
                <this.props.configView />
              </div>
            </td>
          </tr>

        </tbody>
      </table>
      //   </ModalBody>
      //   <ModalFooter>

      //     <Button color="primary" onClick={this.onClick}>
      //       SUBMIT
      //     </Button>{" "}

      //   </ModalFooter>
      // </Modal>
    );
  }


  setSelectedClient = (client) => {
    this.setSelectedClient = client;
  }

  ClientSelection = () => {
    return (
      <div className="row">
        <div className='col-md-4' >
          <div style={{ ...dashboardStyle.label, float: 'right' }}>
            Client Selection
          </div>
        </div>

        <div className='col-md-8'>
          <DropDown
            options={["None", "Coin", "RFID", "Coin and RF"]}
            onSelection={(index, value) => {
              this.setSelectedClient(value);

            }}
          // onSelection={(index,value) => {setCriticality(value); {props.onSelection(index,value)}}}
          />
        </div>
      </div>
    );
  }

  ScopeConfig = () => {

    return (
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-md-4">
          <div style={{ ...dashboardStyle.label, float: 'right' }}>
            Scope Config
          </div>
        </div>

        <div className="col-md-8">
          <table style={{ width: "100%" }}>
            <tbody>
              <tr >
                <td style={{ width: '50%' }}>
                  <div >
                    <RxInputCheckbox withLabel label={'Male WC'} selected={false} onChange={e => this.onScopeSelected(e, CabinType.MWC)} />
                  </div>
                </td>

                <td style={{ width: '50%' }}>
                  <div >
                    <RxInputCheckbox withLabel label={'Female WC'} selected={false} onChange={e => this.onScopeSelected(e, CabinType.FWC)} />
                  </div>
                </td>
              </tr>
              <tr >
                <td style={{ width: '50%' }}>
                  <div >
                    <RxInputCheckbox withLabel label={'PD WC'} selected={false} onChange={e => this.onScopeSelected(e, CabinType.PD)} />
                  </div>

                </td>

                <td style={{ width: '50%' }}>
                  <div >
                    <RxInputCheckbox withLabel label={'Male Urinal'} selected={false} onChange={e => this.onScopeSelected(e, CabinType.MUR)} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  onScopeSelected = (selected, cabinType) => {
    if (selected) {
      this.setSelectedScope = cabinType
    }
  }
}

export default QuickConfigDialogTab;
