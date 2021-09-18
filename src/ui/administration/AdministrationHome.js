import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import List from "../../components/List";
import { setTeamList } from "../../redux/actions/administration-actions";
import {executelistTeamLambda} from "../../awsLambdaClients/administrationLambdas"
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import NoDataComponent from "../../components/NoDataComponent"

class AdministrationHome extends Component {
  constructor(props) {
    super(props);
    this.FooterComponent = this.FooterComponent.bind(this);
    this.mDataSummaryComponent = React.createRef();
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
    this.fetchAndInitTeam = this.fetchAndInitTeam.bind(this);
  }


  state = {
    
  };

  async fetchAndInitTeam() {
    this.loadingDialog.current.showDialog();
    try{
      console.log("_user",this.props.user);
      var result = await executelistTeamLambda(this.props.user.userName);
      this.props.setTeamList(result.teamDetails);
      this.loadingDialog.current.closeDialog();
    }catch(err){
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog("Error Alert!",err.message)
    }
  }

   componentDidMount (){
     this.fetchAndInitTeam();
  };

  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    return (
      <div
        className="animated fadeIn"
        style={{
          padding: "10px",
        }}
      >
        <MessageDialog ref={this.messageDialog} />
        <LoadingDialog ref={this.loadingDialog} />

        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardHeader>
                <h1>Administration</h1>
              </CardHeader>

              <CardBody>
                <this.FooterComponent teamSize={this.props.teamList.length}/>
              </CardBody>


            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <this.Greeting teamList={this.props.teamList} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  Greeting = (props) => {
    if (props.teamList.length === 0) {
      return <NoDataComponent />;
    }
    return <List data={props.teamList} />;
  }

  FooterComponent(props) {
    console.log("_footer",props)
    return (
      <div
        className={"row"}
        style={{ margin: "0px", width: "100%" }}
      >
        <div
          className={"col-md-4"}
          style={{
            justifyContent: "right",
            alignItems: "right",
            float: "right"
          }}
        >
          <div className={"row-md-12"}>
            <b>Team Size: </b><i>{props.teamSize}</i>
          </div>
        </div>

        <div
          className={"col-md-4 offset-md-4"}
          style={{
            justifyContent: "right",
            alignItems: "right",
            float: "right"
          }}
        >
          <Button
            onClick={() => {
              this.props.history.push("/administration/addTeamMember")
            }
            }
            outline
            color="primary"
            className="px-4"
            style={{

              float: "right"
            }}
          >Add Team Member
          </Button>
        </div>
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    teamList: state.administration.teamList,
    user: state.authentication.user
  };
};

const mapActionsToProps = { setTeamList: setTeamList };

export default connect(mapStateToProps, mapActionsToProps)(AdministrationHome);
