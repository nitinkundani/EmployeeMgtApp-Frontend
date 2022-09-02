import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { myDatePipe } from './myDatePipe/myDatePipe';
import { myDatePipe } from './myDatePipe/myDatePipe';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { EmployeeComponent } from './employee/employee.component';
//import { RegisterComponent } from './register/register.component';
//import { LoginComponent } from './login/login.component';
//import { RegisterLoginService } from './shared/register-login.service';
import { EmployeeService } from './shared/employee.service';
import { NotificationService } from './shared/notification.service';
//import { environment } from '../environments/environment';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';

// import { DateComponent } from './date/date.component';
// import { EmployeeDetailsComponent } from './employee-details/employee-details.component';


const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'login', //component:LoginComponent
  loadChildren:'./login/login.module#LoginModule' },
  {path:'register', loadChildren:'./register/register.module#RegisterModule' },
  {path:'home',loadChildren:'./employee/employee.module#EmployeeModule'}, 
  {path:'employee/:username',loadChildren:'./employee-details/employee-details.module#EmployeeDetailsModule'},
  {path:'date',loadChildren:'./date/date.module#DateModule'}, 
];

export let AppInjector : Injector;

@NgModule({
  declarations: [
    AppComponent,
    // myDatePipe
    // DateComponent,
    // EmployeeComponent,
    //RegisterComponent,
    //LoginComponent,
    // EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), 
    // myDatePipe
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, EmployeeService, NotificationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector){
    AppInjector = this.injector;
  }
}