import {
  PUSH_COMPONENT_PROPS,
  REMOVE_COMPONENT_PROPS
} from "../actions/history-actions";

var defaultState = {
  
}

export default function historyReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case PUSH_COMPONENT_PROPS:
      state[payload.key] = payload.componentProps
      return state;

    case REMOVE_COMPONENT_PROPS:
      delete state[payload.key];
      return state;

    default:
      return state;
  }
}
