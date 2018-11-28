import { NgModule } from "@angular/core";
import { BlogPostViewComponent } from "./blog-post-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";

@NgModule({
  imports: [SharedModule, AppBarModule],
  declarations: [BlogPostViewComponent],
  providers: []
})
export class BlogPostViewModule {}
