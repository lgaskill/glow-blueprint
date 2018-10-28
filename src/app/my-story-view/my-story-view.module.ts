import { NgModule } from "@angular/core";
import { MyStoryViewComponent } from "./my-story-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";

@NgModule({
  imports: [SharedModule, AppBarModule],
  declarations: [MyStoryViewComponent],
  providers: []
})
export class MyStoryViewModule {}
