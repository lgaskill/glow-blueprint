import { NgModule } from "@angular/core";
import { BlogViewComponent } from "./blog-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { BlogListModule } from "../blog-list/blog-list.module";

@NgModule({
  imports: [SharedModule, AppBarModule, BlogListModule],
  declarations: [BlogViewComponent],
  providers: []
})
export class BlogViewModule {}
