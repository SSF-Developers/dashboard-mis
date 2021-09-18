import { SAVE_PAYLOAD } from "../actions/iccc-dashboard-actions";

var complexes = [];
var complex = {};
var mwc = {};
var fwc = {};
var pwc = {};
var uri = {};
complex.isEmpty = true;
complex.water = "";
complex.mwc = mwc;
complex.fwc = fwc;
complex.pwc = pwc;
complex.uri = uri;
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);
complexes.push(complex);

export default function iccc_dataReducer(
  state = { status: 0, complexes: complexes },
  { type, payload }
) {
  switch (type) {
    case SAVE_PAYLOAD:
      if (payload.data.THING_NAME.includes("MWC")) {
        return Object.assign({}, state, {
          complexes: state.complexes
            .slice(0, payload.index)
            .concat([
              {
                ...state.complexes[payload.index],
                isEmpty: false,
                mwc: payload,
                water: payload.data.Freshwaterlevel,
              },
            ])
            .concat(state.complexes.slice(payload.index + 1)),
        });
      } else if (payload.data.THING_NAME.includes("FWC")) {
        return Object.assign({}, state, {
          complexes: state.complexes
            .slice(0, payload.index)
            .concat([
              {
                ...state.complexes[payload.index],
                isEmpty: false,
                fwc: payload,
                water: payload.data.Freshwaterlevel,
              },
            ])
            .concat(state.complexes.slice(payload.index + 1)),
        });
      } else if (payload.data.THING_NAME.includes("PWC")) {
        return Object.assign({}, state, {
          complexes: state.complexes
            .slice(0, payload.index)
            .concat([
              {
                ...state.complexes[payload.index],
                isEmpty: false,
                pwc: payload,
                water: payload.data.Freshwaterlevel,
              },
            ])
            .concat(state.complexes.slice(payload.index + 1)),
        });
      } else if (payload.data.THING_NAME.includes("MUR")) {
        return Object.assign({}, state, {
          complexes: state.complexes
            .slice(0, payload.index)
            .concat([
              {
                ...state.complexes[payload.index],
                isEmpty: false,
                uri: payload,
              },
            ])
            .concat(state.complexes.slice(payload.index + 1)),
        });
      } else {
      }

    default:
      return state;
  }
}
