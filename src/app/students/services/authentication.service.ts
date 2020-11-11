import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, AuthRecord } from '../../models/user.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private authUrl : string = "http://php.hahlabs.com/academy/api/";

    constructor(private httpClient: HttpClient,
                private userJWT : UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(userJWT.loggedUser));
        this.currentUser = this.currentUserSubject.asObservable();
    }



    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    

    login(user : User) {
        //const userObservable:Observable<User> =
        //const response = 
        return this.httpClient.post<AuthRecord>(this.authUrl + 'users/login', user, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        }).pipe(map(authRecord => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // could use window.sessionStorage. for session timed storage
            this.userJWT.loggedUser = JSON.stringify(authRecord.data);
            this.currentUserSubject.next(user);
            return user;
           }));
     //     .subscribe((authRecord: AuthRecord) => {
     //       console.log("Logged in success : " + JSON.stringify(authRecord.data));
     //       this.user = authRecord.data;
     //       localStorage.setItem('access_token', authRecord.data.api_token);
     //     }, (err: any) => { console.log("Error Logging in:" + err); });
    
      }

      logout() {
        // remove user from local storage and set current user to null
        this.httpClient.post(`$this.authUrl/users/logout`,[]);
        this.userJWT.clearLoggedUser();
        this.currentUserSubject.next(null);
    }
      
    
    
}