import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.scss"]
})
export class AppBarComponent {
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
