class Client
{
    constructor(name,organisation) {
        this.name = name;
        this.organisation = organisation;
    };

    static getInstance(){
        return new Client("","")
    }

    static getSSF(){     
        return new Client("SSF","Sukriti Social Foundation")
    }

}

export default Client