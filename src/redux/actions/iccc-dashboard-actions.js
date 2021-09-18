export const SAVE_PAYLOAD = "iccc:save-payload";

export function savePayload(payload, topic) {
  var index = 0;
  if (payload.COMPLEX === undefined) {
    console.log("payload-topic", topic.split("/"));
    payload.COMPLEX = topic.split("/")[5];
  }

  console.log("payload", payload.COMPLEX);

  switch (payload.COMPLEX) {
    case "AIRTEL_CITYCENTRE":
      index = 0;
      break;
    case "KRH_GSCDL":
      index = 1;
      break;
    case "GSCDCL_H_COURT":
      index = 2;
      break;
    case "COLLECTORATE_GSCDCL":
      index = 3;
      break;
    case "KRG_GSCDCL":
      index = 4;
      break;
    case "DD_NAGAR_GSCDCL":
      index = 5;
      break;
    case "CIRCUIT_HOUSE_GSCDCL":
      index = 6;
      break;
    default:
      index = 0;
  }
  console.log("payload", index);
  return {
    type: SAVE_PAYLOAD,
    payload: { data: payload, index: index },
  };
}
