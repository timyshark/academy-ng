import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable , of, throwError} from 'rxjs';
import { catchError ,retry, finalize, tap, map, shareReplay, retryWhen} from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class StudentService {
  constructor(private _httpClient : HttpClient){}
  
    private studentsList : Student[];
    private student : Student;
    private baseUrl : string  = 'http://localhost:3000/students';

      getStudentsList(): Observable<Student[]> {
        const stdObservable:Observable<Student[]> =this._httpClient.get<Student[]>(this.baseUrl);
        stdObservable.subscribe
        (response => 
          {
           this.studentsList = response.map
           (item => 
            {
              console.log("Creating Map");
             return item;
            
            }
           );
          }
        );

          console.log("Response result:" );
     
        console.log("Students List imported:" + this.studentsList);
/*
  Processing error 1, and re-error, process error 2 which fix the situation by 
   returning [] ==Empty Observable which continues the chain to completion success
  pipe (
    catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
  }),
  finalize(() => console.log("first finalize() block executed")),
  catchError(err => {
      console.log('caught rethrown error, providing fallback value');
      return of([]);
  }),
  finalize(() => console.log("second finalize() block executed"))
  )
  -----------------------------------------------------
  tap(() => console.log("HTTP request executed")),
          map(res => Object.values(res["payload"]) ),
          shareReplay(),
          retryWhen(errors => {
              return errors
                      .pipe(
                          tap(() => console.log('retrying...'))
                      );
          } )
  ------------------------------------------------------------------------------------------------
  using Retry

  */
 /*
        stdList.pipe(
           retry(1),catchError(this.handleErrors)

      ).subscribe(
          res => console.log("Success-Response : " +res), //Success
          err => console.log("HTTP Error- : " + err), //error
          () => console.log("Completed") //completed
        );
        */
          // console.log(stdList);
          return stdObservable;
      }
      
      handleErrors(err){
        let errMsg = '';
        if (err.error instanceof ErrorEvent){ //Client Error
         // client-side error
         errMsg = `ErrorHandle:Client side error: ${err.error.message}`;
        } else { //Server Error
           // server-side error
           errMsg = `\nErrorHandle:Server side error: ${err.status}\nMessage: ${err.message}\nStatus Text: ${err.statusText}\nName:${err.name}`;
        }
        console.log(err);
        return throwError(errMsg);

      }
      
      registerStudent(newStudent: Student): Observable<Student>{
          // find the maximum sId in the array
          const maxId = this.studentsList.reduce(function(s1,s2){
            return (s1.sId > s2.sId) ? s1:s2;
          }).sId +1;
          newStudent.sId = maxId;
          console.log("creating new Student! sId:" + newStudent.sId);
          return this._httpClient.post<Student>(this.baseUrl, newStudent, {
            headers: new HttpHeaders({
               'Content-Type' : 'application/json'
            })
          });

      }
      updateStudent(updatedStudent: Student): Observable<void> {
          // find the maximum sId in the array
          console.log("Updating Student! sId:" + updatedStudent.sId + " baseURL:" + this.baseUrl);
          
          return this._httpClient.put<void>(`${this.baseUrl}/${updatedStudent.sId}`, updatedStudent, {
            headers: new HttpHeaders({
               'Content-Type' : 'application/json'
            })
          });
      }
      getStudentById(sId : number) : Observable<Student>{    
        return this._httpClient.get<Student>(`${this.baseUrl}/${sId}`);;
      }
      deleteStudentById(sId : number): Observable<void>{
        return this._httpClient.delete<void>(`${this.baseUrl}/${sId}`);;
 
      }
}