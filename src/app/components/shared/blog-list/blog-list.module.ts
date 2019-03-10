import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BlogListComponent } from "./blog-list.component";
import { SharedModule } from "../shared.module";
import { GbImageModule } from "../gb-image/gb-image.module";

@NgModule({
  imports: [RouterModule, SharedModule, GbImageModule],
  exports: [BlogListComponent],
  declarations: [BlogListComponent],
  providers: []
})
export class BlogListModule {}
