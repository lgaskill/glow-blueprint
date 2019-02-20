import { Component, HostListener, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.scss"]
})
export class AppBarComponent {
  @Input()
  collapsed: Boolean = false;

  navOpen: boolean = false;
  screenWidth: number;
  currentUser: User = null;

  constructor(private authService: AuthService, private router: Router) {
    this.onResize();
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogout() {
    this.authService.logout();
    location.reload();
  }

  onLogin() {
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: this.router.url }
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
