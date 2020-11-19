import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/users/_services/user.service';
import { vuStudent } from '../_models/student.model';


@Injectable()
export class StudentService {
  constructor(private _httpClient : HttpClient, 
              private userJWT: UserService ){}
  
    private studentsList : vuStudent[];

    // All the asynch results, captured by the interceptor student-error-interceptor-service
      getStudentsList(): Observable<vuStudent[]> {
       const stdObservable:Observable<vuStudent[]> =
           this._httpClient.get<vuStudent[]>(`${environment.apiUrl}/students`);

           //Subscribe only if need to process anything here (debug for example)
      stdObservable.subscribe(
       (response => {
          this.studentsList = response.map(item => { return item; });
         }
       ));
       return stdObservable;
      }
      registerStudent(newStudent: vuStudent): Observable<vuStudent>{
          // find the maximum sId in the array
          const maxId = this.studentsList.reduce(function(s1,s2){
            return (s1.id > s2.id) ? s1:s2;
          }).id +1;
          newStudent.id = null;
          return this._httpClient.post<vuStudent>(`${environment.apiUrl}/students`, newStudent);
          
      }
      updateStudent(updatedStudent: vuStudent): Observable<vuStudent> {
          // find the maximum sId in the array          
          return this._httpClient.put<vuStudent>(`${environment.apiUrl}/students/${updatedStudent.id}` , updatedStudent);              
 
      }
      getStudentById(id : number) : Observable<vuStudent>{    
        return this._httpClient.get<vuStudent>(`${environment.apiUrl}/students/${id}`);
      };
     



      deleteStudentById(id : number): Observable<void>{
        return this._httpClient.delete<void>(`${environment.apiUrl}/students/${id}`);
      };

 
}