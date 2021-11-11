import Client from "../../Entity/User/Client"
import User from "../../Entity/User/User"
import {
  SET_DASHBOARD_DATA
} from "../actions/dashboard-actions";

var defaultState = {
  hasData: false,
  data: {}
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
    default:
      return state;
  }
}
