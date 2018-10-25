import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { InstagramPanelModule } from "../shared/instagram-panel/instagram-panel.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [SharedModule, RouterModule, AppBarModule, InstagramPanelModule],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
