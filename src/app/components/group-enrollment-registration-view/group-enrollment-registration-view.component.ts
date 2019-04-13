import { Component, ViewChild } from "@angular/core";
import { MatStepper, MatDialog, MatSnackBar } from "@angular/material";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CreateAccountDialog } from "../login-view/login-view.component";
import { HealthHistoryPanelComponent } from "../profile/health-history-panel/health-history-panel.component";
import { ApiService } from "src/app/services/api.service";
import { environment } from "../../../environments/environment";

const MERCH_ITEM_ID = "5caff25c48495425b434ed57";

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
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    const currentUser = this.authService.getCurrentUser();

    const payment_id = this.route.snapshot.queryParams.paymentId;
    const payer_id = this.route.snapshot.queryParams.PayerID;

    if (payment_id && payer_id && currentUser) {
      this.showSpinner = true;

      // Execute the transaction
      try {
        await this.apiService.post(`/execute-payment`, {
          payment_id,
          payer_id,
          item_id: MERCH_ITEM_ID
        });
      } catch (err) {
        return this.snackBar.open("Failed to complete transaction :/", "", {
          duration: 2000
        });
      }

      // Add MailChimp Subscriber Tag
      try {
        await this.apiService.post("/add_tag_mc", {
          list_id: "a5fdf12a6c",
          email: currentUser.email
        });
      } catch (err) {
        this.snackBar.open("Failed to send confirmation email :/", "", {
          duration: 2000
        });
      }

      // Clear the PayPal query params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          paymentId: null,
          PayerID: null,
          token: null
        },
        queryParamsHandling: "merge"
      });

      this.completeCheckout();
    } else if (currentUser) {
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
    this.registrationComplete = true;
    this.showSpinner = true;

    setTimeout(() => {
      this.showSpinner = false;

      this.stepper.next();
    }, 2000);
  }

  async onHealthHistorySave() {
    const success = await this.healthHistory.onSave();
    if (!success) {
      return;
    }

    this.healthHistoryComplete = true;

    setTimeout(() => {
      this.stepper.next();
    }, 1000);
  }

  async onCreatePayment() {
    const baseURL = environment.production
      ? "https://www.theglowblueprint.com"
      : "http://localhost:4200";

    let paymentResponse;
    try {
      paymentResponse = await this.apiService.post("/pay", {
        item_id: MERCH_ITEM_ID,
        success_redirect_url: `${baseURL}/#/group-enrollment-registration`,
        cancel_redirect_url: `${baseURL}/#/group-enrollment`
      });
    } catch (err) {
      return this.snackBar.open("Failed to initialize transaction :/", "", {
        duration: 2000
      });
    }

    window.location.href = paymentResponse.redirect_url;
  }

  completeCheckout() {
    this.registrationComplete = true;
    this.healthHistoryComplete = true;
    this.paymentComplete = true;

    setTimeout(() => {
      this.showSpinner = false;

      this.stepper.next();
      this.stepper.next();
    }, 2000);
  }
}
