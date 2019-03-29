import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "src/app/services/auth.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "health-history-panel",
  templateUrl: "./health-history-panel.component.html",
  styleUrls: ["./health-history-panel.component.scss"]
})
export class HealthHistoryPanelComponent {
  user: User;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      emailFreq: [""],
      age: [""],
      height: [""],
      dateOfBirth: ["", Validators.required],
      placeOfBirth: [""],
      homePhone: [""],
      workPhone: [""],
      mobilePhone: ["", Validators.required],
      weightCurrent: [""],
      weightSixMonths: [""],
      weightOneYear: [""],
      weightDiffPref: [""],
      weightDiffReason: [""],

      relationshipStatus: [""],
      whereDoYouLive: [""],
      anyChildren: [""],
      anyPets: [""],
      occupation: [""],
      hoursWorkPerWeek: [""],

      mainHealthConcerns: [""],
      otherHealthConcerns: [""],
      pointFeltBest: [""],
      currentSeriousIllnesses: [""],
      mothersHealth: [""],
      fathersHealth: [""],
      ancestry: [""],
      bloodType: [""]
    });

    await this.loadUser();
  }

  getEmailErrorMessage() {
    return this.form.controls.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  async loadUser() {
    try {
      this.user = await this.apiService.get("/user");
    } catch (err) {
      console.log(err);
      return;
    }

    this.updateFormData();
  }

  updateFormData() {
    this.form.controls.firstName.setValue(this.user.firstName || "");
    this.form.controls.lastName.setValue(this.user.lastName || "");
    this.form.controls.email.setValue(this.user.email || "");
  }

  onCancel() {
    this.updateFormData();
  }

  async onSave() {
    if (!this.form.valid) {
      return;
    }

    // try {
    //   await this.apiService.patch("/user", {
    //     username: this.form.controls.username.value,
    //     firstName: this.form.controls.firstName.value,
    //     lastName: this.form.controls.lastName.value,
    //     email: this.form.controls.email.value
    //   });
    // } catch (err) {
    //   console.error(err);
    //   this.snackBar.open("Failed to save changes", "", { duration: 2000 });
    //   return;
    // }

    await this.loadUser();

    this.snackBar.open("Successfully Saved Changes :)", "", { duration: 2000 });
  }
}
