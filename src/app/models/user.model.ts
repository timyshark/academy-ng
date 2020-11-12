export class User {
    id : number;
    name : string;
    email : string;
    password: string;
    api_token: string;
    constructor (email : string, pass: string){
        this.email = email;
        this.password = pass;
    }
}

export class AuthRecord {
    token : string ;
    token_type: string;
    expires_in: string;
}