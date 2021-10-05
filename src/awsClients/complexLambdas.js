import AWS from "aws-sdk";
import Result from "../Entity/User/Result";

export function executeGetComplexCompositionLambda(complexName) {
  return new Promise(function(resolve, reject) {
    
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_getComplexComposition',
        Payload:  '{ '+
        '"complexName": "'+complexName+'"' +
         '}'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          //console.log("_lambda", JSON.parse(data.Payload))
          var pullResults = JSON.parse(data.Payload);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults.complexComposition)
        }
      });
  });
};

export function executeGetCabinDetailsLambda(cabinThingName) {
  return new Promise(function(resolve, reject) {
    
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_getCabinDetails',
        Payload:  '{ '+
        '"cabinThingName": "'+cabinThingName+'"' +
         '}'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          //console.log("_lambda", JSON.parse(data.Payload))
          var pullResults = JSON.parse(data.Payload);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults)
        }
      });
  });
};