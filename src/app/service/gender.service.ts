import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/apiModels/Gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http:HttpClient) { }
  baseUrl:any="https://localhost:44330";

  getGenderList():Observable<Gender[]>{
    return this.http.get<Gender[]>(this.baseUrl+'/Gender');
  }
}
