import $ from "jquery";
export const SET_DASHBOARD_DATA = "dashboard:set:dashboardData"

export function setDashboardData(data) {
  return {
    type: SET_DASHBOARD_DATA,
    payload: { dashboardData: data }
  };
}