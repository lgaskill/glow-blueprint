import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { BlogViewComponent } from "./components/blog-view/blog-view.component";
import { MyStoryViewComponent } from "./components/my-story-view/my-story-view.component";
import { BlogPostViewComponent } from "./components/blog-post-view/blog-post-view.component";
import { AdminViewComponent } from "./components/admin/admin-view/admin-view.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginViewComponent } from "./components/login-view/login-view.component";
import { AdminGuard } from "./guards/admin.guard";
import { ProfileViewComponent } from "./components/profile/profile-view/profile-view.component";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";
import { GroupEnrollmentRegistrationViewComponent } from "./components/group-enrollment-registration-view/group-enrollment-registration-view.component";
import { WorkWithMeViewComponent } from "./components/work-with-me-view/work-with-me-view.component";
import { DisclamerViewComponent } from "./components/disclamer-view/disclamer-view.component";
import { PrivacyPolicyViewComponent } from "./components/privacy-policy-view/privacy-policy-view.component";
import { TermsAndConditionsViewComponent } from "./components/terms-and-conditions-view/terms-and-conditions-view.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginViewComponent },
  { path: "about/disclamer", component: DisclamerViewComponent },
  { path: "about/privacy-policy", component: PrivacyPolicyViewComponent },
  { path: "about/terms-and-conditions", component: TermsAndConditionsViewComponent },
  {
    path: "boss-mama",
    component: AdminViewComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: "blog", component: BlogViewComponent },
  {
    path: "blog/:id",
    component: BlogPostViewComponent
  },
  {
    path: "group-enrollment-registration",
    component: GroupEnrollmentRegistrationViewComponent,
    pathMatch: "full"
  },
  { path: "my-story", component: MyStoryViewComponent, pathMatch: "full" },
  {
    path: "profile/:selectedTab",
    component: ProfileViewComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "work-with-me",
    component: WorkWithMeViewComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
