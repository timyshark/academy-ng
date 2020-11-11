import { Injectable } from '@angular/core';
import { Student } from '../../models/student.model';
import { Observable , of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from './user.service';


@Injectable()
export class StudentService {
  constructor(private _httpClient : HttpClient, 
              private userJWT: UserService ){}
  
    private studentsList : Student[];
    private baseUrl_mysql : string = "http://php.hahlabs.com/academy/api"
    private baseUrl = this.baseUrl_mysql;
    
    // All the asynch results, captured by the interceptor student-error-interceptor-service
      getStudentsList(): Observable<Student[]> {
        console.log("List Students:Trying to login with token:" + "Bearer " + this.userJWT.api_token);
        const stdObservable:Observable<Student[]> =
              this._httpClient.get<Student[]>(`${this.baseUrl}/students`,
              { headers : this.makeHeaders()});
        stdObservable.subscribe();
       // (response => {
       //    this.studentsList = response.map
       //    (item => { return item; });
       //   }
       // );
        return stdObservable;
      }
      registerStudent(newStudent: Student): Observable<Student>{
          // find the maximum sId in the array
          const maxId = this.studentsList.reduce(function(s1,s2){
            return (s1.sId > s2.sId) ? s1:s2;
          }).sId +1;
          newStudent.sId = null;
          return this._httpClient.post<Student>(`${this.baseUrl}/students`, newStudent, 
          { headers : this.makeHeaders()});
          
      }
      updateStudent(updatedStudent: Student): Observable<Student> {
          // find the maximum sId in the array          
          return this._httpClient.put<Student>(`${this.baseUrl}/students/${updatedStudent.sId}` , updatedStudent,              
                                            { headers : this.makeHeaders()});
 
      }
      getStudentById(sId : number) : Observable<Student>{    
        return this._httpClient.get<Student>(`${this.baseUrl}/students/${sId}`, 
        { headers : this.makeHeaders()});
      };
     



      deleteStudentById(sId : number): Observable<void>{
        return this._httpClient.delete<void>(`${this.baseUrl}/students/${sId}`,
        {headers : this.makeHeaders()});
      };

      makeHeaders(){
        return new HttpHeaders({
          'Content-Type':   'application/json',
          'Accept'      :   'application/json',
          'Authorization'      :   "Bearer " + this.userJWT.api_token,
        })
      }
 
}