import { Component } from '@angular/core';
//import { User } from 'src/app/user';
import  userData  from '../../../assets/userData.json';
import { EmailValidator } from '@angular/forms';



interface User {  
    id: number,
    fname: String,
    mname: String,
    lname: String,
    dob: String,
    email: String,
    address: String,
    adhar:number,
    country: String,
    state: String,
    phone: number
 }  


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  users: User[] = userData;
  
 
}
