export const SET_TICKET_LIST = "ticket:set:ticketList";
export const PUSH_INCIDENCE_COMPLEX_COMPOSITION = "complexincidence:push:complexComposition";
export const REMOVE_INCIDENCE_COMPLEX_COMPOSITION = "complexincidence:remove:complexComposition";
export const UPDATE_INCIDENCE_SELECTED_COMPLEX = "complexincidence:update:selectedComplex";
export const UPDATE_INCIDENCE_SELECTED_CABIN = "complexincidence:update:selectedCabin";

export function setTicketList(ticketList) {
  return {
    type: SET_TICKET_LIST,
    payload: { ticketList: ticketList },
  };
}

export function pushComplexIncidenceComposition(hierarchy, complexDetails, complexComposition) {
  return {
    type: PUSH_INCIDENCE_COMPLEX_COMPOSITION,
    payload: { key: complexDetails.name, hierarchy: hierarchy, complexDetails: complexDetails, complexComposition: complexComposition }
  };
}

export function removeComplexIncidenceComposition(complexName) {
  return {
    type: REMOVE_INCIDENCE_COMPLEX_COMPOSITION,
    payload: { key: complexName }
  };
}

export function updateSelectedIncidenceComplex(complex, hierarchy) {
  return {
    type: UPDATE_INCIDENCE_SELECTED_COMPLEX,
    payload: { complex: complex, hierarchy: hierarchy }
  };
}

export function updateIncidenceSelectedCabin(cabin) {
  return {
    type: UPDATE_INCIDENCE_SELECTED_CABIN,
    payload: { cabin: cabin }
  };
}