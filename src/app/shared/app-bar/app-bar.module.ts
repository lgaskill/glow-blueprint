import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { AppBarComponent } from "./app-bar.component";
import { NavMenuButtonModule } from "../nav-menu-button/nav-menu-button.module";

@NgModule({
  imports: [SharedModule, NavMenuButtonModule],
  exports: [AppBarComponent],
  declarations: [AppBarComponent],
  providers: []
})
export class AppBarModule {}
