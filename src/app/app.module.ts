import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { DropzoneModule } from "ngx-dropzone-wrapper";
import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./components/home/home.module";
import { SharedModule } from "./components/shared/shared.module";
import { BlogViewModule } from "./components/blog-view/blog-view.module";
import { CoachingViewModule } from "./components/coaching-view/coaching-view.module";
import { MyStoryViewModule } from "./components/my-story-view/my-story-view.module";
import { BlogService } from "./services/blog.service";
import { ApiService } from "./services/api.service";
import { BlogListModule } from "./components/shared/blog-list/blog-list.module";
import { BlogPostViewModule } from "./components/blog-post-view/blog-post-view.module";
import { AdminViewModule } from "./components/admin/admin-view/admin-view.module";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { LoginViewModule } from "./components/login-view/login-view.module";
import { environment } from "src/environments/environment";
import { Constants } from "./config/constants";
import { AdminGuard } from "./guards/admin.guard";
import { ConfigService } from "./services/config.service";
import { WorkViewModule } from "./components/work-view/work-view.module";
import { BlogPostCreatorModule } from "./components/admin/blog-post-creator/blog-post-creator.module";
import { UserGroupService } from "./services/userGroup.service";
import { SubscribeDialogModule } from "./components/shared/subscribe-dialog/subscribe-dialog.module";

const BASE_URL = environment.production
  ? Constants.API_HOST_PROD
  : Constants.API_HOST_LOCAL;

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: `${BASE_URL}/image`,
  maxFilesize: 50,
  acceptedFiles: "image/*"
};

export function configServiceFactory(service: ConfigService) {
  return () => service.initConfig();
}

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
    LoginViewModule,
    WorkViewModule,
    SubscribeDialogModule
  ],
  exports: [],
  providers: [
    ApiService,
    BlogService,
    AuthGuard,
    AdminGuard,
    AuthService,
    ConfigService,
    UserGroupService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
