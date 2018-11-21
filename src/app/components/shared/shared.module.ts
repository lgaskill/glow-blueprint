import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatGridListModule
} from "@angular/material";
import { CommonModule } from "@angular/common";

const sharedModules = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
  declarations: [],
  providers: []
})
export class SharedModule {}
