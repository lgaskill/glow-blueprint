import { Component, ViewChild } from "@angular/core";
import { MatStepper, MatDialog } from "@angular/material";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CreateAccountDialog } from "../login-view/login-view.component";
import { HealthHistoryPanelComponent } from "../profile/health-history-panel/health-history-panel.component";

@Component({
  selector: "group-enrollment-registration-view",
  templateUrl: "./group-enrollment-registration-view.component.html",
  styleUrls: ["./group-enrollment-registration-view.component.scss"]
})
export class GroupEnrollmentRegistrationViewComponent {
  registrationComplete: boolean = false;
  healthHistoryComplete: boolean = false;
  paymentComplete: boolean = false;

  showSpinner: boolean = false;

  @ViewChild(MatStepper) stepper: MatStepper;
  @ViewChild(HealthHistoryPanelComponent)
  healthHistory: HealthHistoryPanelComponent;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.onRegistrationSuccess();
    }
  }

  onLogin() {
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: this.router.url }
    });
  }

  onCreateAccount() {
    const dialogRef = this.dialog.open(CreateAccountDialog, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !!result.success) {
        this.onRegistrationSuccess();
      }
    });
  }

  onRegistrationSuccess() {
    this.showSpinner = true;
    this.registrationComplete = true;

    setTimeout(() => {
      this.showSpinner = false;

      this.stepper.next();
    }, 2000);
  }

  async onHealthHistorySave() {
    await this.healthHistory.onSave();

    this.healthHistoryComplete = true;

    setTimeout(() => {
      this.stepper.next();
    }, 1000);
  }
}
