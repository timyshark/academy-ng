import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { AuthRecord } from '../_models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let loggedUser : AuthRecord= JSON.parse(this.userService.loggedUser);
 
        if (loggedUser && loggedUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `bearer ${loggedUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}