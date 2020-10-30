import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {

  private authUrl : string = "http://php.hahlabs.com/academy/api/";
  


 constructor(private httpClient: HttpClient) { }

  public get api_token() : string {
    if (this.loggedUser == null) {
      //Should be re-routed to login page
      //const rt  = this.login('admin@academy.com', bcrypt.hash('academy'));
      return null;
    }
    const user = JSON.parse(this.loggedUser);
    return user.api_token;
  }


  getAll() {
    return this.httpClient.get<User[]>(this.authUrl + 'users');
  }


register(user : User) {
   let uname = user.name;
   let upass = user.password;
  return this.httpClient.post<{access_token: string}>(this.authUrl + 'register', 
        {uname, upass},{
                headers : new HttpHeaders({
                  'Content-Type':  'application/json',
                  'Accept'      :  'application/json'                     
                })
              })
                .pipe(tap(api_token => {
                  user.api_token = api_token.access_token;
                  console.log(user);
                }
          ))
}
delete(id: number) {
    return this.httpClient.delete(`$this.authUrl/users/${id}`);
}

public get loggedUser() : string{
  return window.sessionStorage.getItem("loggedUser");
}
public set loggedUser(loggedUser : string) {
   window.sessionStorage.setItem("loggedUser", loggedUser);
}
public clearLoggedUser(){
  window.sessionStorage.removeItem("loggedUser");
}
}