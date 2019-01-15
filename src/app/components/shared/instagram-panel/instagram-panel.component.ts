import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: "instagram-panel",
  templateUrl: "./instagram-panel.component.html",
  styleUrls: ["./instagram-panel.component.scss"]
})
export class InstagramPanelComponent {
  @Input()
  isSideNav: boolean = false;

  constructor() {}

  recentImageKeys: string[] = [
    "BsoRZvZjqXA",
    "BsoMUA4DmeD",
    "BsggnQnjY9P",
    "BsdQxUnj17i",
    "Bsa1OYaD3-1",
    "BsZdHNxj91A",
    "BsYJWI1DWOW",
    "BsViLIWjofP",
    "BsOW3viD70H",
    "BsOGeCFDEEV",
    "BsL2TOAjYXZ",
    "BsJVRRADiWs"
  ];
}
