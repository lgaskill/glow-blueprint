import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CreateAccountDialog } from "./components/login-view/login-view.component";
import { SubscribeDialogComponent } from "./components/shared/subscribe-dialog/subscribe-dialog.component";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    if (
      localStorage.getItem("subscribed") ||
      this.authService.getCurrentUser()
    ) {
      return;
    }

    setTimeout(() => {
      const dialogRef = this.dialog.open(SubscribeDialogComponent, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && !!result.subscribed) {
          localStorage.setItem("subscribed", "true");
        }
      });
    }, 15000);
  }
}
