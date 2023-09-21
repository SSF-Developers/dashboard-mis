export const PUSH_COMPLEX_COMPOSITION = "complex:push:complexComposition";
export const REMOVE_COMPLEX_COMPOSITION = "complex:remove:complexComposition";
export const UPDATE_SELECTED_COMPLEX = "complex:update:selectedComplex";
export const UPDATE_SELECTED_CABIN = "complex:update:selectedCabin";
export const SAVE_PAYLOAD = "complex:save:savePayload";
export const UPDATED_SAVE_PAYLOAD = "complex:save:updatedSavePayload";


export function pushComplexComposition(hierarchy, complexDetails, complexComposition) {
  console.log("_complexDetails", complexDetails);
  return {
    type: PUSH_COMPLEX_COMPOSITION,
    payload: { key: complexDetails.name, hierarchy: hierarchy, complexDetails: complexDetails, complexComposition: complexComposition }
  };
}

export function removeComplexComposition(complexName) {
  return {
    type: REMOVE_COMPLEX_COMPOSITION,
    payload: { key: complexName }
  };
}

export function updateSelectedComplex(complex, hierarchy) {
  return {
    type: UPDATE_SELECTED_COMPLEX,
    payload: { complex: complex, hierarchy: hierarchy }
  };
}

export function updateSelectedCabin(cabin) {
  return {
    type: UPDATE_SELECTED_CABIN,
    payload: { cabin: cabin }
  };
}

export function savePayload(cabinPayload) {
  return {
    type: SAVE_PAYLOAD,
    payload: { cabinPayload: cabinPayload }
  };
}

export function updatedSavePayload(updatedCabinPayload) {
  return {
    type: UPDATED_SAVE_PAYLOAD,
    payload: { updatedCabinPayload: updatedCabinPayload }
  };
}