import { NgModule } from "@angular/core";
import { BlogListComponent } from "./blog-list.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { GbImageModule } from "../shared/gb-image/gb-image.module";

@NgModule({
  imports: [RouterModule, SharedModule, GbImageModule],
  exports: [BlogListComponent],
  declarations: [BlogListComponent],
  providers: []
})
export class BlogListModule {}
