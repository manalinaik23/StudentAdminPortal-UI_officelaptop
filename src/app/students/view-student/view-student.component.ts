import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Student } from 'src/app/models/apiModels/Student.model';
import { first, take } from 'rxjs/operators';
import { GenderService } from 'src/app/service/gender.service';
import { Gender } from 'src/app/models/UIModels/Gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ViewStudents',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent {

  studentId:string|null|undefined;
  student:Student={
    id:'' ,
    firstName:'',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description:''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  genderList:Gender[]=[];
  isNewStudent=false;
  header:string='';
  displayImageUrl:string='';

  constructor(private studentService:StudentService,
    private route:ActivatedRoute,
    private genderService:GenderService,
    private matSnackbar:MatSnackBar ,
    private router:Router){

  }
  ngOnInit():void{
    this.route.paramMap.subscribe(
       (params)=>{
        this.studentId = params.get('id');

        if(this.studentId){
          if(this.studentId.toLowerCase()==='Add'.toLowerCase()){
            this.isNewStudent = true;
            this.header="Add Student";
            this.SetImage();
          }else{
            this.isNewStudent = false;
            this.header="Edit Student";

             this.studentService.getStudent(this.studentId).subscribe({
                next:(response)=>{
                  console.log(response);
                  this.student = response;
                  this.SetImage();
                },
                error:(error)=>{
                  console.log(error);
                  this.SetImage();
                }
              }
            )
          }
        }
        if(this.studentId){

           /*access gender List */
           this.genderService.getGenderList().subscribe({
            next:(response)=>{
              this.genderList = response;
              console.log(response);
            },
            error:(error)=>{
              console.log(error);
            }
           })
           /*end access gender List */
        }

       }
    )
  }

  updateDetails():void{
    if(this.studentId){
      this.student.id=this.studentId;
    }
    this.studentService.updateStudent(this.student.id,this.student).subscribe({
      next:(response)=>{
        this.matSnackbar.open("Record is Updated!!",undefined,{duration:2000});
        console.log(response);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  deleteStudent():void{
    if(this.studentId){
      this.student.id=this.studentId;
    }
  this.studentService.deleteStudent(this.student.id).subscribe({
    next:(response)=>{
      this.matSnackbar.open("Record is deleted",undefined,{duration:2000});

      setTimeout(()=>{
        this.router.navigateByUrl('Students');
      },2000);


    },
    error:(error)=>{
      console.log(error);
    }
  })
  }

  AddStudent():void{
    this.studentService.addStudent(this.student).subscribe({
    next:(response)=>{
      this.matSnackbar.open("Student is Added Successfully",undefined,{duration:2000});
       setTimeout(()=>{
        this.router.navigateByUrl(`Students/${response.id}`);
       },2000);
    },
    error:(error)=>{
      console.log(error);
    }
    })
  }

  SetImage():void{
    if(this.student.profileImageUrl){
     this.displayImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);

    }else{
      this.displayImageUrl = '/assets/userProfile.png';
    }
  }

  uploadImage(event:any):void{
    if(this.studentId){
      const file:File = event.target.files[0];
      this.studentService.uploadImage(this.studentId,file).subscribe({
        next:(response:any)=>{
          this.student.profileImageUrl = response;
          this.SetImage();
          this.matSnackbar.open("Image is Updated!!",undefined,{duration:2000});
        },
        error:(error:any)=>{
          console.log(error);
        }
      })
    }
  }

}


