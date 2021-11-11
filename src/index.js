import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authenticationReducer from "./redux/reducers/authentication-reducer";
import administrationReducer from "./redux/reducers/administration-reducer";
import historyReducer from "./redux/reducers/history-reducer";
import complexReducer from "./redux/reducers/complex-reducer";
import dashboardReducer from "./redux/reducers/dashboard-reducer";
import iccc_dataReducer from "./redux/reducers/iccc-dashboard-reducer";

import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";
const loginComponent = React.lazy(() => import("./ui//authentication/login"));

const allStoreEnhancers = compose(applyMiddleware(thunk));

const allReducers = combineReducers({
  authentication: authenticationReducer,
  administration: administrationReducer,
  clientData: iccc_dataReducer,
  historyStore: historyReducer,
  complexStore: complexReducer,
  dashboard: dashboardReducer
});

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const store = createStore(allReducers, allStoreEnhancers);
ReactDOM.render(


  <Provider store={store}>
    <BrowserRouter>
      <React.Suspense fallback={loading()}>
        <Switch>

          <Route
            path={"/login"}
            exact={true}
            name={"Login"}
            component={loginComponent}
          />

          <Route
            path="/"
            name="Home"
            render={(props) => <DefaultLayout {...props} />}
          />

        </Switch>
      </React.Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.register();