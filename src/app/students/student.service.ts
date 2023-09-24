import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../models/apiModels/Student.model';
import {UpdateStudentRequest} from '../models/apiModels/UpdateStudentRequest.model';
import { AddStudentRequest } from '../models/apiModels/AddStudentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  baseUrl:any="https://localhost:44330";

  getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl+"/Student");
  }

  getStudent(studentId:string):Observable<Student>{
   return this.http.get<Student>(this.baseUrl+'/Student/'+studentId);

  }
  updateStudent(studentId:string,studentRequest:Student):Observable<Student>{
    const updateStudentRequest:UpdateStudentRequest={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      email:studentRequest.email,
      dateOfBirth:studentRequest.dateOfBirth,
      genderId:studentRequest.genderId,
      mobile:studentRequest.mobile,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }

    return this.http.put<Student>(this.baseUrl+'/Student/'+studentId,updateStudentRequest);
  }

  deleteStudent(studentId:string):Observable<Student>{
    return this.http.delete<Student>(this.baseUrl+'/Student/'+studentId);
  }

  addStudent(studentRequest:Student):Observable<Student>{

    const addStudentRequest:AddStudentRequest={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      email:studentRequest.email,
      dateOfBirth:studentRequest.dateOfBirth,
      genderId:studentRequest.genderId,
      mobile:studentRequest.mobile,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress,
      profileImageUrl:"null"
    }
     return this.http.post<Student>(this.baseUrl+'/Student/Add',addStudentRequest);
  }

  uploadImage(studentId:string,file:File):Observable<any>{
    const formData = new FormData();
    formData.append("formFile",file);
    return this.http.post(this.baseUrl+'/Student/'+studentId+'/upload-image',
      formData,{
        responseType:'text'
      }
    );
  }

  getImagePath(relativePath:string){
    return `${this.baseUrl}/${relativePath}`;
  }
}
