import { NgModule } from "@angular/core";
import { MyStoryViewComponent } from "./my-story-view.component";
import { SharedModule } from "../shared/shared.module";
import { CustomViewModule } from "../shared/custom-view/custom-view.module";

@NgModule({
  imports: [SharedModule, CustomViewModule],
  declarations: [MyStoryViewComponent],
  providers: []
})
export class MyStoryViewModule {}
