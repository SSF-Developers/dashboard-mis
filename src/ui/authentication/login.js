import React from "react";
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
import { connect } from "react-redux";
import logo from "../../assets/img/brand/logo.png";
import bg from "../../assets/img/brand/restroom.jpg";
import MessageDialog from "../../dialogs/MessageDialog";
import LoadingDialog from "../../dialogs/LoadingDialog";
import AuthClient from "./authClient";
import { setLoggedIn } from "../../redux/actions/authentication-actions";
import { executeGetUserDetailsLambda } from "../../awsClients/administrationLambdas";

class login2 extends React.Component {
  email = "";
  password = "";
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.messageDialog = React.createRef();
    this.loadingDialog = React.createRef();
  }

  state = {
    totalUsage: "0",
    averageFeedback: "0",
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined) {
    }
  }

  async onSubmit() {
    try {
      this.loadingDialog.current.showDialog();
      var result = await new AuthClient().login(this.email, this.password);
      // var result = await new AuthClient().login("dev_000000", "Changeme11!");

      var userDetails = await executeGetUserDetailsLambda(this.email);
      // var userDetails = await executeGetUserDetailsLambda("dev_000000");
      this.props.setLoggedIn(userDetails);

      this.loadingDialog.current.closeDialog();
      this.props.history.push("/dashboard");
      console.log("_login", result);
    } catch (err) {
      this.loadingDialog.current.closeDialog();
      this.messageDialog.current.showDialog(err.title, err.message);
      console.log("_login", err);
    }
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  HeaderComponent = () => {
    return (
      <div
        className={"row"}
        style={{
          marginTop: "40px",
        }}
      >
        <div className={"col"}>
          <div className={"row justify-content-center"}>
            <img
              src={logo}
              alt=""
              style={{
                marginTop: "20px",
                width: "180px",
                height: "30px",
                borderRadius: "5%",
              }}
            />
            {/* <img
              src="https://pbs.twimg.com/profile_images/976762671788797952/0vtsWKqX_400x400.jpg"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
              }}
            /> */}
          </div>

          <div class={"row justify-content-center"}></div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        className="col-md-12"
        style={{
          backgroundImage: "url(" + bg + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <MessageDialog ref={this.messageDialog} />
        <LoadingDialog ref={this.loadingDialog} />
        <div
          className="app flex-row align-items-center"
          style={{ transition: "opacity 2.5s", opacity: ".9" }}
        >
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card
                    className="text-black py-5 d-md-down-none"
                    style={{ width: "24%" }}
                  >
                    <CardBody className="text-center">
                      <this.HeaderComponent />
                    </CardBody>
                  </Card>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Username"
                            onChange={(event) =>
                              this.setEmail(event.target.value)
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
                            type="password"
                            placeholder="Password"
                            onChange={(event) =>
                              this.setPassword(event.target.value)
                            }
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button
                              color="primary"
                              className="px-4"
                              onClick={this.onSubmit}
                            //   onClick={() => {
                            //     this.props.history.push("/dashboard");
                            //   }}
                            >
                              Login
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // teamList: state.administration.authenticated
  };
};

const mapActionsToProps = { setLoggedIn: setLoggedIn };

export default connect(mapStateToProps, mapActionsToProps)(login2);
// import React from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardGroup,
//   Col,
//   Container,
//   Form,
//   Input,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Row,
// } from "reactstrap";
// import { connect } from "react-redux";
// import logo from "../../assets/img/brand/logo.png";
// import bg from "../../assets/img/brand/restroom.jpg";
// import MessageDialog from "../../dialogs/MessageDialog";
// import LoadingDialog from "../../dialogs/LoadingDialog";
// import AuthClient from "./authClient";
// import { setLoggedIn } from "../../redux/actions/authentication-actions";
// import { executeGetUserDetailsLambda } from "../../awsClients/administrationLambdas";

// class login2 extends React.Component {
//   email = "";
//   password = "";

//   constructor(props) {
//     super(props);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.messageDialog = React.createRef();
//     this.loadingDialog = React.createRef();
//   }

//   componentDidMount() {
//     // Check if user details exist in session storage
//     const userDetails = sessionStorage.getItem("userDetails");
//     if (userDetails) {
//       this.props.setLoggedIn(JSON.parse(userDetails));
//       this.props.history.push("/dashboard");
//     }
//   }

//   async onSubmit() {
//     try {
//       this.loadingDialog.current.showDialog();
//       var result = await new AuthClient().login(this.email, this.password);

//       var userDetails = await executeGetUserDetailsLambda(this.email);
//       this.props.setLoggedIn(userDetails);

//       // Save user details in session storage
//       sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

//       this.loadingDialog.current.closeDialog();
//       this.props.history.push("/dashboard");
//       console.log("_login", result);
//     } catch (err) {
//       this.loadingDialog.current.closeDialog();
//       this.messageDialog.current.showDialog(err.title, err.message);
//       console.log("_login", err);
//     }
//   }

//   setEmail(email) {
//     this.email = email;
//   }

//   setPassword(password) {
//     this.password = password;
//   }

//   HeaderComponent = () => {
//     return (
//       <div className={"row"} style={{ marginTop: "40px" }}>
//         <div className={"col"}>
//           <div className={"row justify-content-center"}>
//             <img
//               src={logo}
//               alt=""
//               style={{
//                 marginTop: "20px",
//                 width: "180px",
//                 height: "30px",
//                 borderRadius: "5%",
//               }}
//             />
//           </div>

//           <div className={"row justify-content-center"}></div>
//         </div>
//       </div>
//     );
//   };

//   render() {
//     return (
//       <div
//         className="col-md-12"
//         style={{
//           backgroundImage: "url(" + bg + ")",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <MessageDialog ref={this.messageDialog} />
//         <LoadingDialog ref={this.loadingDialog} />
//         <div
//           className="app flex-row align-items-center"
//           style={{ transition: "opacity 2.5s", opacity: ".9" }}
//         >
//           <Container>
//             <Row className="justify-content-center">
//               <Col md="8">
//                 <CardGroup>
//                   <Card
//                     className="text-black py-5 d-md-down-none"
//                     style={{ width: "24%" }}
//                   >
//                     <CardBody className="text-center">
//                       <this.HeaderComponent />
//                     </CardBody>
//                   </Card>
//                   <Card className="p-4">
//                     <CardBody>
//                       <Form>
//                         <p className="text-muted">Sign In to your account</p>
//                         <InputGroup className="mb-3">
//                           <InputGroupText className="prepend">
//                             <InputGroupText>
//                               <i className="icon-user"></i>
//                             </InputGroupText>
//                           </InputGroupText>
//                           <Input
//                             type="text"
//                             placeholder="Username"
//                             onChange={(event) =>
//                               this.setEmail(event.target.value)
//                             }
//                           />
//                         </InputGroup>
//                         <InputGroup className="mb-4">
//                           <InputGroupText className="prepend">
//                             <InputGroupText>
//                               <i className="icon-lock"></i>
//                             </InputGroupText>
//                           </InputGroupText>
//                           <Input
//                             type="password"
//                             placeholder="Password"
//                             onChange={(event) =>
//                               this.setPassword(event.target.value)
//                             }
//                           />
//                         </InputGroup>
//                         <Row>
//                           <Col xs="6">
//                             <Button
//                               color="primary"
//                               className="px-4"
//                               onClick={this.onSubmit}
//                             >
//                               Login
//                             </Button>
//                           </Col>
//                         </Row>
//                       </Form>
//                     </CardBody>
//                   </Card>
//                 </CardGroup>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {};
// };

// const mapActionsToProps = { setLoggedIn: setLoggedIn };

// export default connect(mapStateToProps, mapActionsToProps)(login2);

