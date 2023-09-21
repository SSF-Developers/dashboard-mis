import Client from "../../Entity/User/Client"
import User from "../../Entity/User/User"
import {
  SET_DASHBOARD_DATA,
  SET_DASHBOARD_CONFIG,
  SET_DASHBOARD_LIVE,
} from "../actions/dashboard-actions";

var defaultState = {
  hasData: false,
  data: {},
  configData: {},
}

export default function dashboardReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        hasData: true,
        data: payload.dashboardData
      };
    case SET_DASHBOARD_CONFIG:
      return {
        ...state,
        hasData: true,
        configData: payload.dashboardConfig
      };
    case SET_DASHBOARD_LIVE:
      return {
        ...state,
        hasData: true,
        configData: payload.dashboardLive
      };
    default:
      return state;
  }
}
