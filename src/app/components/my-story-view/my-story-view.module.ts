import { NgModule } from "@angular/core";
import { MyStoryViewComponent } from "./my-story-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { ScrollAnimationModule } from "../shared/scroll-animation/scroll-animation.module";

@NgModule({
  imports: [SharedModule, AppBarModule, ScrollAnimationModule],
  declarations: [MyStoryViewComponent],
  providers: []
})
export class MyStoryViewModule {}
