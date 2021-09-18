import $ from "jquery";
export const SET_TEAM_LIST = "admin:set:teamList";
export const SET_CLIENT_LIST = "admin:set:clientList";
export const ACTION_ADD_MEMBER = "admin:action:addMember";

export function setTeamList(teamList) {
  return {
    type: SET_TEAM_LIST,
    payload: { teamList: teamList }
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