import { NgModule } from "@angular/core";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
//import { REACTIVE_DRIVEN_DIRECTIVES } from "@angular/forms/src/directives";
//import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[LoginComponent],
    imports:[
        LoginRoutingModule,
         FormsModule,
        //BrowserModule,
        //REACTIVE_DRIVEN_DIRECTIVES,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: []
    
})
export class LoginModule{

}