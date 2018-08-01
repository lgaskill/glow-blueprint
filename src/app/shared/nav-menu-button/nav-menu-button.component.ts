import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "nav-menu-button",
  templateUrl: "./nav-menu-button.component.html",
  styleUrls: ["./nav-menu-button.component.scss"]
})
export class NavMenuButtonComponent {
  @Input() open: boolean = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  handleClick = () => {
    this.open = !this.open;
    this.openChange.emit(this.open);
  };
}
