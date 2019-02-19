import { NgModule } from "@angular/core";
import { CoachingViewComponent } from "./coaching-view.component";
import { SharedModule } from "../shared/shared.module";
import { CustomViewModule } from "../shared/custom-view/custom-view.module";

@NgModule({
  imports: [SharedModule, CustomViewModule],
  declarations: [CoachingViewComponent],
  providers: []
})
export class CoachingViewModule {}
