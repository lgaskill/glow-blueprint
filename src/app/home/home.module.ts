import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { InstagramPanelModule } from "../shared/instagram-panel/instagram-panel.module";
import { ScrollAnimationModule } from "../shared/scroll-animation/scroll-animation.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    AppBarModule,
    InstagramPanelModule,
    ScrollAnimationModule
  ],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
