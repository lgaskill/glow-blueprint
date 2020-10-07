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
import { UserService } from "./services/user.service";
import { SubscribeDialogModule } from "./components/shared/subscribe-dialog/subscribe-dialog.module";
import { ProfileViewModule } from "./components/profile/profile-view/profile-view.module";
import { ContactInfoPanelModule } from "./components/profile/contact-info-panel/contact-info-panel.module";
import { HealthHistoryPanelModule } from "./components/profile/health-history-panel/health-history-panel.module";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";
import { GroupEnrollmentRegistrationViewModule } from "./components/group-enrollment-registration-view/group-enrollment-registration-view.module";
import { UserListModule } from "./components/admin/user-list/user-list.module";
import { WorkWithMeViewModule } from "./components/work-with-me-view/work-with-me-view.module";
import { DisclamerViewModule } from "./components/disclamer-view/disclamer-view.module";
import { PrivacyPolicyViewModule } from "./components/privacy-policy-view/privacy-policy-view.module";
import { TermsAndConditionsViewModule } from "./components/terms-and-conditions-view/terms-and-conditions-view.module";

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
    MyStoryViewModule,
    BlogListModule,
    BlogPostViewModule,
    AdminViewModule,
    DisclamerViewModule,
    PrivacyPolicyViewModule,
    TermsAndConditionsViewModule,
    LoginViewModule,
    SubscribeDialogModule,
    ProfileViewModule,
    ContactInfoPanelModule,
    HealthHistoryPanelModule,
    GroupEnrollmentRegistrationViewModule,
    UserListModule,
    WorkWithMeViewModule
  ],
  exports: [],
  providers: [
    ApiService,
    BlogService,
    AuthGuard,
    AdminGuard,
    CanDeactivateGuard,
    AuthService,
    ConfigService,
    UserService,
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
