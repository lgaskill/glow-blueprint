import { Component } from "@angular/core";
import { ComponentCanDeactivate } from "src/app/guards/component-can-deactivate";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"]
})
export class ProfileViewComponent extends ComponentCanDeactivate {
  tabs: any[] = [
    {
      name: "contact-info",
      label: "Contact Info"
    },
    {
      name: "health-history",
      label: "Health History"
    }
  ];
  selectedTab: any = this.tabs[0];
  sidenavOpened: boolean = false;
  contactInfoDirty: boolean = false;
  healthHistoryDirty: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // Initialize tab selection from query params
      const selectedTab = params["selectedTab"];
      if (selectedTab) {
        const tab = this.tabs.find(t => t.name === selectedTab);
        if (tab) {
          this.selectedTab = tab;
        }
      }
    });

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

    this.router.navigate([`/profile/${selectedTab.name}`]);
  }
}
