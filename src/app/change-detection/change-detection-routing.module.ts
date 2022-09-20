import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangeDetectionComponent } from "./change-detection.component";

const routes: Routes = [
    { path:"", component: ChangeDetectionComponent }
];

@NgModule({
    exports: [RouterModule],
    imports:[RouterModule.forChild(routes)]
})

export class ChangeDetectionRoutingModule{}