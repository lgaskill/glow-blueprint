import { NgModule } from "@angular/core";
import { CoachingViewComponent } from "./coaching-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";

@NgModule({
  imports: [SharedModule, AppBarModule],
  declarations: [CoachingViewComponent],
  providers: []
})
export class CoachingViewModule {}
