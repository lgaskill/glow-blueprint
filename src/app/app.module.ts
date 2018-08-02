import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./home/home.module";
import { SharedModule } from "./shared/shared.module";
import { BlogViewModule } from "./blog-view/blog-view.module";

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
    BlogViewModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
