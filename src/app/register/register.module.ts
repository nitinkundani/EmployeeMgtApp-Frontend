import { NgModule } from "@angular/core";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[RegisterComponent],
    imports:[
        RegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        //BrowserModule,
        CommonModule
    ],
    providers: []
    
})
export class RegisterModule{

}