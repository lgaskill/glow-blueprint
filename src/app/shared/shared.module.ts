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
  declarations: [],
  providers: []
})
export class SharedModule {}
