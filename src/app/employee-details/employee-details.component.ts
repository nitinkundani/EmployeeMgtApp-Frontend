import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  //emp: Employee;
emp: Employee = {
  _id: "",
  email: "",
  username: "",
  name: "",
  role: "",
  password: "",
  dob: undefined,
  salary: 0
}

  constructor(private employeeService: EmployeeService, private router: Router) { 
    /* this.emp = this.employeeService.EmployeeToShow;
    console.log(this.employeeService.EmployeeToShow); */
    //console.log('Constructor: '+ this.employeeService.EmployeeToShow);
    /* console.log('Constructor');
    this.emp = {...this.employeeService.EmployeeToShow};
    console.log(this.employeeService.EmployeeToShow);
    console.log(this.emp); */
    
  }

  ngOnInit() {
    //console.log('ngOnInit');
    this.emp = this.employeeService.EmployeeToShow;
    //console.log(this.employeeService.EmployeeToShow);
    //console.log('Employee detail in 2nd component: '+ this.emp);
    //console.log('Username: '+ emp[username]);
    //console.log(this.employeeService.EmployeeToShow);
    /* this.employeeService.getEmployeeToShow().subscribe(
      data => { 
        this.emp = data as Employee;
        console.log('Employee data inside employee details ts class: ');
        console.log(this.emp);
      }, 
      error=>console.error(error)
    );
     */
      /* f(this.emp !== data)
        {
          this.emp= data;
          console.log('Inside employee details component');
          console.log(this.emp);
        }
      }
    ); */
  }

    /* getEmployee() {
    this.employeeService.getEmployeeToShow().subscribe(
      data => { 
        this.emp = data as Employee;
        console.log('Employee data inside employee details ts class: ');
        console.log(this.emp);
      }, 
      error=>console.error(error)
    );
  }  */
 
  moveToHome(){
    this.router.navigate(['/home']);
  }

}
