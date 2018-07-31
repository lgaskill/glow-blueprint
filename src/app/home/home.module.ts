import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";

@NgModule({
  imports: [SharedModule, AppBarModule],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
