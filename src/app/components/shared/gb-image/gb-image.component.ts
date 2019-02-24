import { Component, Input } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Constants } from "src/app/config/constants";

@Component({
  selector: "gb-image",
  templateUrl: "./gb-image.component.html",
  styleUrls: ["./gb-image.component.scss"]
})
export class GbImageComponent {
  @Input()
  id: String = "";

  @Input()
  imgClass: String = "";

  hostUrl: string = environment.production
    ? Constants.API_HOST_PROD
    : Constants.API_HOST_LOCAL;

  constructor() {}
}
