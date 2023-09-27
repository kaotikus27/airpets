import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { WebcamModule } from 'ngx-webcam';
// import {  } from '@googlemaps/google-maps-services-js';
// import { GoogleMapsModule } from '@angular/google-maps';
// import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './static_components/header/header.component';
import { FooterComponent } from './static_components/footer/footer.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterOtherpageComponent } from './static_components/footer-otherpage/footer-otherpage.component';
import { WishlistsComponent } from './pages/wishlists/wishlists.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { UsermainpageComponent } from './user_pages/usermainpage/usermainpage.component';
import { HotelpreviewComponent } from './booking/hotelpreview/hotelpreview.component';
import { AirpethomeComponent } from './serviceownerregister/airpethome/airpethome.component';
import { BecomehostComponent } from './serviceownerregister/becomehost/becomehost.component';
import { HotelrequestComponent } from './booking/hotelrequest/hotelrequest.component';
import { BookingsuccessComponent } from './booking/bookingsuccess/bookingsuccess.component';
import { TestComponent } from './test/test/test.component';
import { BecomemahostComponent } from './serviceownerregister/becomemahost/becomemahost.component';
import { FacilitydashboardComponent } from './user_pages/facilitydashboard/facilitydashboard.component';
import { CctvComponent } from './pages/cctv/cctv.component';
import { OtherServiceService } from './services/other-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    LoginComponent,
    FooterOtherpageComponent,
    WishlistsComponent,
    SignupComponent,
    UsermainpageComponent,
    HotelpreviewComponent,
    AirpethomeComponent,
    BecomehostComponent,
    HotelrequestComponent,
    BookingsuccessComponent,
    TestComponent,
    BecomemahostComponent,
    FacilitydashboardComponent,
    CctvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // GoogleMapsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    WebcamModule
  ],
  providers: [
    AuthGuard,
    OtherServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
