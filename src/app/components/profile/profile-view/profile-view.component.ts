import { Component } from "@angular/core";
import { ComponentCanDeactivate } from "src/app/guards/component-can-deactivate";

@Component({
  selector: "profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"]
})
export class ProfileViewComponent extends ComponentCanDeactivate {
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
  contactInfoDirty: boolean = false;
  healthHistoryDirty: boolean = false;

  ngOnInit() {
    // Initialize the sidnav as Shown for large screens
    if (window.innerWidth > 600) {
      setTimeout(() => {
        this.sidenavOpened = true;
      }, 500);
    }
  }

  canDeactivate(): boolean {
    return !this.contactInfoDirty && !this.healthHistoryDirty;
  }

  onSelectedTabChange(selectedTab: any) {
    this.selectedTab = selectedTab;

    // Hide the side-nav on selection for small screens
    if (window.innerWidth < 600) {
      this.sidenavOpened = false;
    }
  }
}
