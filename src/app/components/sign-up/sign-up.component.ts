import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, debounceTime, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit{

  fname = '';
  lname = '';
  mname = '';
  password = '';
  dob = '';
  address = '';
  adhar = '';
  country = '';
  state = '';
  email = '';

  
  myControl = new FormControl('', [Validators.required]);
  filteredOptions?: Observable<string[]>;
  registrationForm: FormGroup;
  submitted = false;

  countries: string[] = ['INDIA','USA', 'Canada', 'Australia', 'UK'];
  states: { [key: string]: string[] } = {
    INDIA: ['Karnataka','AndhraPradesh','Odisha','Delhi','TamilNadu'],
    USA: ['New York', 'California', 'Texas'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
    Australia: ['New South Wales', 'Victoria', 'Queensland'],
    UK: ['England', 'Scotland', 'Wales'],
  };

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      fname: new FormControl('', [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(30)
          ]),
      
      dob: [null, Validators.required],
      email: ['', [Validators.required, this.customEmailValidator]],
      adhar: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}$/)]],
      selectedCountry: ['', Validators.required],
      selectedState: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.maxLength(10)],
        [this.validatePhoneAvailability.bind(this)] // Async validator
            ],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      address : ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
     // },{

        //validators: MustMatch('password', 'confirmPassword'),
          
      
        
      });
    }

  customEmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const validEmailPatterns = [
      /^[a-zA-Z]+@[a-zA-Z]+\.com$/i,
      /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i,
    ];

    const isValid = validEmailPatterns.some(pattern => pattern.test(control.value));

    if (!isValid) {
      return { 'invalidEmail': true };
    }

    return null;
  }

  ngOnInit() {

    //this.mname.todaydate = this.myservice.showTodayDate();
    /*this.registrationForm = new FormGroup({
       email: new FormControl(""),
       passwd: new FormControl("")
    });*/
 
    this.onSubmit();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      
      startWith(''),
      switchMap(value => {
        const result = value !== null ? this._filter(value) : null;
        return result !== null ? of(result) : of([] as string[]);
      })
    );
    
  }

  onCountrySelected(event: any) {
    this.registrationForm.patchValue({
      selectedCountry: event.option.value,
    });
  }

  private _filter(value: string): string[] | null {
    const filterValue = value.toLowerCase();
    const filteredCountries = this.countries.filter((country) =>
      country.toLowerCase().includes(filterValue)
    );
    return filteredCountries.length ? filteredCountries : null;
  }

  getStateOptions(): string[] {
    const selectedCountry = this.registrationForm.get('selectedCountry')?.value;
    return selectedCountry ? this.states[selectedCountry] || [] : [];
  }

  validatePhoneAvailability(control: AbstractControl): Observable<any> {
    const phoneNumber = control.value;

    return of(null).pipe(
      debounceTime(300),
      map(() => {
        if (!this.isValidPhoneNumber(phoneNumber)) {
          return { invalidPhoneNumber: true };
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }

  private isValidPhoneNumber(phoneNumber: string): boolean {
    return phoneNumber.match(/^\d{10}$/) !== null;
  }

  user:any = {};
  localStorageItems:any
  doesUserExist: boolean = false;
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile);
    } else {
      console.error('No file selected');
    }
  }

  formatAdhar(event: any): void {
    let inputValue: string = event.target.value;

    inputValue = inputValue.replace(/\D/g, '');

    const adharControl = this.registrationForm.get('adhar');

    if (adharControl) {

      inputValue = inputValue.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');

      adharControl.setValue(inputValue);
    }
  }

  addUser(user: any) {
    let users: any[] = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users')!);
      for (let singlObj of users) {
        if (user.name === singlObj.name) {
          this.doesUserExist = true;
          console.log(this.doesUserExist);

          break;
        }
      }
      if(!this.doesUserExist){
        console.log(this.doesUserExist,'hello');
        users = [user, ...users]
      }
    }
    else{
      users = [user]
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  getphone() {
    return this.registrationForm.get('phone');
  }

  
// added for signup button
  onSubmit(){
    
    if (this.submitted || this.registrationForm.invalid) {
      
      alert('inside onSubmit1');
      console.error('Form has errors or has already been submitted. Cannot submit.');
      return;
    }
    alert('inside onSubmit2');
    this.user = this.registrationForm.value;
    this.addUser(this.user);
    this.displayUserData();
    this.submitted = true;
    alert('inside onSubmit3');
    if (this.registrationForm.valid) {
      alert('Form submitted with email');
      console.log('Form submitted with email:', this.registrationForm.value.email);
    } else {
      alert('inside onSubmit4 error');
      console.log('Form has validation errors. Please correct them before submitting.');
    }
  }
  
  displayUserData() {
    this.localStorageItems = JSON.parse(localStorage.getItem('Users') || '[]');
    console.log('Submitted User Data:', this.localStorageItems);
  }
  save(){
    
    let data ={"id": 1,
    "fname": "Sasmita",
    "mname": "Priyadarshini",
    "lname": "Das",
    "dob": "11/3/2021",
    "email": "priyadarshini@gmail.com",
    "address" : "Bangalore",
    "adhar":194736972834,
    "country": "India",
    "state": "Karnataka",
    "phone":9962899780,
    "password":"Priya123"};
    alert(data);
    localStorage.setItem('fname',JSON.stringify(data));
    localStorage.setItem('mname',JSON.stringify(data));
    localStorage.setItem('lname',JSON.stringify(data));
    localStorage.setItem('password',JSON.stringify(data));
    localStorage.setItem('confirm',JSON.stringify(data));
    localStorage.setItem('dob',JSON.stringify(data));
    localStorage.setItem('address',JSON.stringify(data));
    localStorage.setItem('adhar',JSON.stringify(data));
    localStorage.setItem('state',JSON.stringify(data));
    localStorage.setItem('phone',JSON.stringify(data));
    localStorage.setItem('email',JSON.stringify(data));

  }
 
  
  }

function MustMatch(password: string, confirm: string): any {
  throw new Error('Function not implemented.');
}
  