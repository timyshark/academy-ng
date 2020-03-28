import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable , of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable()
export class StudentService {
  constructor(private _httpClient : HttpClient){}
  
    private studentsList : Student[];
    private student : Student;
    private baseUrl : string  = 'https://tutorials-hahlabs.appspot.com';

      getStudentsList(): Observable<Student[]> {
        const stdObservable:Observable<Student[]> =
              this._httpClient.get<Student[]>(`${this.baseUrl}/list-students`);
        stdObservable.subscribe
        (response => 
          {
           this.studentsList = response.map
           (item => {
             return item;
            }
           );
          }
        );
          return stdObservable;
      }
      
      registerStudent(newStudent: Student): Observable<Student>{
          // find the maximum sId in the array
          const maxId = this.studentsList.reduce(function(s1,s2){
            return (s1.sId > s2.sId) ? s1:s2;
          }).sId +1;
          newStudent.sId = maxId;
          return this._httpClient.post<Student>(this.baseUrl +'/create-student.php', newStudent, {
            headers: new HttpHeaders({
               'Content-Type' : 'application/json'
            })
          });
      }
      updateStudent(updatedStudent: Student): Observable<void> {
          // find the maximum sId in the array          
          return this._httpClient.put<void>(`${this.baseUrl}/update-student.php`, updatedStudent, {
            headers: new HttpHeaders({
               'Content-Type' : 'application/json'
            })
          });
      }
      getStudentById(sId : number) : Observable<Student>{    
        return this._httpClient.get<Student>(`${this.baseUrl}/get-student-by-id.php?sId=${sId}`);
      }
      deleteStudentById(sId : number): Observable<void>{
        return this._httpClient.delete<void>(`${this.baseUrl}/delete-student.php/?sId=${sId}`);;
 
      }
}