import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "contact-info-panel",
  templateUrl: "./contact-info-panel.component.html",
  styleUrls: ["./contact-info-panel.component.scss"]
})
export class ContactInfoPanelComponent {
  form: FormGroup;
  isDirty: boolean = false;

  @Input() isAdmin: boolean = false;
  @Input() user: User;

  @Input() dirty() {
    return this.isDirty;
  }
  @Output() dirtyChange: EventEmitter<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.dirtyChange = new EventEmitter();
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required]
    });

    // Flip the dirty bit on form value change
    this.form.valueChanges.subscribe(() => {
      if (this.isDirty != this.form.dirty) {
        this.isDirty = this.form.dirty;
        this.dirtyChange.emit(this.isDirty);
      }
    });

    await this.loadUser();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update form fields on external changes
    if (this.isAdmin && changes.user && !changes.user.firstChange) {
      this.loadUser();
    }
  }

  getEmailErrorMessage() {
    return this.form.controls.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  async loadUser() {
    // Don't reload the user when the admin flag is set
    if (!this.isAdmin) {
      try {
        this.user = await this.apiService.get("/user");
      } catch (err) {
        console.log(err);
        return;
      }
    }

    this.updateFormData();
  }

  updateFormData() {
    this.form.setValue({
      username: this.user.username || "",
      firstName: this.user.firstName || "",
      lastName: this.user.lastName || "",
      email: this.user.email || ""
    });

    // Clear the dirty bit
    this.isDirty = false;
    this.dirtyChange.emit(this.isDirty);
  }

  onCancel() {
    this.updateFormData();
  }

  async onSave() {
    if (!this.form.valid) {
      return;
    }

    // TODO: Admin stuff??

    try {
      await this.apiService.patch("/user", {
        username: this.form.controls.username.value,
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        email: this.form.controls.email.value
      });
    } catch (err) {
      console.error(err);
      this.snackBar.open("Failed to save changes", "", { duration: 2000 });
      return;
    }

    await this.loadUser();

    this.snackBar.open("Successfully Saved Changes :)", "", { duration: 2000 });
  }
}
