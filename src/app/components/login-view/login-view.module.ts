import { NgModule } from "@angular/core";
import {
  LoginViewComponent,
  CreateAccountDialog
} from "./login-view.component";
import { SharedModule } from "../shared/shared.module";
import { AppBarModule } from "../shared/app-bar/app-bar.module";
import { ScrollAnimationModule } from "../shared/scroll-animation/scroll-animation.module";

@NgModule({
  imports: [SharedModule, AppBarModule, ScrollAnimationModule],
  entryComponents: [CreateAccountDialog],
  declarations: [LoginViewComponent, CreateAccountDialog],
  providers: []
})
export class LoginViewModule {}
