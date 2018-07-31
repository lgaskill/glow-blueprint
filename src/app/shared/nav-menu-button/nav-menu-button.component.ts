import { Component } from "@angular/core";

@Component({
  selector: "nav-menu-button",
  templateUrl: "./nav-menu-button.component.html",
  styleUrls: ["./nav-menu-button.component.scss"]
})
export class NavMenuButtonComponent {
  open: boolean = false;
  constructor() {}

  handleClick = () => {
    this.open = !this.open;
  };
}
