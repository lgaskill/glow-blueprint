import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
} from "@angular/material";
import { CommonModule } from "@angular/common";

const sharedModules = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
  declarations: [],
  providers: []
})
export class SharedModule {}
