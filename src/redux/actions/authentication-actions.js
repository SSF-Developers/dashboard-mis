import $ from "jquery";
export const ACTION_LOGIN = "auth:action:login";
export const ACTION_LOGOUT = "auth:action:logout";
export const SET_OWN_ACCESS_TREE = "admin:set:ownAccessTree";

export function setLoggedIn(userDetails) {
  console.log("_redux",userDetails);
  return {
    type: ACTION_LOGIN,
    payload: { userDetails: userDetails }
  };
}

export function setLoggedOut() {
  return {
    type: ACTION_LOGOUT,
    payload: { }
  };
}

export function setOwnAccessTree(accessTree) {
  return {
    type: SET_OWN_ACCESS_TREE,
    payload: { accessTree: accessTree }
  };
}
