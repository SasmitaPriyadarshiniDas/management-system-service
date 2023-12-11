import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as userData from '../../../assets/userData.json';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usersData:any = [];
  isAuthenticated:any = true;

  loginform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  // userAuthentication:any = (userData as any).default;

  constructor(public readonly _httpClient: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this._httpClient.get('../../../assets/userData.json').subscribe(data => {
      this.usersData = data;
      console.log(this.usersData);
    })
  }

  Login(): void {
    const username = this.loginform.get('username')?.value;
    const password = this.loginform.get('password')?.value;

    for (const user of this.usersData) {
      if (user.username === username && user.password === password) {
        this.isAuthenticated = true;
        console.log('Authentication successful');
        this.router.navigate(['/viewprofile'])
        return;
      }
      
    }

     console.log('Authentication failed');
    //  this.isAuthenticated = false;


   }
 }

