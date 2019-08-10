import { NgModule } from "@angular/core";
import { UserListComponent } from "./user-list.component";
import { SharedModule } from "../../shared/shared.module";
import { ContactInfoPanelModule } from "../../profile/contact-info-panel/contact-info-panel.module";
import { HealthHistoryPanelModule } from "../../profile/health-history-panel/health-history-panel.module";

@NgModule({
  imports: [SharedModule, ContactInfoPanelModule, HealthHistoryPanelModule],
  declarations: [UserListComponent],
  exports: [UserListComponent],
  providers: []
})
export class UserListModule {}
