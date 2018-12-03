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
  imageId: String = null;

  navOpen: boolean = false;
  screenWidth: number;
  imageUrl: String;

  constructor() {
    this.onResize();
  }

  ngOnInit() {
    // Generate the custom image URL
    debugger;
    if (!this.imageId) {
      return;
    }

    const apiKey: String = Constants.API_KEY;
    const hostUrl: string = environment.production
      ? Constants.API_HOST_PROD
      : Constants.API_HOST_LOCAL;

    this.imageUrl = `${hostUrl}/image/${this.imageId}?key=${apiKey}`;
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
