class ContactInfo
{
    constructor(email,phoneNumnber) {
        this.email = email;
        this.phoneNumnber = phoneNumnber;
    };

    static getInstance(){
        return new ContactInfo("","")
    }

    static getTestInstance(){
        return new ContactInfo("test@sukriti.ngo","981XXXXX89")
    }   
}   

export default ContactInfo