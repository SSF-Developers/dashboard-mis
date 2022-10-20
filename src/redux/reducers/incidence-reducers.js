import { SET_TICKET_LIST, PUSH_INCIDENCE_COMPLEX_COMPOSITION, REMOVE_INCIDENCE_COMPLEX_COMPOSITION, UPDATE_INCIDENCE_SELECTED_COMPLEX, UPDATE_INCIDENCE_SELECTED_CABIN } from "../actions/incidence-actions";

var defaultState = {
  ticketList: {},
};

export default function IncidenceReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case PUSH_INCIDENCE_COMPLEX_COMPOSITION:
      var complexComposition = {
        complexDetails: payload.complexDetails,
        complexComposition: payload.complexComposition,
        hierarchy: payload.hierarchy
      };
      state[payload.key] = complexComposition
      return {
        ...state,
        [payload.key]: complexComposition
      }

    case REMOVE_INCIDENCE_COMPLEX_COMPOSITION:
      delete state[payload.key];
      return state;

    case UPDATE_INCIDENCE_SELECTED_COMPLEX:
      return {
        ...state,
        complex: payload.complex,
        hierarchy: payload.hierarchy
      };

    case UPDATE_INCIDENCE_SELECTED_CABIN:
      return {
        ...state,
        cabin: payload.cabin
      };
    case SET_TICKET_LIST:
      return {
        ...state,
        ticketList: payload.ticketList,
      };
    default:
      return state;
  }
}
