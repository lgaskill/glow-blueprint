import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatGridListModule,
  MatRippleModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { TimeFromNowPipe } from "src/app/pipes/time-from-now.pipe";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
  MatRippleModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  QuillModule
];

const pipes = [TimeFromNowPipe];

@NgModule({
  imports: sharedModules,
  exports: [...sharedModules, ...pipes],
  declarations: [...pipes],
  providers: []
})
export class SharedModule {}
