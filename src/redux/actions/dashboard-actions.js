import $ from "jquery";
export const SET_DASHBOARD_DATA = "dashboard:set:dashboardData"
export const SET_DASHBOARD_CONFIG = "dashboard:set:dashboardConfig"

export function setDashboardData(data) {
  return {
    type: SET_DASHBOARD_DATA,
    payload: { dashboardData: data }
  };
}

export function setConfigData(data) {
  return {
    type: SET_DASHBOARD_CONFIG,
    payload: { dashboardConfig: data }
  };
}