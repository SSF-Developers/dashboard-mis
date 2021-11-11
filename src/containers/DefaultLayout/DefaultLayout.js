import React, { Component, Suspense } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import ProtectedRoute from "../../components/ProtectedRoute";
import { BrowserRouter } from "react-router-dom";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import AppBar from "../../components/AppBar";
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import { Route53Domains } from "aws-sdk";

const administrationHome = React.lazy(() => import("../../ui/administration/AdministrationHome"));
const memberDetails = React.lazy(() => import("../../ui/administration/MemberDetailsHome"));
const addTeamMember = React.lazy(() => import("../../ui/administration/AddTeamMember"));
const defineMemberAccess = React.lazy(() => import("../../ui/administration/DefineMemberAccess"));
const complexNavigation = React.lazy(() => import("../../ui/complexes/ComplexNavigation"));
const complexDetails = React.lazy(() => import("../../ui/complexes/ComplexDetails"));
const dashboard = React.lazy(() => import("../../ui/dashboard/Home"));

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="app">
        <AppBar style={{width:'100%'}} history={this.props.history}/>

        {/* <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader> */}

        <div className="app-body">
          {/* <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar> */}
 
          <main className="main">
          
            {/* <AppBreadcrumb appRoutes={routes} router={router} /> */}

            <Container fluid>
              <Suspense fallback={this.loading()}>
              <Switch>
                  {/* <Route
                    path={"/login"}
                    exact={true}
                    name={"Login"}
                    component={loginComponent}
                  /> */}
                  <Route
                    path={"/administration"}
                    exact={true}
                    name={"Administration"}
                    component={administrationHome}
                  />
                  <Route
                    path={"/administration/memberDetails"}
                    exact={true}
                    name={"Member Details"}
                    component={memberDetails}
                  />
                  <Route
                    path={"/administration/addTeamMember"}
                    exact={true}
                    name={"Add Team Member"}
                    component={addTeamMember}
                  />
                  <Route
                    path={"/administration/defineAccess"}
                    exact={true}
                    name={"Define Access"}
                    component={defineMemberAccess}
                  />
                  <Route
                    path={"/complex/complexTree"}
                    exact={true}
                    name={"Complex Tree"}
                    component={complexNavigation}
                  />
                  <Route
                    path={"/complex/details"}
                    exact={true}
                    name={"Complex Details"}
                    component={complexDetails}
                  />

                  <Route
                    path={"/dashboard"}
                    exact={true}
                    name={"Dashboard"}
                    component={dashboard}
                  />
                  {/* <ProtectedRoute
                    path={"/dashboard"}
                    exact={true}
                    name={"Dashboard"}
                    component={iccc_dash}
                  /> */}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>

          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>

        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
