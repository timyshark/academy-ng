import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResolvedStudentList } from './resolved-studentlist.model';

export class ErrorIntercept implements HttpInterceptor {
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
                        errorMessage = `Interceptor client rror: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Interceptor server error Status: ${error.status}\nMessage: ${error.message}`;
                    }
                    console.log(errorMessage);
                    return throwError(new ResolvedStudentList(null,errorMessage));
                })
            )
    }
}