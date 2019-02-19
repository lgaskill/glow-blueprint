import { Component, HostListener, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

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

  constructor(private authService: AuthService) {
    this.onResize();
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogout() {
    this.authService.logout();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
