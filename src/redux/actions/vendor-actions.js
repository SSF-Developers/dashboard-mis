export const SET_TEAM_LIST = "vendor:set:teamList";
export const SET_VENDOR_LIST = "vendor:set:vendorList";

export function setTeamList(teamList) {
    return {
        type: SET_TEAM_LIST,
        payload: { teamList: teamList }
    };
}

export function setVendorList(vendorList) {
    return {
        type: SET_VENDOR_LIST,
        payload: { vendorList: vendorList }
    };
}
