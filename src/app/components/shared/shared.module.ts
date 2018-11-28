import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatGridListModule,
  MatRippleModule
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { TimeFromNowPipe } from "src/app/pipes/time-from-now.pipe";

const sharedModules = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
  MatRippleModule
];

@NgModule({
  imports: sharedModules,
  exports: [...sharedModules, TimeFromNowPipe],
  declarations: [TimeFromNowPipe],
  providers: []
})
export class SharedModule {}
