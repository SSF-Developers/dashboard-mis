export const PUSH_COMPONENT_PROPS = "history:push:componentProps";
export const REMOVE_COMPONENT_PROPS = "history:remove:componentProps";

export function pushComponentProps(key, componentProps) {
  return {
    type: PUSH_COMPONENT_PROPS,
    payload: { key: key, componentProps: componentProps }
  };
}

export function removeComponentProps(key) {
  return {
    type: REMOVE_COMPONENT_PROPS,
    payload: { key: key }
  };
}