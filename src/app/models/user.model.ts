export class User {
    id : number;
    name : string;
    email : string;
    password: string;
    api_token: string;
    constructor (uname : string, upass: string){
        this.email = uname;
        this.password = upass;
    }
}

export class AuthRecord {
    data: User;
}