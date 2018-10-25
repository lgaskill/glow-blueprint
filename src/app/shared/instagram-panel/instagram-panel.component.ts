import { Component, HostListener } from "@angular/core";

@Component({
  selector: "instagram-panel",
  templateUrl: "./instagram-panel.component.html",
  styleUrls: ["./instagram-panel.component.scss"]
})
export class InstagramPanelComponent {
  constructor() {
  }

  recentImageKeys: string[] = [
    "BpDolmzAKh1",
    "BpCdPH8gpMM",
    "Bo-idIzAUq9",
    "Bo9XxG_gA5s",
    "Boy4Kx2glvA",
    "BoowcHaA9lV",
    "Bowat3yAU-5",
    "BoO7dNAAEWt",
    "BnxKHIxHDJO",
    "BoNZdTYgJzM"
  ];
  
}
