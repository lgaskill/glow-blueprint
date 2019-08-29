import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
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

    // Display registration modal after 15 seconds
    // Prevent for logged-in users and anyone who's already registered
    setTimeout(() => {
      const dialogRef = this.dialog.open(SubscribeDialogComponent, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && !!result.subscribed) {
          localStorage.setItem("subscribed", "true");
        }
      });
    }, 5000);
  }
}
