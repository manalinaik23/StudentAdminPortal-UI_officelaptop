import {Address} from './Address.model';
import {Gender} from './Gender.model';

export interface Student{
  address:Address,
  dateOfBirth:string,
  email:string,
  firstName:string,
  gender:Gender,
  genderId:string,
  id:string,
  lastName:string,
  mobile:number,
  profileImageUrl:string
}
