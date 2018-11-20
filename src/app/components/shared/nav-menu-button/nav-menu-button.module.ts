import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { NavMenuButtonComponent } from "./nav-menu-button.component";

@NgModule({
  imports: [SharedModule],
  exports: [NavMenuButtonComponent],
  declarations: [NavMenuButtonComponent],
  providers: []
})
export class NavMenuButtonModule {}
