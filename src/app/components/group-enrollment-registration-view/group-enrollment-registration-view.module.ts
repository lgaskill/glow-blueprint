import { NgModule } from "@angular/core";
import { GroupEnrollmentRegistrationViewComponent } from "./group-enrollment-registration-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { HealthHistoryPanelModule } from "../profile/health-history-panel/health-history-panel.module";

@NgModule({
  imports: [SharedModule, AppBarModule, HealthHistoryPanelModule],
  declarations: [GroupEnrollmentRegistrationViewComponent],
  providers: []
})
export class GroupEnrollmentRegistrationViewModule {}
