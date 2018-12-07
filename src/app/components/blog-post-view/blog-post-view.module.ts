import { NgModule } from "@angular/core";
import { BlogPostViewComponent } from "./blog-post-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { GbImageModule } from "../shared/gb-image/gb-image.module";
import { InstagramPanelModule } from "../shared/instagram-panel/instagram-panel.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    AppBarModule,
    GbImageModule,
    InstagramPanelModule
  ],
  declarations: [BlogPostViewComponent],
  providers: []
})
export class BlogPostViewModule {}
