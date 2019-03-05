import { NgModule } from "@angular/core";
import { UserGroupListComponent } from "./user-group-list.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule],
  declarations: [UserGroupListComponent],
  exports: [UserGroupListComponent],
  providers: []
})
export class UserGroupListModule {}
