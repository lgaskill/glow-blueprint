import { NgModule } from "@angular/core";
import { CoachingViewComponent } from "./coaching-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { ScrollAnimationModule } from "../shared/scroll-animation/scroll-animation.module";

@NgModule({
  imports: [SharedModule, AppBarModule, ScrollAnimationModule],
  declarations: [CoachingViewComponent],
  providers: []
})
export class CoachingViewModule {}
