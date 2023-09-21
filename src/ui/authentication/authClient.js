
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { authConfigMis, cognitoUserPool } from "../../nomenclature/awsConfig";
import AWS from "aws-sdk";
import auth from "./auth";
import Result from "../../Entity/User/Result";
import AWSMqttClient from "aws-mqtt";


class AuthClient {


    constructor() {

    };

    login(email, password) {
        return new Promise(function (resolve, reject) {

            const user = new CognitoUser({
                Username: email,
                Pool: cognitoUserPool,
            });

            const authDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    auth.login();

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: authConfigMis.IdentityPoolId,
                        // RoleArn: authConfigMis.RoleArn,
                        Logins: {
                            [authConfigMis.IdentityProviderName]:
                                data.idToken.jwtToken,
                        },
                    });

                    AWS.config.region = authConfigMis.Region;
                    AWS.config.credentials.refresh((error) => {
                        if (error) {
                            console.error("_authentication", error);
                            reject(new Result(-1, undefined, "Authentication error", error.message));
                        }
                    });

                    AWS.config.credentials.get(function () {
                        var accessKeyId = AWS.config.credentials.accessKeyId;
                        var secretAccessKey = AWS.config.credentials.secretAccessKey;
                        var sessionToken = AWS.config.credentials.sessionToken;

                        AWS.config.update({
                            accessKeyId: accessKeyId,
                            secretAccessKey: secretAccessKey,
                            sessionToken: sessionToken,
                            // endpoint: "a372gqxqbver9r-ats.iot.ap-south-1.amazonaws.com",
                        });

                        resolve(new Result(1, undefined));
                    });
                },

                onFailure: (err) => {
                    console.error("onFailure:", err);
                    reject(new Result(-1, undefined, "Login Error", err.message));
                },

                newPasswordRequired: (data) => {
                    reject(new Result(-1, undefined, "Authentication Failed", "Account not activted. Please contact admin."));
                }
            });
        });

    }

}

export default AuthClient