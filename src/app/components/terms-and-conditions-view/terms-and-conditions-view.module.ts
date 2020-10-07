import { NgModule } from "@angular/core";
import { TermsAndConditionsViewComponent } from "./terms-and-conditions-view.component";
import { SharedModule } from "../shared/shared.module";
import { CustomViewModule } from "../shared/custom-view/custom-view.module";

@NgModule({
  imports: [SharedModule, CustomViewModule],
  declarations: [TermsAndConditionsViewComponent],
  providers: []
})
export class TermsAndConditionsViewModule {}
