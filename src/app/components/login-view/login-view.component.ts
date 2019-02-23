import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "login-view",
  templateUrl: "./login-view.component.html",
  styleUrls: ["./login-view.component.scss"]
})
export class LoginViewComponent {
  loginForm: FormGroup;
  returnUrl: String;
  showPassword: Boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams["returnUrl"] || "/";
  }

  onTogglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onLogin(): Promise<void> {
    if (!this.loginForm.valid) {
      return;
    }

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    try {
      await this.authService.login(username, password);
      this.router.navigate([this.returnUrl]);
    } catch (err) {
      this.snackBar.open("Invalid username and/or password", "", {
        duration: 2000
      });
    }
  }

  onCreateAccount() {
    const dialogRef = this.dialog.open(CreateAccountDialog, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !!result.success) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }
}

@Component({
  selector: "create-account-dialog",
  templateUrl: "./create-account.dialog.html",
  styleUrls: ["./create-account.dialog.scss"]
})
export class CreateAccountDialog {
  registrationForm: FormGroup;
  showPassword: Boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreateAccountDialog>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  getEmailErrorMessage() {
    return this.registrationForm.controls.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  onTogglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (!this.registrationForm.valid) {
      return;
    }

    const firstName = this.registrationForm.controls.firstName.value;
    const lastName = this.registrationForm.controls.lastName.value;
    const email = this.registrationForm.controls.email.value;
    const username = this.registrationForm.controls.username.value;
    const password = this.registrationForm.controls.password.value;

    try {
      await this.apiService.post("/user", {
        firstName,
        lastName,
        email,
        username,
        password
      });
    } catch (err) {
      let warningMessage: string;
      if (err === "See Other") {
        warningMessage =
          "An account with this username and/or email already exists";
      } else {
        warningMessage = "Registration Failed";
      }

      this.snackBar.open(warningMessage, "", {
        duration: 2000
      });
      return;
    }

    this.snackBar.open("Account Successfully Created!", "", {
      duration: 2000
    });

    try {
      await this.authService.login(username, password);
    } catch (err) {
      this.snackBar.open("Failed to log in", "", {
        duration: 2000
      });

      this.dialogRef.close();
    }

    this.dialogRef.close({ success: true });
  }
}
