import { Component } from "@angular/core";

@Component({
  selector: "profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"]
})
export class ProfileViewComponent {
  tabs: any[] = [
    {
      name: "CONTACT_INFO",
      label: "Contact Info"
    },
    {
      name: "HEALTH_HISTORY",
      label: "Health History"
    }
  ];
  selectedTab: any = this.tabs[0];
  sidenavOpened: boolean = false;

  ngOnInit() {
    // Initialize the sidnav as Shown for large screens
    if (window.innerWidth > 600) {
      setTimeout(() => {
        this.sidenavOpened = true;
      }, 500);
    }
  }

  onSelectedTabChange(selectedTab: any) {
    this.selectedTab = selectedTab;
    this.sidenavOpened = false;
  }
}
