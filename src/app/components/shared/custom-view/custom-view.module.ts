import { NgModule } from "@angular/core";
import { CustomViewComponent } from "./custom-view.component";
import { SharedModule } from "../shared.module";
import { AppBarModule } from "../app-bar/app-bar.module";
import { ScrollAnimationModule } from "../scroll-animation/scroll-animation.module";

@NgModule({
  imports: [SharedModule, AppBarModule, ScrollAnimationModule],
  exports: [CustomViewComponent],
  declarations: [CustomViewComponent],
  providers: []
})
export class CustomViewModule {}
