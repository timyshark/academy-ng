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
import { ResolvedStudentList } from '../helpers/resolved-studentlist.model';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                //retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Interceptor client error: ${error.error.message}`;
                        if (error.status === 401) {
                            // auto logout if 401 response returned from api
                            this.authenticationService.logout();
                            //location.reload(true);
                        }
            
                    } else {
                        // server-side error
                        errorMessage = `Interceptor server error: ${error.status}\nMessage: ${error.message}`;
                    }
                    console.log(errorMessage);
                    return throwError(new ResolvedStudentList(null,error.error));
                })
            )
    }
}