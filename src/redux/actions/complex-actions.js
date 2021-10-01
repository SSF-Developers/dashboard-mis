export const PUSH_COMPLEX_COMPOSITION = "complex:push:complexComposition";
export const REMOVE_COMPLEX_COMPOSITION = "complex:remove:complexComposition";

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