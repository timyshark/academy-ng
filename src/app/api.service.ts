import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Student } from './student';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://php_sample.hahlabs.com";
  
  constructor() {private httpClient:HttpClient }
}
