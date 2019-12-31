import { Component } from "@angular/core";
import { ConfigService } from "src/app/services/config.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "gb-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  body: String = "";
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    const config: Config = this.configService.getConfig();

    this.body = config.welcomeDesc;
    this.isAdmin = this.authService.isAdmin();
  }
}
