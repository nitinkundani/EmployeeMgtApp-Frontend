import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, Observer, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
//import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
//import { toPromise } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

// import {BehaviorSubject } from 'rxjs';


import { Employee } from './employee.model';
import { DateObj } from './DateObj.model';
import { Console } from 'console';
import { isNgTemplate } from '@angular/compiler';

interface Locale {
  name: string,
  code: string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  locals: Locale [];
  // selectedLocale: Locale;

  selectedLocale: Locale = {
    name: "en-US",
    code: "mediumDate"
  }

  selectedLocaleSubject = new BehaviorSubject<Locale>(this.selectedLocale);

  selectedLocale$= this.selectedLocaleSubject.asObservable();

  selectedEmployee: Employee; 
  EmployeeToShow : Employee ={
    _id: "",
    email: "",
    username: "",
    name: "",
    role: "",
    password: "",
    dob: undefined,
    salary: 0
};
  employees: Employee [];

  //loggedInUserEmail: string;

  /* ({
      _id: "",
      username: "",
      name: "",
      role: "",
      password: "",
  }); */
  
  readonly baseURL = 'http://localhost:8080/users/employee';

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  item: Object;

  dateObj: DateObj;
  dateList: DateObj[];

 
  

  constructor(private http: HttpClient, private router: Router) {
    this.selectedEmployee = {
      _id: "",
      email: "",
      username: "",
      name: "",
      role: "",
      password: "",
      dob: undefined,
      salary: 0
    }

    this.locals= [
      {name: 'en-US', code: 'MM/dd/yyyy'},
      {name: 'en-GB', code: 'dd/MM/yyyy'},
      // {name: 'default', code: 'MM/dd/yyyy'}
  ];

  /* this.selectedLocale = {
    name: "default",
    code: "mediumDate"
  } */

    //localStorage.setItem('token','');
    //tokenKey = '';

   }

   // Observable string source
  /* private dataStringSource = new BehaviorSubject<Employee>(this.EmployeeToShow);

  // Observable string stream
  dataString$ = this.dataStringSource.asObservable(); */

  register(emp: Employee){
    return this.http.post('http://localhost:8080/users/register', emp, this.noAuthHeader);
  }

  login(authCredentials){
    return this.http.post('http://localhost:8080/users/login',authCredentials,this.noAuthHeader);
  }

  

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  /* getEmployeeList() {
     //return this.http.get(this.baseURL);

     
      return this.http.get(this.baseURL).pipe(map((result: Response) => result.json()));
  } */

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  //Get Date Data
  getDateList() {
    return this.http.get('http://localhost:8080/users/date');
  }

  getDateListForDatePage() {
    return this.http.get('http://localhost:8080/users/date2');
  }

  showEmployee (username: string) 
  {
    //var item: Observable<Employee>;
    return this.http.get(this.baseURL + `/${username}`).subscribe(
      data=>{
        //console.log(data);
        //emp : Employee;
        this.EmployeeToShow = data as Employee;
        /* if(Object.keys(this.EmployeeToShow).length){
          this.EmployeeToShow['isDataAvailable'] = true;
        } */


       /*  console.log('EmployeeToShow class value: ');
        console.log(this.EmployeeToShow);
        console.log('Username: '+ this.EmployeeToShow.username);  */
        //this.dataStringSource.next(this.EmployeeToShow);
        //return data;
        this.router.navigate(['/employee'+`/${username}`]);
       },

      error=> {
        console.log('Some error in getting Employee data');
        console.error(error);
        //return of(this.EmployeeToShow);
      } 
      //return this.item;
    );
   
  }

  showEmployeeProfile() {

    return this.http.get(this.baseURL + `/profile/${this.getLoggedInUserEmail()}`).subscribe(
      data=>{
        //console.log(data);
        //emp : Employee;
        this.EmployeeToShow = data as Employee;
        /* if(Object.keys(this.EmployeeToShow).length){
          this.EmployeeToShow['isDataAvailable'] = true;
        } */


       /*  console.log('EmployeeToShow class value: ');
        console.log(this.EmployeeToShow);
        console.log('Username: '+ this.EmployeeToShow.username);  */
        //this.dataStringSource.next(this.EmployeeToShow);
        //return data;
        this.router.navigate(['/employee'+`/${this.EmployeeToShow.username}`]);
       },

      error=> {
        console.log('Some error in getting Employee data');
        console.error(error);
        //return of(this.EmployeeToShow);
      } 
      //return this.item;
    );
   
    
  }

  getLoggedInUserData() {
    return this.http.get(this.baseURL + `/profile/${this.getLoggedInUserEmail()}`);
    
  }

   //Method to provide Employee object Asynchronously to another component
  /* getEmployeeToShow(): Observable<Employee> {
    const employeeShow = of(this.EmployeeToShow);
    //return employeeShow;
    console.log(employeeShow);
    return employeeShow;
  } 
 */
  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.baseURL + `/${id}`);
  }

 
  //Helper Methods

  setToken(token: string) {
      //loc token);
      localStorage.setItem('token', token);
  }

  getToken() {
    //console.log('token value in localStorage: ' + localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
 
  //Logged-in user information 
  getLoggedInUserEmail () {
    return localStorage.getItem('loggedInUserEmail');
  }

  setLoggedInUserEmail(email: string){
    localStorage.setItem('loggedInUserEmail', email);
  }

  deleteLoggedInUserEmail() {
    localStorage.removeItem('loggedInUserEmail');
  }

  clearSelectedEmployee()
  {
    this.selectedEmployee = {
      _id: "",
      email: "",
      username: "",
      name: "",
      role: "",
      password: "",
      dob: undefined,
      salary: 0
    }
  }

  /* function selectedLocaleProvider (observer: Observer<Locale>) {
    observer.next(this.selectedLocale);
  } */

  /* sequence = new Observable((observer)=> {
    observer.next(this.selectedLocale);
  }); */

  getSelectedLocale(): Observable<Locale>{
    return this.selectedLocale$;

  }

  setSelectedLocale(){
    return this.selectedLocaleSubject.next(this.selectedLocale);
  }

  // this.selectedLocaleSubject.next(this.selectedLocale)

  /* getSelectedLocale(): Observable<Locale> {
    const obsLocale = of(this.selectedLocale);
    //return employeeShow;
    // console.log(employeeShow);
    return obsLocale;
  }  */

}

