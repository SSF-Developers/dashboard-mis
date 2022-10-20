import Client from "../../Entity/User/Client"
import User from "../../Entity/User/User"
import {
  SET_CLIENT_LIST,
  SET_TEAM_LIST,
  ACTION_ADD_MEMBER,
  SET_UI_LIST,
  SET_UI_RESET
} from "../actions/administration-actions";

var defaultState = {
  clientList: [],
  teamList: [],
  data: []
}

//  var defaultState = { 
//   clientList: [new Client("A","Organisation Name A"),new Client("B","Organisation Name B"),new Client("C","Organisation Name C")],
//   teamList: [new User.getTestTeamUser("dev_000000"),new User.getTestTeamUser("dev_100000"),new User.getTestTeamUser("dev_200000"),
//   new User.getTestTeamUser("dev_200000"),new User.getTestTeamUser("dev_200000"),new User.getTestTeamUser("dev_200000"),
//   new User.getTestTeamUser("dev_200000")]
//  }

export default function administrationReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case SET_TEAM_LIST:
      return {
        ...state,
        teamList: payload.teamList
      };
    case SET_CLIENT_LIST:
      return {
        ...state,
        clientList: payload.clientList
      };
    case SET_UI_LIST:
      return {
        ...state,
        data: payload.data
      };
    case SET_UI_RESET:
      return {
        ...state,
        data: []
      };
    case ACTION_ADD_MEMBER:
      var mTeamList = state.teamList;
      mTeamList.push(payload.user)
      return {
        ...state,
        teamList: mTeamList
      };
    default:
      return state;
  }
}
