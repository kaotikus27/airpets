import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsuccessComponent } from './booking/bookingsuccess/bookingsuccess.component';
import { HotelpreviewComponent } from './booking/hotelpreview/hotelpreview.component';
import { HotelrequestComponent } from './booking/hotelrequest/hotelrequest.component';
import { AuthGuard } from './guards/auth.guard';
import { CctvComponent } from './pages/cctv/cctv.component';
import { LoginComponent } from './pages/login/login.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WishlistsComponent } from './pages/wishlists/wishlists.component';
import { AirpethomeComponent } from './serviceownerregister/airpethome/airpethome.component';
import { BecomehostComponent } from './serviceownerregister/becomehost/becomehost.component';
import { BecomemahostComponent } from './serviceownerregister/becomemahost/becomemahost.component';
import { TestComponent } from './test/test/test.component';
import { FacilitydashboardComponent } from './user_pages/facilitydashboard/facilitydashboard.component';
import { UsermainpageComponent } from './user_pages/usermainpage/usermainpage.component';

const routes: Routes = [
  {path: 'yawa', component: TestComponent},
  {path: 'dashboard', component: FacilitydashboardComponent},
  {path: '', component: MainpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'wishlists', component: WishlistsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user', component: UsermainpageComponent, canActivate: [AuthGuard]},
  {path: 'airpets-your-home', component: AirpethomeComponent},
  {path: 'become-a-host', component: BecomehostComponent},

  {path: ':transactionId/view-cctv', component: CctvComponent},
  
  {path: ':name', component: HotelpreviewComponent},
  {path: ':name/payment', component: HotelrequestComponent},
  {path: ':name/book-success', component: BookingsuccessComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
