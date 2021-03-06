import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(request)
        .pipe(catchError((err : HttpErrorResponse) => {
            let errorMsg:string = "";
            if ([401,403].includes(err.status)) {
                // auto logout if 401 response returned from api
                this.userService.logout();
            } else {
                errorMsg = "Intercept server side :";
            }
            errorMsg = errorMsg + '(' + err.status  + ") " + err.statusText + " - error:" + JSON.stringify(err.error) ;
    //      return throwError(new ResolvedStudentList(null,error.error));
            return throwError(errorMsg);
        }))


    }
}