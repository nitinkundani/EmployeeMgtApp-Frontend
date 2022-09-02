import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DateComponent } from "./date.component";

const routes: Routes = [
    { path:"", component: DateComponent }
];

@NgModule({
    exports: [RouterModule],
    imports:[RouterModule.forChild(routes)]
})

export class DateRoutingModule{}