import AWS from "aws-sdk";
import Result from "../Entity/User/Result";

export function executeReadVendorLambda(userName) {
    return new Promise(function (resolve, reject) {
        var lambda = new AWS.Lambda({
            region: "ap-south-1",
            apiVersion: "2015-03-31",
        });
        var pullParams = {
            FunctionName: "mis_create_vendor",
            Payload:
                '{ "action": "actionGetVendor", "userName":"' + userName + '" }',
        };

        lambda.invoke(pullParams, function (err, data) {
            if (err) {
                console.log("_lambda", err);
                reject(err);
            } else {
                var pullResults = JSON.parse(data.Payload);
                console.log("_lambda", pullResults);
                if (pullResults.status != 1) reject(pullResults);
                else resolve(pullResults);
            }
        });
    });
}

export function executeCreateVendorLambda(vendorDetailsData) {
    return new Promise(function (resolve, reject) {
        var payload = { action: "actionCreateVendor", payload: vendorDetailsData }
        var lambda = new AWS.Lambda({
            region: "ap-south-1",
            apiVersion: "2015-03-31",
        });
        var pullParams = {
            FunctionName: "mis_create_vendor",
            Payload: JSON.stringify(payload)
        };

        lambda.invoke(pullParams, function (err, data) {
            if (err) {
                console.log("_lambda", err);
                reject(err);
            } else {
                var pullResults = JSON.parse(data.Payload);
                console.log("_lambda", pullResults);
                // if (pullResults.status != 1) reject(pullResults);
                resolve(pullResults);
            }
        });
    });
}

export function executeDeleteVendorLambda(vendorDetailsData) {
    return new Promise(function (resolve, reject) {
        var payload = { action: "actionDeleteVendor", payload: vendorDetailsData }
        var lambda = new AWS.Lambda({
            region: "ap-south-1",
            apiVersion: "2015-03-31",
        });
        var pullParams = {
            FunctionName: "mis_create_vendor",
            Payload: JSON.stringify(payload)
        };

        lambda.invoke(pullParams, function (err, data) {
            if (err) {
                console.log("_lambda", err);
                reject(err);
            } else {
                var pullResults = JSON.parse(data.Payload);
                console.log("_lambda", pullResults);
                if (pullResults.status != 1) reject(pullResults);
                else resolve(pullResults);
            }
        });
    });
}

export function executeUpdateVendorLambda(vendorDetailsData) {
    var payload = { action: "actionUpdateVendor", payload: vendorDetailsData }
    return new Promise(function (resolve, reject) {
        var lambda = new AWS.Lambda({
            region: "ap-south-1",
            apiVersion: "2015-03-31",
        });
        var pullParams = {
            FunctionName: "mis_create_vendor",
            Payload: JSON.stringify(payload)
        };

        lambda.invoke(pullParams, function (err, data) {
            if (err) {
                console.log("_lambda", err);
                reject(err);
            } else {
                var pullResults = JSON.parse(data.Payload);
                console.log("_lambda", pullResults);
                if (pullResults.status != 1) reject(pullResults);
                else resolve(pullResults);
            }
        });
    });
}


export function executelistVendorAdminsLambda() {
    return new Promise(function (resolve, reject) {
        var lambda = new AWS.Lambda({
            region: "ap-south-1",
            apiVersion: "2015-03-31",
        });
        var pullParams = {
            FunctionName: "mis_list_vendorAdmins",
        };

        lambda.invoke(pullParams, function (err, data) {
            if (err) {
                console.log("_lambda", err);
                reject(err);
            } else {
                var pullResults = JSON.parse(data.Payload);
                console.log("_lambda", pullResults);
                resolve(pullResults);
            }
        });
    });
}