import { NgModule } from "@angular/core";

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MaterialModule } from "../material/material.module";
//import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
// import {ButtonModule} from 'primeng/button';
// import {SidebarModule} from 'primeng/sidebar';

import { myDatePipe } from "./myDatePipe";


@NgModule({
    declarations:[
        myDatePipe
        // localeVariables
    ],
    imports:[
        
         FormsModule,
        //  MaterialModule,
        // ButtonModule,
        //BrowserAnimationsModule,
        //BrowserModule,
        // SidebarModule,
       
        CommonModule
    ],
    providers: [],
    exports: [
      myDatePipe
    ]
    
})
export class myDatePipeModule{

}