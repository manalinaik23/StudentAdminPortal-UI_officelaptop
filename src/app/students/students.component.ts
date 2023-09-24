import { Component, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../models/UIModels/Student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

 constructor(private studentService:StudentService){}
 Students:Student[]=[];
 displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile','gender','edit'];
 dataSource :MatTableDataSource<Student> = new MatTableDataSource<Student>();

 @ViewChild(MatPaginator)
 matPaginatore!:MatPaginator;

 @ViewChild(MatSort)
 matSort !:MatSort;

 searchValue:any='';

 ngOnInit(){
  console.log("ngOninit");
  this.studentService.getStudents().subscribe(
    (response)=>{
      console.log(this.Students);
      this.Students = response;
      this.dataSource = new MatTableDataSource<Student>(this.Students);
      if(this.matPaginatore){
        this.dataSource.paginator = this.matPaginatore;
      }

      if(this.matSort){
        this.dataSource.sort = this.matSort;
      }


    },
   (error)=>{
      console.log(error);
    }
  );
 }

 filterStudents(){
  this.dataSource.filter = this.searchValue.trim().toLowerCase();
 }


}


