import {
  PUSH_COMPLEX_COMPOSITION,
  REMOVE_COMPLEX_COMPOSITION,
  UPDATE_SELECTED_COMPLEX,
  UPDATE_SELECTED_CABIN
} from "../actions/complex-actions";

var defaultState = {
  
}

export default function complexReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case PUSH_COMPLEX_COMPOSITION:
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

    case REMOVE_COMPLEX_COMPOSITION:
      delete state[payload.key];
      return state;

    case UPDATE_SELECTED_COMPLEX:
      return {
        ...state,
        complex: payload.complex,
        hierarchy: payload.hierarchy
      };

    case UPDATE_SELECTED_CABIN:
      return {
        ...state,
        cabin: payload.cabin
      };

    default:
      return state;
  }
}
