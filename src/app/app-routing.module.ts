import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BlogViewComponent } from "./blog-view/blog-view.component";
import { CoachingViewComponent } from "./coaching-view/coaching-view.component";
import { MyStoryViewComponent } from "./my-story-view/my-story-view.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "blog", component: BlogViewComponent, pathMatch: "full" },
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
