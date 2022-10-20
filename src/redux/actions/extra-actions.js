export const SET_COMPLEX_DATA = "extra:set:complexData"
export const SET_RESET_DATA = "extra:set:resetData"

export function setComplexData(data) {
    return {
        type: SET_COMPLEX_DATA,
        payload: { complexData: data }
    };
}
export function setResetData() {
    return {
        type: SET_RESET_DATA,
        payload: {}
    };
}