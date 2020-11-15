import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthRecord, RegisterRecord, User } from '../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
   constructor(private httpClient: HttpClient) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(this.loggedUser));
    this.user = this.userSubject.asObservable();

  }
 
  public get userValue(): User {
    return this.userSubject.value;
}

  register(registerUser : User) {
    registerUser.password_confirmation = registerUser.password;
    console.log("Trying to register: " + JSON.stringify(registerUser));
   return this.httpClient.post<RegisterRecord>(
    `${environment.apiUrl}/register`, 
                  registerUser,{
                           headers:new HttpHeaders ({
                                'Content-Type':  'application/json',
                                'Accept'      :  'application/json'                     
                            })
                  }
            )
                .pipe(tap(regRecord => {
                   console.log("User: " + regRecord.user + ";" + regRecord.message);
                }
          ))
  }
  
  login(user : User) {
    return this.httpClient.post<AuthRecord>(`${environment.apiUrl}/login`, user, 
         {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
         })
           .pipe(map(authRecord => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // could use window.sessionStorage. for session timed storage
              this.loggedUser = JSON.stringify(authRecord);
              console.log("Token returned:" + authRecord.token);
              this.userSubject.next(user);
              return user;
            }));

    //For troubleshooting
    //  .subscribe(
    //     (authRecord: AuthRecord) => { //<- on normal subscriber receive, we will receive this(authRecord) of type AuthRecord
    //                console.log("Logged in success : " + JSON.stringify(authRecord));  //we Execute this
    //    localStorage.setItem('access_token', authRecord.token);
    //  }, 
    //  (err: any) => { console.log("Error Logging in:" + err); }, //<-- in case of error raised, execute this
    //  ()=> {console.log("user login POST completed");});  //<-- on completion, you will receive nothing, and execute this

  }

  logout() {
    // remove user from local storage and set current user to null
    this.httpClient.post(`${environment.apiUrl}/logout`,[]);
    this.clearLoggedUser();
    this.userSubject.next(null);
}
getAll() {
  return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
}

getById(id: string) {
  return this.httpClient.get<User>(`${environment.apiUrl}/users/${id}`);
}

update(id, params) {
  return this.httpClient.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));
}

delete(id: string) {
  return this.httpClient.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
          if (id == this.userValue.id) {
              this.logout();
          }
          return x;
      }));
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