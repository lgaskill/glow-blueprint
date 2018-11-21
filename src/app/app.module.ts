import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./components/home/home.module";
import { SharedModule } from "./components/shared/shared.module";
import { BlogViewModule } from "./components/blog-view/blog-view.module";
import { CoachingViewModule } from "./components/coaching-view/coaching-view.module";
import { MyStoryViewModule } from "./components/my-story-view/my-story-view.module";
import { BlogService } from "./services/blog.service";
import { ApiService } from "./services/api.service";
import { BlogListModule } from "./components/blog-list/blog-list.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    // My awesome modules
    SharedModule,
    HomeModule,
    BlogViewModule,
    CoachingViewModule,
    MyStoryViewModule,
    BlogListModule
  ],
  exports: [],
  providers: [ApiService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
