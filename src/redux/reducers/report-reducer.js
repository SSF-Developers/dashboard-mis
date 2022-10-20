import Client from "../../Entity/User/Client"
import User from "../../Entity/User/User"
import {
    SET_REPORT_DATA,
    SET_REPORT_RESET
} from "../actions/report-actions";

var defaultState = {
    hasData: false,
    data: {}
}

export default function reportReducer(
    state = defaultState,
    { type, payload }
) {
    switch (type) {
        case SET_REPORT_DATA:
            return {
                ...state,
                hasData: true,
                data: payload.reportData
            };
        case SET_REPORT_RESET:
            return {
                ...state,
                hasData: false,
                data: {}
            };
        default:
            return state;
    }
}
