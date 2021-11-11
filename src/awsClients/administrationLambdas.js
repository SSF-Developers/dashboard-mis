import AWS from "aws-sdk";
import Result from "../Entity/User/Result";

export function executelistTeamLambda(userName) {
  return new Promise(function(resolve, reject) {
    
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_listTeam',
        Payload:  '{ '+
        '"userName": "'+userName+'"' +
         '}'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults)
          resolve(pullResults)
        }
      });
  });
};

export function executelistClientsLambda() {
    return new Promise(function(resolve, reject) {
        var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
        var pullParams = {
          FunctionName: 'mis_administration_listClients',
        };
    
    
        lambda.invoke(pullParams, function (err, data) {
          if (err) {
            console.log("_lambda", err)
            reject(err);
          } else {
            var pullResults = JSON.parse(data.Payload);
            console.log("_lambda", pullResults)
            resolve(pullResults)
          } 
        });
    });
};

export function executeCreateUserLambda(createUserRequest,userDetails) {
  // {
  //   "userName": "test_user_lambda",
  //   "temporaryPassword": "Changeme11!",
  //   "organisation": "SSF",
  //   "userRole": "ClientSuperAdmin",
  //   "clientName": "X",
  //   "groupName": "CLIENT_ADMIN",
  //   "adminName": "test_user_Admin",
  //   "adminRole": "Super Admin",
  //   "assignedBy": "test_user_Admin"
  // }

  return new Promise(function(resolve, reject) {
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_create_user',
        Payload: '{ '+
          '"userName": "'+createUserRequest.userName+'",' +
          '"temporaryPassword": "'+createUserRequest.tempPassword+'",' +
          '"organisation": "'+createUserRequest.organisationName+'",' +
          '"userRole": "'+createUserRequest.userRole+'",' +
          '"clientName": "'+createUserRequest.clientName+'",' +
          //'"groupName": "'+createUserRequest.userName+'",' +
          '"adminName": "'+userDetails.userName+'",' +
          '"adminRole": "'+userDetails.userRole+'",' +
          '"assignedBy": "'+userDetails.userName+'"' +
           '}'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults)
          if(pullResults.status != 1)
            reject(new Result(-1,undefined,"Error Alert!",pullResults.message))

          resolve(pullResults)
        }
      });
  });
};


export function executeGetUserDetailsLambda(userName) {
  return new Promise(function(resolve, reject) {
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_actions',
        Payload: '{ "action": "actionGetUserDetails", "userName":"'+ userName+'" }'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults.user)
        }
      });
  });
};

export function executeEnableUserLambda(userName) {
  return new Promise(function(resolve, reject) {
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_actions',
        Payload: '{ "action": "actionEnableUser", "userName":"'+ userName+'" }'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults.user)
        }
      });
  });
};

export function executeDisableUserLambda(userName) {
  return new Promise(function(resolve, reject) {
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_actions',
        Payload: '{ "action": "actionDisableUser", "userName":"'+ userName+'" }'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults.user)
        }
      });
  });
};


export function executeDeleteUserLambda(userName) {
  return new Promise(function(resolve, reject) {
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_actions',
        Payload: '{ "action": "actionDeleteUser", "userName":"'+ userName+'" }'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults.user)
        }
      });
  });
};

export function executeFetchCompletedUserAccessTree(userName) {
  return new Promise(function(resolve, reject) {
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_getCompletedAccessTree',
        Payload: '{"userName":"'+ userName+'" }'
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults.accessTree)
        }
      });
  });
};

export function executeDefineUserAccessLambda(request) {
  return new Promise(function(resolve, reject) {
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_administration_defineAccess',
        Payload: JSON.stringify(request)
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults);
          if(pullResults.status != 1)
            reject(pullResults);
          else
            resolve(pullResults.accessTree)
        }
      });
  });
};

export function executeFetchDashboardLambda(userName, duration) {
  return new Promise(function(resolve, reject) {
      var request = {userName:userName, duration:duration}
      var lambda = new AWS.Lambda({ region: 'ap-south-1', apiVersion: '2015-03-31' });
      var pullParams = {
        FunctionName: 'mis_adminisatration_fetchDateWaiseUsageData',
        Payload: JSON.stringify(request)
      };
  
  
      lambda.invoke(pullParams, function (err, data) {
        if (err) {
          console.log("_lambda", err)
          reject(err);
        } else {
          var pullResults = JSON.parse(data.Payload);
          console.log("_lambda", pullResults)
          resolve(pullResults)
        }
      });
  });
};