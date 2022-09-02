// import { Constants } from './../util/constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../shared/employee.service';
import { Variables } from '../shared/localeVariables';
import { AppInjector } from '../app.module';
import { Observable } from 'rxjs';


interface Locale {
  name: string,
  code: string
}

@Pipe({
  name: 'localeDate', 
  pure: false
})
export class myDatePipe implements PipeTransform {
 private selectedLocale: Locale;
//  private updatedValue: string;
 
 constructor( 
    // private datePipe: DatePipe
    private employeeService: EmployeeService
    ) {
    // super('en-US');
    this.employeeService.getSelectedLocale().subscribe(data =>{
      this.selectedLocale = data;
      /* console.log("selectedLocale inside Pipe: "+this.selectedLocale.name);
      console.log(new Date(value).toLocaleDateString(this.selectedLocale.name)); */
      // return (new Date(value).toLocaleDateString(this.selectedLocale.name));
      // this.transform();
    } );
    
  } 

  // private employeeService: EmployeeService;

  /* transform(value: any, format?: string, timezone?: string, locale?: string): string {
      
  } */

  // private employeeService = AppInjector.get(EmployeeService);

  
  transform(value: any): any
  // Observable<string> 
  {

    // return Observable.create(observer => {
    /* this.employeeService.getSelectedLocale().subscribe(data =>{
      this.selectedLocale = data;
      console.log("selectedLocale inside Pipe: "+this.selectedLocale.name);
      // console.log(new Date(value).toLocaleDateString(this.selectedLocale.name));
      console.log("Inside transform method");
      console.log(value.toLocaleDateString(this.selectedLocale.name));
      let updatedValue = value.toLocaleDateString(this.selectedLocale.name);
      observer.next(updatedValue);
      
    } );
  }); */
  // console.log("Inside transform method");
  return new Date(value).toLocaleDateString(this.selectedLocale.name);

    
    

  }
  
}