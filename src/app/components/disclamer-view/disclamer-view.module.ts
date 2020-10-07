import { NgModule } from "@angular/core";
import { DisclamerViewComponent } from "./disclamer-view.component";
import { SharedModule } from "../shared/shared.module";
import { CustomViewModule } from "../shared/custom-view/custom-view.module";

@NgModule({
  imports: [SharedModule, CustomViewModule],
  declarations: [DisclamerViewComponent],
  providers: []
})
export class DisclamerViewModule {}
