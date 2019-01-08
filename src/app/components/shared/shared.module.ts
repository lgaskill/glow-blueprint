import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatGridListModule,
  MatRippleModule,
  MatTooltipModule
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
  MatRippleModule,
  MatTooltipModule
];

const pipes = [TimeFromNowPipe];

@NgModule({
  imports: sharedModules,
  exports: [...sharedModules, ...pipes],
  declarations: [...pipes],
  providers: []
})
export class SharedModule {}
