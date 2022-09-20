import { NgModule } from "@angular/core";
import { ChangeDetectionRoutingModule } from "./change-detection-routing.module";
import { ChangeDetectionComponent } from "./change-detection.component";
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
//import { REACTIVE_DRIVEN_DIRECTIVES } from "@angular/forms/src/directives";
//import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
    declarations:[ChangeDetectionComponent],
    imports:[
        ChangeDetectionRoutingModule,
         FormsModule,
         CheckboxModule,
        //BrowserModule,
        //REACTIVE_DRIVEN_DIRECTIVES,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: []
    
})
export class ChangeDetectionModule{

}