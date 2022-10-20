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

const administrationHome = React.lazy(() =>
  import("../../ui/administration/AdministrationHome")
);
const memberDetails = React.lazy(() =>
  import("../../ui/administration/MemberDetailsHome")
);
const addTeamMember = React.lazy(() =>
  import("../../ui/administration/AddTeamMember")
);
const grantPermissions = React.lazy(() =>
  import("../../ui/administration/GrantPermissions")
);
const defineMemberAccess = React.lazy(() =>
  import("../../ui/administration/DefineMemberAccess")
);

// VENDOR
const vendorHome = React.lazy(() =>
  import("../../ui/vendor/VendorHome")
);
const addVendorMember = React.lazy(() =>
  import("../../ui/vendor/AddVendorMember")
);
const vendorDetails = React.lazy(() =>
  import("../../ui/vendor/VendorDetailsHome")
);
const updateVendorMember = React.lazy(() =>
  import("../../ui/vendor/UpdateVendorMember")
);

const complexNavigation = React.lazy(() =>
  import("../../ui/complexes/ComplexNavigation")
);
const complexDetails = React.lazy(() =>
  import("../../ui/complexes/ComplexDetails")
);
const dashboard = React.lazy(() => import("../../ui/dashboard/Home"));
const reportsHome = React.lazy(() => import("../../ui/reports/ReportsHome"));
const incidenceTicket = React.lazy(() =>
  import("../../ui/incidence/IncidenceHome")
);
const createNewTicket = React.lazy(() =>
  import("../../ui/incidence/CreateNewTicket")
);
const incidenceTicketDetails = React.lazy(() =>
  import("../../ui/incidence/IncidenceTicketDetails")
);

const logout = React.lazy(() => import("../../ui/authentication/logout"));


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
        <AppBar style={{ width: "100%" }} history={this.props.history} />

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
                    path={"/administration/grantPermissions"}
                    exact={true}
                    name={"Grant Permissions"}
                    component={grantPermissions}
                  />
                  <Route
                    path={"/administration/defineAccess"}
                    exact={true}
                    name={"Define Access"}
                    component={defineMemberAccess}
                  />

                  {/* VENDOR */}

                  <Route
                    path={"/vendor"}
                    exact={true}
                    name={"Vendor"}
                    component={vendorHome}
                  />
                  <Route
                    path={"/vendor/addVendorMember"}
                    exact={true}
                    name={"Add Vendor Member"}
                    component={addVendorMember}
                  />
                  <Route
                    path={"/vendor/vendorDetails"}
                    exact={true}
                    name={"Vendor Details"}
                    component={vendorDetails}
                  />
                  <Route
                    path={"/vendor/updateVendor"}
                    exact={true}
                    name={"Update Vendor Member"}
                    component={updateVendorMember}
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
                    path={"/authentication/logout"}
                    exact={true}
                    name={"Logout"}
                    component={logout}
                  />
                  <Route
                    path={"/dashboard"}
                    exact={true}
                    name={"Dashboard"}
                    component={dashboard}
                  />
                  <Route
                    path={"/reports"}
                    exact={true}
                    name={"Reports"}
                    component={reportsHome}
                  />
                  <Route
                    path={"/incidence/tickets"}
                    exact={true}
                    name={"Incidence"}
                    component={incidenceTicket}
                  />
                  <Route
                    path={"/Incidence/TicketDetails/:id"}
                    exact={true}
                    name={"Ticket Details"}
                    component={incidenceTicketDetails}
                  />
                  <Route
                    path={"/incidence/raiseNewTicket"}
                    exact={true}
                    name={"Icidence"}
                    component={createNewTicket}
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
