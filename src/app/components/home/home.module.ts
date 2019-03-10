import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { InstagramPanelModule } from "../shared/instagram-panel/instagram-panel.module";
import { ScrollAnimationModule } from "../shared/scroll-animation/scroll-animation.module";
import { RouterModule } from "@angular/router";
import { BlogListModule } from "../shared/blog-list/blog-list.module";

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    AppBarModule,
    InstagramPanelModule,
    ScrollAnimationModule,
    BlogListModule
  ],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
