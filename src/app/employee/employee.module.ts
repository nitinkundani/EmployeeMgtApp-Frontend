import { NgModule } from "@angular/core";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeComponent } from "./employee.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from "../material/material.module";
//import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {DropdownModule} from 'primeng/dropdown';
// import { myDatePipe } from "../myDatePipe/myDatePipe";
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { myDatePipeModule } from "../myDatePipe/myDatePipe.module";
import {TableModule} from 'primeng/table';


@NgModule({
    declarations:[EmployeeComponent, 
        // myDatePipe 
    ],
    imports:[
        EmployeeRoutingModule,
         FormsModule,
         MaterialModule,
        ButtonModule,
        //BrowserAnimationsModule,
        //BrowserModule,
        SidebarModule,
        DropdownModule,
        CommonModule,
        myDatePipeModule,
        TableModule
    ],
    providers: []
    
})
export class EmployeeModule{

}