import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ScrollAnimationComponent } from "./scoll-animation.component";
import { NavMenuButtonModule } from "../nav-menu-button/nav-menu-button.module";

@NgModule({
  imports: [SharedModule, NavMenuButtonModule],
  exports: [ScrollAnimationComponent],
  declarations: [ScrollAnimationComponent],
  providers: []
})
export class ScrollAnimationModule {}
