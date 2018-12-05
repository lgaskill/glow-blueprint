import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { GbImageComponent } from "./gb-image.component";
import { NavMenuButtonModule } from "../nav-menu-button/nav-menu-button.module";

@NgModule({
  imports: [SharedModule, NavMenuButtonModule],
  exports: [GbImageComponent],
  declarations: [GbImageComponent],
  providers: []
})
export class GbImageModule {
  constructor() {}
}
