import {
  ACTION_LOGIN,
  ACTION_LOGOUT,
  SET_OWN_ACCESS_TREE
} from "../actions/authentication-actions";
import User from "../../Entity/User/User"
// var defaultState = { 
//   login: false,
//   user: {}
//  }

var defaultState = {
  login: true,
  user: User.getTestUser()
}

export default function administrationReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case ACTION_LOGIN:
      return {
        ...state,
        authenticated: true,
        user: payload.userDetails
      };
    case ACTION_LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: User.getEmptyUser()
      };
    case SET_OWN_ACCESS_TREE:
      return {
        ...state,
        accessTree: payload.accessTree
      };
    default:
      return state;
  }
}
