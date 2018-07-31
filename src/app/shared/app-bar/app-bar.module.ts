import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { AppBarComponent } from "./app-bar.component";

@NgModule({
  imports: [SharedModule],
  exports: [AppBarComponent],
  declarations: [AppBarComponent],
  providers: []
})
export class AppBarModule {}
