import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { EmployeeService } from "../shared/employee.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private employeeService : EmployeeService, private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            //console.log('This is the token value in Auth Interceptor: '+ this.employeeService.getToken());
            const clonedreq = req.clone({                
                headers: req.headers.set("Authorization", "Bearer " + this.employeeService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        //console.log('Error: '+err.ok);
                        if (err.ok == false && err.status == 401) {
                            //console.log('Inside error blog of authorisaion');
                            //console.log('Error: '+err);
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}