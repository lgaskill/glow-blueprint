import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { AppBarModule } from "../app-bar/app-bar.module";
import { ScrollAnimationModule } from "../scroll-animation/scroll-animation.module";
import { SubscribeDialogComponent } from "./subscribe-dialog.component";

@NgModule({
  imports: [SharedModule, AppBarModule, ScrollAnimationModule],
  entryComponents: [SubscribeDialogComponent],
  declarations: [SubscribeDialogComponent],
  providers: []
})
export class SubscribeDialogModule {}
