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
  MatSnackBarModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatListModule,
  MatExpansionModule,
  MatSelectModule,
  MatMenuModule,
  MatDividerModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { TimeFromNowPipe } from "src/app/pipes/time-from-now.pipe";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { OrderByPipe } from "src/app/pipes/order-by.pipe";
import { SafeHtmlPipe } from "src/app/pipes/safe-html.pipe";

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
  MatAutocompleteModule,
  MatDialogModule,
  MatListModule,
  MatExpansionModule,
  MatSelectModule,
  MatMenuModule,
  MatDividerModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatTabsModule,

  DropzoneModule
];

const pipes = [TimeFromNowPipe, OrderByPipe, SafeHtmlPipe];

const configs = [
  QuillModule.forRoot({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [
          {
            color: [
              "#b65b83",
              "#F44336",
              "#E91E63",
              "#FF4081",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#2196F3",
              "#03A9F4",
              "#00BCD4",
              "#009688",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFEB3B",
              "#FFC107",
              "#FF9800",
              "#FF5722",
              "#795548",
              "#EEEEEE",
              "#E0E0E0",
              "#BDBDBD",
              "#9E9E9E",
              "#757575",
              "#616161",
              "#424242",
              "#212121",
              "#000000"
            ]
          },
          { background: [] }
        ], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button

        ["link", "image", "video"]
      ]
    }
  })
];

@NgModule({
  imports: [...sharedModules, ...configs],
  exports: [...sharedModules, ...pipes, QuillModule],
  declarations: [...pipes],
  providers: []
})
export class SharedModule {}
