import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
} from "@angular/material";

const sharedModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
  providers: []
})
export class SharedModule {}
