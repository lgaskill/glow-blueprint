import { NgModule } from "@angular/core";
import { BlogViewComponent } from "./blog-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";

@NgModule({
  imports: [SharedModule, AppBarModule],
  declarations: [BlogViewComponent],
  providers: []
})
export class BlogViewModule {}
