import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/user/_services/user.service';
import { Student } from '../_models/student.model';


@Injectable()
export class StudentService {
  constructor(private _httpClient : HttpClient, 
              private userJWT: UserService ){}
  
    private studentsList : Student[];

    // All the asynch results, captured by the interceptor student-error-interceptor-service
      getStudentsList(): Observable<Student[]> {
       const stdObservable:Observable<Student[]> =
           this._httpClient.get<Student[]>(`${environment.apiUrl}/students`);
       stdObservable.subscribe();
       (response => {
          this.studentsList = response.map
          (item => { return item; });
         }
       );
       return stdObservable;
      }
      registerStudent(newStudent: Student): Observable<Student>{
          // find the maximum sId in the array
          const maxId = this.studentsList.reduce(function(s1,s2){
            return (s1.id > s2.id) ? s1:s2;
          }).id +1;
          newStudent.id = null;
          return this._httpClient.post<Student>(`${environment.apiUrl}/students`, newStudent);
          
      }
      updateStudent(updatedStudent: Student): Observable<Student> {
          // find the maximum sId in the array          
          return this._httpClient.put<Student>(`${environment.apiUrl}/students/${updatedStudent.id}` , updatedStudent);              
 
      }
      getStudentById(sId : number) : Observable<Student>{    
        return this._httpClient.get<Student>(`${environment.apiUrl}/students/${sId}`);
      };
     



      deleteStudentById(sId : number): Observable<void>{
        return this._httpClient.delete<void>(`${environment.apiUrl}/students/${sId}`);
      };

 
}