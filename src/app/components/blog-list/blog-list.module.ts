import { NgModule } from "@angular/core";
import { BlogListComponent } from "./blog-list.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule, SharedModule],
  exports: [BlogListComponent],
  declarations: [BlogListComponent],
  providers: []
})
export class BlogListModule {}
