import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, RegisterRecord, AuthRecord } from '../_models/user.model';


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
   return this.httpClient.post<RegisterRecord>(
    `${environment.apiUrl}/auth/register`, 
                  registerUser,{
                           headers:new HttpHeaders ({
                                'Content-Type':  'application/json',
                                'Accept'      :  'application/json'                     
                            })
                  }
            )
                .pipe(tap(regRecord => {
                }
          ))
  }

  isEmailTaken(email: string): Observable<RegisterRecord> {
    let userValidate = new User();    userValidate.email = email;
    return this.httpClient.get<RegisterRecord>(`${environment.apiUrl}/users/query/email/${email}`);
  }
  
  login(user : User) {
    return this.httpClient.post<AuthRecord>(`${environment.apiUrl}/auth/login`, user, 
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
              this.userSubject.next(user);
              return user;
            }));


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
      .pipe(map(updateUser => {
          // update stored user if the logged in user updated their own record
          //if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));
               // publish updated user to subscribers
              this.userSubject.next(user);  //make it current user
          //}
          return updateUser;
      }));
}

delete(id: string) {
  return this.httpClient.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(user => {
          // auto logout if the logged in user deleted their own record
         // if (id == this.userValue.id) {
         //     this.logout();
         // }
          return user;
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