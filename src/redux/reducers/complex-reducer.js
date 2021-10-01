import {
  PUSH_COMPLEX_COMPOSITION,
  REMOVE_COMPLEX_COMPOSITION
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

    default:
      return state;
  }
}
