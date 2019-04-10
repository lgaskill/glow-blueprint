import { NgModule } from "@angular/core";
import { GroupEnrollmentViewComponent } from "./group-enrollment-view.component";
import { SharedModule } from "../shared/shared.module";
import { CustomViewModule } from "../shared/custom-view/custom-view.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule, SharedModule, CustomViewModule],
  declarations: [GroupEnrollmentViewComponent],
  providers: []
})
export class GroupEnrollmentViewModule {}
