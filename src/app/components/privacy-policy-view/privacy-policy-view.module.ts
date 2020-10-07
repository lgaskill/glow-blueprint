import { NgModule } from "@angular/core";
import { PrivacyPolicyViewComponent } from "./privacy-policy-view.component";
import { SharedModule } from "../shared/shared.module";
import { CustomViewModule } from "../shared/custom-view/custom-view.module";

@NgModule({
  imports: [SharedModule, CustomViewModule],
  declarations: [PrivacyPolicyViewComponent],
  providers: []
})
export class PrivacyPolicyViewModule {}
