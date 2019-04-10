import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { BlogViewComponent } from "./components/blog-view/blog-view.component";
import { CoachingViewComponent } from "./components/coaching-view/coaching-view.component";
import { MyStoryViewComponent } from "./components/my-story-view/my-story-view.component";
import { BlogPostViewComponent } from "./components/blog-post-view/blog-post-view.component";
import { AdminViewComponent } from "./components/admin/admin-view/admin-view.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginViewComponent } from "./components/login-view/login-view.component";
import { AdminGuard } from "./guards/admin.guard";
import { WorkViewComponent } from "./components/work-view/work-view.component";
import { ProfileViewComponent } from "./components/profile/profile-view/profile-view.component";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";
import { GroupEnrollmentViewComponent } from "./components/group-enrollment-view/group-enrollment-view.component";
import { GroupEnrollmentRegistrationViewComponent } from "./components/group-enrollment-registration-view/group-enrollment-registration-view.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginViewComponent },
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
    path: "coaching",
    component: CoachingViewComponent,
    pathMatch: "full"
  },
  {
    path: "group-enrollment",
    component: GroupEnrollmentViewComponent,
    pathMatch: "full"
  },
  {
    path: "group-enrollment-registration",
    component: GroupEnrollmentRegistrationViewComponent,
    pathMatch: "full"
  },
  { path: "my-story", component: MyStoryViewComponent, pathMatch: "full" },
  {
    path: "profile",
    component: ProfileViewComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  { path: "work-with-me", component: WorkViewComponent, pathMatch: "full" },
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
