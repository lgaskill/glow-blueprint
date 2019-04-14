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
    "BwJ6sLbg2ss",
    "BwH--AxgAIe",
    "BwEzoDJA25_",
    "BwA-wiNgV0q",
    "Bv_mVOYAYq6",
    "Bv9Ho4xghrv",
    "Bv7Nyo5gXJA",
    "Bv4vwVXgIAn",
    "Bv2H2YTgRUv",
    "BvywLB9gzJv",
    "BvwLEpOAhv1",
    "BvtlsDwgzNT"
  ];
}
