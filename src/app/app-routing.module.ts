import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { BlogViewComponent } from "./components/blog-view/blog-view.component";
import { CoachingViewComponent } from "./components/coaching-view/coaching-view.component";
import { MyStoryViewComponent } from "./components/my-story-view/my-story-view.component";
import { BlogPostViewComponent } from "./components/blog-post-view/blog-post-view.component";
import { AdminViewComponent } from "./components/admin-view/admin-view.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  // TODO:
  // { path: "boss-mama", component: AdminViewComponent },
  { path: "blog", component: BlogViewComponent },
  {
    path: "blog/:id",
    component: BlogPostViewComponent
  },
  { path: "coaching", component: CoachingViewComponent, pathMatch: "full" },
  { path: "my-story", component: MyStoryViewComponent, pathMatch: "full" },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
