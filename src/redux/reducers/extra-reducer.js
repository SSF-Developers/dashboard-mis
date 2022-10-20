import Client from "../../Entity/User/Client"
import User from "../../Entity/User/User"
import {
    SET_COMPLEX_DATA,
    SET_RESET_DATA
} from "../actions/extra-actions";

var defaultState = {
    hasData: false,
    data: []
}

export default function extraReducer(
    state = defaultState,
    { type, payload }
) {
    switch (type) {
        case SET_COMPLEX_DATA:
            return {
                ...state,
                hasData: true,
                data: [...state.data, payload.complexData]
            };
        case SET_RESET_DATA:
            return {
                ...state,
                hasData: false,
                data: []
            };
        default:
            return state;
    }
}
