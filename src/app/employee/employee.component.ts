import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { DateObj } from '../shared/DateObj.model';
import { Observable } from 'rxjs';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import {saveAs} from "file-saver";
import { SortEvent } from 'primeng/api';
//import { PrimeNGConfig } from 'primeng/api';

//import {PrimeNGConfig} 
// import { PrimeNGConfig } from 'primeng/api'

declare var M: any;
//declare var employeeList : Employee[];

interface Locale {
  name: string,
  code: string
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  //providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  sideBar;

  employee: Employee= {
    _id: "",
    email: "",
    username: "",
    name: "",
    role: "",
    password: ""
  };
  employeeList: Employee[];
  // cols: any[];

  dateObj: DateObj;
 

  dateList: DateObj[];

  /* locals: Locale []; */
 selectedLocale: Locale = {
    name: "en-US",
    code: "mediumDate"
 };

 
 /* = {
    name: "default",
    code: "mediumDate"
  }  */
  // dateFormat: string;

 

  constructor(public employeeService: EmployeeService, private _router: Router) { 

    /* this.locals= [
      {name: 'en-US', code: 'MM/dd/yyyy'},
      {name: 'en-GB', code: 'dd/MM/yyyy'},
      // {name: 'default', code: 'MM/dd/yyyy'}
  ]; */

  }

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //searchKey: string;
  
  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
    this.refreshDateList();

    /* this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Color' }
    ]; */
    

    /* this.employeeService.getEmployeeList().subscribe(
      res => {
        var employees : Employee [] = 
        //categoryList: string [] = JSON.parse(JSON.stringify(res)).map(data => data.category);
        let array = JSON.parse(JSON.stringify(res)).map(item => {
          //let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          return {
            $key: item.key,
            //departmentName,
            //...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      }); */
  }

  resetForm(form?: NgForm) {
    
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      email: "",
      username: "",
      name: "",
      role: "",
      password: "",
      //salary: null
    }
  }

  onSubmit(form: NgForm) {
    
    if (form.value._id == "" || form.value._id == null ) {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
        // console.log("Form ID Value: "+form.value._id)
      }, 
      (error) => {
        console.error(error);
        if(error.status == 400){
          M.toast({ html: error.error['msg'], classes: 'rounded' });
        }

        if(error.status == 501){
          if((error.error.code== 11000) && (error.error.keyPattern['username']== 1)){
          M.toast({ html: 'The username already exists. Please enter a different username', classes: 'rounded' });
          }
        }
      }
      );
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      }, 
      (error) => {
        console.error(error);
        if(error.status == 400){
          M.toast({ html: error.error['msg'], classes: 'rounded' });
        } else {
          M.toast({ html: 'Error in updating user details', classes: 'rounded' });
        }

      }
      );
    }
    //this.employeeService.clearSelectedEmployee();

    }

  

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employeeList = data as Employee [];
      /* this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; */
    });
    
    /* : Observable<any> {
      return this.http.get('./json/login.json')
        .map((result: Response) => result.json())
        .catch(this.getError);
    } */

    /* .subscribe((res) => {
      this.employeeService.employees = res as unknown as Employee[];
    }); */
}

refreshDateList() {
  this.employeeService.getDateList().subscribe(data => {
    this.dateList = data as DateObj [];
    
  });
}

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  showEmployeeDetails(_username: string){
    this.employeeService.showEmployee(_username);
    //this._router.navigate(['/employee'+`/${_username}`]);
    /*. subscribe(
      data =>{
        console.log(data);
        //this.employeeService.EmployeeToShow = data as Employee;

        this.employeeService.EmployeeToShow = {...this.employeeService.EmployeeToShow , ...data};

        console.log(this.employeeService.EmployeeToShow);
        if(Object.keys(this.employeeService.EmployeeToShow).length){
          //this.EmployeeToShow['isDataAvailable'] = true;
          this._router.navigate(['/employee'+`/${_username}`]);
        }

        //this._router.navigate(['/employee'+`/${_username}`]);
      },
      error=>console.error(error)
    ); */
    //console.log('tempData'+tempData);
    //this._router.navigate(['/employee'+`/${_username}`]);
     
  }
    
    showProfile () {
      this.sideBar = true;
      // console.log('Employee component, Logged in username: '+this.employeeService.getLoggedInUserEmail());
      this.employeeService.getLoggedInUserData().subscribe(
        data => {
          this.employee = data as Employee;
    
        }
      )
    }

    downloadLoggedInUserDetails(){
      this.employeeService.getLoggedInUserData().subscribe(
        data => {
          this.employee = data as Employee;
          const rowData : string [][] = [
            ['token',this.employeeService.getToken()],
            ['username', this.employee.username]
          ];
            /* "token": this.employeeService.getToken(),
            "username": this.employee.username */
            // [JSON.stringify(rowData, null,2)]
            /* {
              type: "text/csv;charset=utf-8"
            } */
        // const blob: Blob = new Blob(rowData, );

        let csvContent = "data:text/csv;charset=utf-8," 
        + rowData.map(e => e.join(",")).join("\n");

        //console.log("CSV Content: "+csvContent);
    
        // saveAs(blob, "userData.csv");

var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "userData.csv");
document.body.appendChild(link); // Required for FF

link.click();
      },
      error=> {
        console.log('Some error in getting Employee data');
        console.error(error);
      } 
      );
    }

    logOut(){
      this.employeeService.deleteToken();
      this.employeeService.deleteLoggedInUserEmail();
      this._router.navigate(['/login']);
      M.toast({ html: 'Logout successful', classes: 'rounded' });
    }

    moveToDatePage(){
      this._router.navigate(['/date']);
    }

    moveToChangeDetectionDemo(){
      this._router.navigate(['/change-detection']);
    }

    updateSelectedLocale(){
      // console.log("Inside updateSelectedLocal function");
      // console.log("selectedLocale inside updateSelectedLocale: "+this.selectedLocale.name);
      this.employeeService.setSelectedLocale();
    }

    customSort(event: SortEvent) {
      //event.data = Data to sort
      //event.mode = 'single' or 'multiple' sort mode
      //event.field = Sort field in single sort
      //event.order = Sort order in single sort
      //event.multiSortMeta = SortMeta array in multiple sort

      event.data.sort((data1, data2) => {
          let value1 = data1[event.field];
          let value2 = data2[event.field];
          let result = null;

          switch (true) {

            case (value1 == null && value2 != null) :
              result = -1;
              break;
            case (value1 != null && value2 == null) :
              result = 1;
              break;
            case (value1 == null && value2 == null) :
              result = 0;
              break;
              case (typeof value1 === 'string' && typeof value2 === 'string') :
                result = value1.localeCompare(value2);
                break;    
             default:
              result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
       
           }

          /* if (value1 == null && value2 != null)
            result = -1;
          else if (value1 != null && value2 == null)
              result = 1;
          else if (value1 == null && value2 == null)
              result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string')
              result = value1.localeCompare(value2);
          else
              result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0; */

          return (event.order * result);
      });
  }
  

}