import { NgModule } from "@angular/core";
import { DateRoutingModule } from "./date-routing.module";
import { DateComponent } from "./date.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MaterialModule } from "../material/material.module";
//import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
// import {ButtonModule} from 'primeng/button';
// import {SidebarModule} from 'primeng/sidebar';
import {DropdownModule} from 'primeng/dropdown';
// import { myDatePipe } from '../myDatePipe/myDatePipe';
// import { localeVariables } from "../shared/localeVariables";
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { myDatePipeModule } from "../myDatePipe/myDatePipe.module";

@NgModule({
    declarations:[DateComponent, 
        // myDatePipe,
        // localeVariables
    ],
    imports:[
        DateRoutingModule,
         FormsModule,
        //  MaterialModule,
        // ButtonModule,
        //BrowserAnimationsModule,
        //BrowserModule,
        // SidebarModule,
        DropdownModule,
        CommonModule, 
        myDatePipeModule
    ],
    providers: []
    
})
export class DateModule{

}