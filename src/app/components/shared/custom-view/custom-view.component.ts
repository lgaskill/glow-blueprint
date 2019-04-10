import { Component, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ConfigService } from "src/app/services/config.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "custom-view",
  templateUrl: "./custom-view.component.html",
  styleUrls: ["./custom-view.component.scss"]
})
export class CustomViewComponent {
  @Input()
  configFieldId: string;
  @Input()
  viewTitle: string;
  @Input()
  appBarCollapsed: boolean = false;

  form: FormGroup;
  body: string = "";
  editable: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();

    this.body = config[this.configFieldId];
    this.isAdmin = this.authService.isAdmin();

    this.form = this.formBuilder.group({
      editor: [this.body]
    });
  }

  onEdit() {
    this.editable = true;
  }

  onCancel() {
    this.form.controls.editor.setValue(this.body);
    this.editable = false;
  }

  async onSave() {
    try {
      await this.configService.updateConfig({
        [this.configFieldId]: this.form.controls.editor.value
      });
    } catch (err) {
      console.log(err);
      return;
    }

    // Update locally
    const config = this.configService.getConfig();
    this.body = config[this.configFieldId];
    this.editable = false;

    // Show toast message
    this.snackBar.open("Successfully Updated!", "", { duration: 2000 });
  }
}
