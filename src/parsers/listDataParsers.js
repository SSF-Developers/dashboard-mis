
import { getRoleName } from "../ui/administration/utils/AdminUtils"

export function getTeamList(teamJsonData) {

}


export function fromUserList(userList) {
  var dataList = []
  var item = {}
  for (let mUser of userList) {    
    item = {

      "User Name": mUser.userName,
      "Role": mUser.userRole,
      //"Name": mUser.name, 
      //"Gender": mUser.gender,
      //"Client Name": mUser.client.name,
      "Organisation": mUser.organisation,
      //"Email": mUser.contactInfo.email,
      //"Phone Number": mUser.contactInfo.phoneNumber,
      "Created": mUser.createdOn,
      "Status": mUser.userStatus,
    };
    dataList.push(item);
  }

  console.log("_fromUserList",dataList)
  return dataList;
}

export function fromUserDetails(mUser) {
  console.log("_fromUserDetails",mUser)
  var item = {}
  item = {
    "User Name": mUser.userName,
    "Role": mUser.userRole,
    "Gender": mUser.gender,
    "Client Name": mUser.clientName,
    "Organisation": mUser.organisation,
    "Email": mUser.email,
    "Phone Number": mUser.phoneNumber,
    "Access Defined By": mUser.assignedBy,
    "Access Defined Date": mUser.assignedOn,
    "Created": mUser.createdOn,
    "Status": mUser.userStatus
  };

  return item;
}