import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeDetailsComponent } from "./employee-details.component";

const routes: Routes = [
    { path:"", component: EmployeeDetailsComponent }
];

@NgModule({
    exports: [RouterModule],
    imports:[RouterModule.forChild(routes)]
})

export class EmployeeDetailsRoutingModule{}