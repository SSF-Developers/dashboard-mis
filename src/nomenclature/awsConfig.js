import { CognitoUserPool } from "amazon-cognito-identity-js";

//ap-south-1_27sC0r4IV => MIS


export const authConfigMis = {
  Region: "ap-south-1",
  UserPoolId: "ap-south-1_27sC0r4IV",
  IdentityPoolId: "ap-south-1:ffdd35f3-1674-43da-bdb5-c53fc669e0ec",
  ClientId: "1df59nq8umliiq5jkacputd75f",
  IdentityProviderName: "cognito-idp.ap-south-1.amazonaws.com/ap-south-1_27sC0r4IV",
  RoleArn: "arn:aws:iam::142770131582:role/MIS_SUPER_ADMIN"
};

// export const authConfigMis = {
//   Region: "ap-south-1",
//   UserPoolId: "ap-south-1_iUKSq1xcl",
//   IdentityPoolId: "ap-south-1:4a4111e5-04e3-4840-87f9-4b87cdb183f7",
//   ClientId: "htqnps40fjkda3viunkbbnkph",
//   IdentityProviderName: "cognito-idp.ap-south-1.amazonaws.com/ap-south-1_iUKSq1xcl",
//   RoleArn: "arn:aws:iam::142770131582:role/Cognito_SUKRITI_IOT_ADMIN_IDENTITYAuth_Role"
// };

export const cognitoUserPool =  new CognitoUserPool({
  UserPoolId: authConfigMis.UserPoolId,
  ClientId: authConfigMis.ClientId,
});