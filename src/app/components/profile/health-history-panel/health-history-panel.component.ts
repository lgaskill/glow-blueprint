import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "health-history-panel",
  templateUrl: "./health-history-panel.component.html",
  styleUrls: ["./health-history-panel.component.scss"]
})
export class HealthHistoryPanelComponent {
  isDirty: boolean = false;
  healthHistory: any = {};
  form: FormGroup;

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
    this.form = this.formBuilder.group(HEALTH_HISTORY_FIELDS);

    // Flip the dirty bit on form value change
    this.form.valueChanges.subscribe(() => {
      if (this.isDirty != this.form.dirty) {
        this.isDirty = this.form.dirty;
        this.dirtyChange.emit(this.isDirty);
      }
    });

    await this.loadHealthHistory();
  }

  getEmailErrorMessage() {
    return this.form.controls.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  async loadHealthHistory() {
    try {
      this.healthHistory = await this.apiService.get("/health-history");
      if (null == this.healthHistory) {
        this.healthHistory = {};
      }
    } catch (err) {
      console.log(err);
      return;
    }

    this.updateFormData();
  }

  updateFormData() {
    for (const fieldName in HEALTH_HISTORY_FIELDS) {
      this.form.controls[fieldName].setValue(this.healthHistory[fieldName]);
    }

    // Clear the dirty bit
    this.isDirty = false;
    this.dirtyChange.emit(this.isDirty);
  }

  onCancel() {
    this.updateFormData();
  }

  async onSave() {
    if (!this.form.valid) {
      this.snackBar.open(
        "Whoops, looks like one or more answers are missing or invalid :/",
        "",
        { duration: 2000 }
      );
      return;
    }

    // Assemble the patch object!
    const patchObj = {};
    for (const fieldName in HEALTH_HISTORY_FIELDS) {
      patchObj[fieldName] = this.form.controls[fieldName].value;
    }

    try {
      // If there's not a valid _id present we need to create a new record
      if (this.healthHistory._id) {
        await this.apiService.patch("/health-history", patchObj);
      } else {
        await this.apiService.post("/health-history", patchObj);
      }
    } catch (err) {
      console.error(err);
      this.snackBar.open("Failed to save changes", "", { duration: 2000 });
      return;
    }

    await this.loadHealthHistory();

    this.snackBar.open("Successfully Saved Changes :)", "", { duration: 2000 });
  }
}

export const HEALTH_HISTORY_FIELDS = {
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
  bloodType: [""],
  sleepQuality: [""],
  sleepDuration: [""],
  sleepWaking: [""],
  painStiffnessOrSwelling: [""],
  digestiveHealth: [""],
  allergiesOrSensitivities: [""],

  periodsRegular: [""],
  flowDays: [""],
  periodFreq: [""],
  periodPains: [""],
  reachedMenopause: [""],
  birthControlHistory: [""],
  infections: [""],

  supplimentsOrMedications: [""],
  healersOrTherapies: [""],
  sportsAndExercise: [""],

  peerSupport: [""],
  doYouCook: [""],
  percentageHomeCooking: [""],
  nonHomeCookedMeals: [""],

  childhoodDietBreakfast1: [""],
  childhoodDietLunch1: [""],
  childhoodDietDinner1: [""],
  childhoodDietSnacks1: [""],
  childhoodDietLiquids1: [""],

  childhoodDietBreakfast2: [""],
  childhoodDietLunch2: [""],
  childhoodDietDinner2: [""],
  childhoodDietSnacks2: [""],
  childhoodDietLiquids2: [""],

  childhoodDietBreakfast3: [""],
  childhoodDietLunch3: [""],
  childhoodDietDinner3: [""],
  childhoodDietSnacks3: [""],
  childhoodDietLiquids3: [""],

  currentDietBreakfast1: [""],
  currentDietLunch1: [""],
  currentDietDinner1: [""],
  currentDietSnacks1: [""],
  currentDietLiquids1: [""],

  currentDietBreakfast2: [""],
  currentDietLunch2: [""],
  currentDietDinner2: [""],
  currentDietSnacks2: [""],
  currentDietLiquids2: [""],

  currentDietBreakfast3: [""],
  currentDietLunch3: [""],
  currentDietDinner3: [""],
  currentDietSnacks3: [""],
  currentDietLiquids3: [""],

  addictions: [""],
  priorityDietChange: [""],
  additionalComments: [""]
};
