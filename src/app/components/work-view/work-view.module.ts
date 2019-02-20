import { NgModule } from "@angular/core";
import { WorkViewComponent } from "./work-view.component";
import { SharedModule } from "../shared/shared.module";
import { CustomViewModule } from "../shared/custom-view/custom-view.module";

@NgModule({
  imports: [SharedModule, CustomViewModule],
  declarations: [WorkViewComponent],
  providers: []
})
export class WorkViewModule {}
