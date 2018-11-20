import { NgModule } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { SharedModule } from "../../shared/shared.module";
import { InstagramPanelComponent } from "./instagram-panel.component";
import { NavMenuButtonModule } from "../nav-menu-button/nav-menu-button.module";

@NgModule({
  imports: [SharedModule, NavMenuButtonModule],
  exports: [InstagramPanelComponent],
  declarations: [InstagramPanelComponent],
  providers: []
})
export class InstagramPanelModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "instagram-logo",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/images/instagram-logo.svg"
      )
    );
  }
}
