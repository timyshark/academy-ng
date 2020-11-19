export class User {
    id : string;
    name : string;
    email : string;
    password: string;
    password_confirmation: string;
    updated_at: string;
    created_at: string;
    
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
export class RegisterRecord {
    user: User;
    message: string;
}