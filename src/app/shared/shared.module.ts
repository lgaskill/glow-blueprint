import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

const sharedModules = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule
  // RouterModule
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
  declarations: [],
  providers: []
})
export class SharedModule {}
