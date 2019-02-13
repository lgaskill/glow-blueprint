import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "coaching-view",
  templateUrl: "./coaching-view.component.html",
  styleUrls: ["./coaching-view.component.scss"]
})
export class CoachingViewComponent {
  editable: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    console.log(this.isAdmin);
  }

  onEdit() {
    this.editable = true;
  }

  onSave() {
    this.editable = false;
  }
}
