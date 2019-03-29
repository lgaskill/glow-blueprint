import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { HealthHistoryPanelComponent } from "./health-history-panel.component";

@NgModule({
  imports: [SharedModule],
  declarations: [HealthHistoryPanelComponent],
  exports: [HealthHistoryPanelComponent],
  providers: []
})
export class HealthHistoryPanelModule {}
