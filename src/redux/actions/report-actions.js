export const SET_REPORT_DATA = "report:set:reportData"
export const SET_REPORT_RESET = "report:set:reset"

export function setReportData(data) {
    return {
        type: SET_REPORT_DATA,
        payload: { reportData: data }
    };
}

export function setReportReset() {
    return {
        type: SET_REPORT_RESET,
        payload: {}
    };
}