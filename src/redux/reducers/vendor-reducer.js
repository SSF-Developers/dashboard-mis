import {
    SET_TEAM_LIST,
    // ACTION_ADD_MEMBER,
    SET_VENDOR_LIST
} from "../actions/vendor-actions";

var defaultState = {
    vendorList: [],
    teamList: [],
    data: []
}

export default function vendorReducer(
    state = defaultState,
    { type, payload }
) {
    switch (type) {
        case SET_TEAM_LIST:
            return {
                ...state,
                teamList: payload.teamList
            };
        case SET_VENDOR_LIST:
            return {
                ...state,
                vendorList: payload.vendorList
            };
        // case ACTION_ADD_MEMBER:
        //     var mTeamList = state.teamList;
        //     mTeamList.push(payload.user)
        //     return {
        //         ...state,
        //         teamList: mTeamList
        //     };
        default:
            return state;
    }
}
