export const PUSH_COMPLEX_COMPOSITION = "complex:push:complexComposition";
export const REMOVE_COMPLEX_COMPOSITION = "complex:remove:complexComposition";
export const UPDATE_SELECTED_COMPLEX = "complex:update:selectedComplex";
export const UPDATE_SELECTED_CABIN = "complex:update:selectedCabin";

export function pushComplexComposition(hierarchy, complexDetails, complexComposition) {
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

export function updateSelectedComplex(complex,hierarchy) {
  return {
    type: UPDATE_SELECTED_COMPLEX,
    payload: { complex: complex,hierarchy :hierarchy }
  };
}

export function updateSelectedCabin(cabin) {
  return {
    type: UPDATE_SELECTED_CABIN,
    payload: { cabin: cabin}
  };
}