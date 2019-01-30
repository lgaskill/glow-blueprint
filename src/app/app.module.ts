import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { BlogPostViewModule } from "./components/blog-post-view/blog-post-view.module";
import { AdminViewModule } from "./components/admin-view/admin-view.module";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { LoginViewModule } from "./components/login-view/login-view.module";

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
    BlogListModule,
    BlogPostViewModule,
    AdminViewModule,
    LoginViewModule
  ],
  exports: [],
  providers: [
    ApiService,
    BlogService,
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
