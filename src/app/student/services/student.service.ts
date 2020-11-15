import { Injectable } from '@angular/core';
import { Student } from '../../models/student.model';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { UserService } from '../../user/services/user.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class StudentService {
  constructor(private _httpClient : HttpClient, 
              private userJWT: UserService ){}
  
    private studentsList : Student[];

    // All the asynch results, captured by the interceptor student-error-interceptor-service
      getStudentsList(): Observable<Student[]> {
        return of([]);
  //      const stdObservable:Observable<Student[]> =
    //        return   this._httpClient.get<Student[]>(`${environment.apiUrl}/students`);
             // { headers : this.makeHeaders()});
       // stdObservable.subscribe();
       // (response => {
       //    this.studentsList = response.map
       //    (item => { return item; });
       //   }
       // );
      //  return stdObservable;
      }
      registerStudent(newStudent: Student): Observable<Student>{
          // find the maximum sId in the array
          const maxId = this.studentsList.reduce(function(s1,s2){
            return (s1.sId > s2.sId) ? s1:s2;
          }).sId +1;
          newStudent.sId = null;
          return this._httpClient.post<Student>(`${environment.apiUrl}/students`, newStudent);
          
      }
      updateStudent(updatedStudent: Student): Observable<Student> {
          // find the maximum sId in the array          
          return this._httpClient.put<Student>(`${environment.apiUrl}/students/${updatedStudent.sId}` , updatedStudent);              
 
      }
      getStudentById(sId : number) : Observable<Student>{    
        return this._httpClient.get<Student>(`${environment.apiUrl}/students/${sId}`);
      };
     



      deleteStudentById(sId : number): Observable<void>{
        return this._httpClient.delete<void>(`${environment.apiUrl}/students/${sId}`);
      };

 
}