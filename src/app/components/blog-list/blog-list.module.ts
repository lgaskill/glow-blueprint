import { NgModule } from "@angular/core";
import { BlogListComponent } from "./blog-list.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";

@NgModule({
  imports: [SharedModule],
  exports: [BlogListComponent],
  declarations: [BlogListComponent],
  providers: []
})
export class BlogListModule {}
