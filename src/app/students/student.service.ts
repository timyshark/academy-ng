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


      getStudentsList(): Observable<Student[]> {
        const stdObservable:Observable<Student[]> =this._httpClient.get<Student[]>('http://localhost:3000/students');
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
  ------------------------------------------------------------------------------------------------          tap(() => console.log("HTTP request executed")),
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
         errMsg = `Client side error: ${err.error.message}`;
        } else { //Server Error
           // server-side error
           errMsg = `\nServer side error: ${err.status}\nMessage: ${err.message}\nStatus Text: ${err.statusText}\nName:${err.name}`;
        }
        console.log(err);
        return throwError(errMsg);

      }
      registerStudent(newStudent: Student): Observable<Student>{
        if (newStudent.sId === null){
          // find the maximum sId in the array
          // const maxId = this.studentsList.reduce(function(s1,s2){
          //   return (s1.sId > s2.sId) ? s1:s2;
          // }).sId +1;
          // newStudent.sId = maxId;
          return this._httpClient.post<Student>('http://localhost:3000/students', newStudent, {
            headers: new HttpHeaders({
               'Content-Type' : 'application/json'
            })
          });
        } else {
          const stdIndex = this.studentsList.findIndex(
            s => s.sId === newStudent.sId);
          this.studentsList[stdIndex] = newStudent;
        }
      }
      getStudentById(sId : number) : Student{
        // find Student who sId equivalent(type and value) to sId
        console.log("Students in the list: " + this.studentsList.length);
        const std = this.studentsList.find(s => s.sId === sId);
        console.log(JSON.stringify(std));
        return std;

      }
      deleteStudentById(sId : number){
        const sIdNDX =this.studentsList.findIndex( s => s.sId === sId);
        if (sIdNDX !== -1){
          this.studentsList.splice(sIdNDX,1);
        }
      }
}