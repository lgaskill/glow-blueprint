import { NgModule } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { SharedModule } from "../../shared/shared.module";
import { AppBarComponent } from "./app-bar.component";
import { NavMenuButtonModule } from "../nav-menu-button/nav-menu-button.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule, SharedModule, NavMenuButtonModule],
  exports: [AppBarComponent],
  declarations: [AppBarComponent],
  providers: []
})
export class AppBarModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "instagram-logo",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/images/icons/instagram-logo.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "gb-logo-1",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/images/icons/gb-logo-1.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "gb-logo-2",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/images/icons/gb-logo-2.svg"
      )
    );
  }
}
