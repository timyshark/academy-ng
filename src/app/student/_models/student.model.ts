export class Student {
    id : number;
    first_name : string;
    last_name : string;
    email? : string;
    gender: string;
    picturePath?: string;
    isActive: boolean;
    dob: string;
    school: string;
    password?: string;
    confirmPassword?:string; 

    updated_at?: string;
    created_at?: string;

}