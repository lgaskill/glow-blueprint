import { NgModule } from "@angular/core";
import { BlogPostCreatorComponent } from "./blog-post-creator.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule],
  declarations: [BlogPostCreatorComponent],
  exports: [BlogPostCreatorComponent],
  providers: []
})
export class BlogPostCreatorModule {}
