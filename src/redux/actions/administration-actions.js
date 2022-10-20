import $ from "jquery";
export const SET_TEAM_LIST = "admin:set:teamList";
export const SET_CLIENT_LIST = "admin:set:clientList";
export const SET_UI_LIST = "admin:set:uiList";
export const SET_UI_RESET = "admin:set:uiReset";
export const ACTION_ADD_MEMBER = "admin:action:addMember";

export function setTeamList(teamList) {
  return {
    type: SET_TEAM_LIST,
    payload: { teamList: teamList }
  };
}

export function setUiList(data) {
  return {
    type: SET_UI_LIST,
    payload: { data: data }
  };
}

export function setUiReset() {
  return {
    type: SET_UI_RESET,
    payload: {}
  };
}

export function setClientList(clientList) {
  return {
    type: SET_CLIENT_LIST,
    payload: { clientList: clientList }
  };
}

export function addTeamMember(userDetails) {
  return {
    type: ACTION_ADD_MEMBER,
    payload: { user: userDetails }
  };
}