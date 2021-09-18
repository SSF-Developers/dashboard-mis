import {UserRoles} from "../../nomenclature/nomenclature";
import Client from "./Client"
import ContactInfo from "./ContactInfo"
class User
{
    constructor(userName,userRole, name, gender,created,status,client,contactInfo) {
        this.userName = userName;
        this.userRole = userRole;
        this.name = name;
        this.gender = gender;
        this.created = created;
        this.status = status;
        this.client = Client.getInstance()
        this.contactInfo = ContactInfo.getInstance()

        // if(client === undefined){
        //     this.client = Client.getInstance()
        // }else{
        //     this.client = clientInformation
        // }
        
        // if(contactInfo === undefined){
        //     this.contactInfo = ContactInfo.getInstance()
        // }else{
        //     this.contactInfo = contactInfo
        // }
        
    };
    

    static getEmptyUser(){
        return new User("",UserRoles.Undefined,"","","","")
    }

    static getTestUser(){
        return new User("developer",UserRoles.Developer,"","","","")
    }

    static getTestTeamUser(name){
        var user =  new User(name,UserRoles.VendorAdmin,"Test Name","Male","Wed, 04 Sep 2021","Confirmed");
        user.client = Client.getSSF();
        user.contactInfo = ContactInfo.getTestInstance();
        return user;
    }
}

export default User