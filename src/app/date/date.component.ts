import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { EmployeeService } from '../shared/employee.service';
import { DateObj } from '../shared/DateObj.model';
// import { Variables } from '../shared/localeVariables';
// import { myDatePipe } from '../myDatePipe/myDatePipe';

interface Locale {
  name: string,
  code: string
}

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  dateObj: DateObj;
  dateList: DateObj[];
  locales: Locale [];
  selectedLocale: Locale;
  // locales: Variables.locales;

  constructor(public employeeService: EmployeeService, private router: Router) { 
    // console.log(Variables.locales);
  }

  ngOnInit() {
    this.refreshDateList();
    // this.locales = Variables.locales;

    
  }

  refreshDateList() {
    this.employeeService.getDateListForDatePage().subscribe(data => {
    this.dateList = data as DateObj [];
  });
}

moveToHome(){
  this.router.navigate(['/home']);
}

updateSelectedLocale(){
  this.employeeService.setSelectedLocale();
}

}
