import { Component } from "@angular/core";

const VIEWS: any = {
  BLOG: "",
  USERS: "",
  USER_GROUPS: "",
  OTHER: ""
};

@Component({
  selector: "admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.scss"]
})
export class AdminViewComponent {
  selectedView: string = "USER_GROUPS";

  onSelectedViewChange(selected: string) {
    this.selectedView = selected;
  }
}
