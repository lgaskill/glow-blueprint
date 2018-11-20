import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { BlogViewComponent } from "./components/blog-view/blog-view.component";
import { CoachingViewComponent } from "./components/coaching-view/coaching-view.component";
import { MyStoryViewComponent } from "./components/my-story-view/my-story-view.component";

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
