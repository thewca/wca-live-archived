import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CommonServicesModule } from './common-services/common-services.module';
import { CommonUiModule } from './common-ui/common-ui.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonServicesModule,
    CommonUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
