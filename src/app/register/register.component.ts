import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import { NgForm } from '@angular/forms';
//import { RegisterLoginService } from '../shared/register-login.service';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
//import { UserService } from '../shared/register-login.service';

declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  //providers: [EmployeeService]
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;

  constructor(private _router:Router, private employeeService:EmployeeService, private formBuilder: FormBuilder) { 
    /* this.employeeService.selectedEmployee = {
      _id: "",
      email: "",
      username: "",
      name: "",
      role: "",
      password: ""
    } */
  }


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$") ]],
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
  });

  }

  get f() { return this.registrationForm.controls; }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  onSubmit() {

    this.submitted= true;
    if (this.registrationForm.invalid) {
      return;
    }

    this.employeeService.register((this.registrationForm.value)).subscribe(
      data=> {
        console.log(data); 
        //this.employeeService.clearSelectedEmployee();
        this._router.navigate(['/login']);
        M.toast({ html: 'Registered successfully', classes: 'rounded' });
      },
      (error)=>{
        console.error(error);
        if(error.status == 400){
          M.toast({ html: error.error['msg'], classes: 'rounded' });
        }

        if(error.status == 501){
          if((error.error.code== 11000) && (error.error.keyPattern['username']== 1)){
          M.toast({ html: 'The username already exists. Please enter a different username', classes: 'rounded' });
          }
        }
        /* console.log(error.error['msg']);
        console.log(error.status);
        console.log(error.msg); */
    
      }
    )
  }
    // console.log(JSON.stringify(this.registerForm.value));

}
