import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ContactInfoPanelComponent } from "./contact-info-panel.component";

@NgModule({
  imports: [SharedModule],
  declarations: [ContactInfoPanelComponent],
  exports: [ContactInfoPanelComponent],
  providers: []
})
export class ContactInfoPanelModule {}
