import { NgModule } from "@angular/core";
import { EmployeeDetailsRoutingModule } from "./employee-details-routing.module";
import { EmployeeDetailsComponent } from "./employee-details.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[EmployeeDetailsComponent],
    imports:[
        EmployeeDetailsRoutingModule,
         FormsModule,
        //BrowserModule,
        CommonModule
    ],
    providers: []
    
})
export class EmployeeDetailsModule{

}