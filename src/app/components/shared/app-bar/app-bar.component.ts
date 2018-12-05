import { Component, HostListener, Input } from "@angular/core";
import { Constants } from "src/app/config/constants";
import { environment } from "src/environments/environment";

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

  constructor() {
    this.onResize();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
