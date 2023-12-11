import { Component } from '@angular/core';
//import { User } from 'src/app/user';
import  userData  from '../../../assets/userData.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Router } from '@angular/router';

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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private router: Router,){}
  
  registrationForm = new FormGroup({
    'fname': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
    ]),
    'mname': new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
  ]),
    'lname': new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
  ]),
  
    'dob': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'file': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'adhar': new FormControl('', [Validators.required]),
    'country': new FormControl('', [Validators.required]),
    'state': new FormControl('', [Validators.required]),
    'phone': new FormControl('', [Validators.required]),
  })
  usersList: any[]= [];
  users: User[] = userData;
  selectedIndex: number = -1;
  isEditMode: boolean = false;
  isSubmitMode: boolean = true;
  ngOnInit(): void {
    
  }
    
    
  edit(i: number) {
    this.router.navigate(['/sign-up']);
    this.registrationForm.patchValue({
      fname: this.usersList[i].fname,
      //mname: this.usersList[i].mname,
      lname: this.usersList[i].lname,
      dob: this.usersList[i].dob,
      email: this.usersList[i].email,
      file: this.usersList[i].file,
      address: this.usersList[i].address,
      adhar: this.usersList[i].adhar,
      country: this.usersList[i].country,
      state: this.usersList[i].state,
      phone: this.usersList[i].phone,

    });
    this.selectedIndex = i;
    this.isEditMode = true;
    this.isSubmitMode = false;
  }
  updateData() {
    if (this.selectedIndex !== -1) {
      this.usersList[this.selectedIndex].fname = this.registrationForm.value.fname;
      this.usersList[this.selectedIndex].lname = this.registrationForm.value.lname;
      this.usersList[this.selectedIndex].dob = this.registrationForm.value.dob;
      this.usersList[this.selectedIndex].email = this.registrationForm.value.email;
      this.usersList[this.selectedIndex].file = this.registrationForm.value.file;
      this.usersList[this.selectedIndex].address = this.registrationForm.value.address;
      this.usersList[this.selectedIndex].adhar = this.registrationForm.value.adhar;
      this.usersList[this.selectedIndex].country = this.registrationForm.value.country;
      this.usersList[this.selectedIndex].state = this.registrationForm.value.state;
      this.usersList[this.selectedIndex].phone = this.registrationForm.value.phone;

      localStorage.setItem('usersList', JSON.stringify(this.usersList));
    }
    //this.clearEditMode();
  }
  submit() {
    console.log(this.registrationForm.value);
    if (this.isEditMode) {
      this.updateData();
    } else {
      return;
    }
    
  }
}
