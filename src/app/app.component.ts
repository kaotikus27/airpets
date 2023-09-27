import { Component, getPlatform, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { UserserviceService } from './services/userservice.service';
import { FooterOtherpageComponent } from './static_components/footer-otherpage/footer-otherpage.component';
import { HeaderComponent } from './static_components/header/header.component';
import { HostListener } from '@angular/core';
import { UserapiService } from './services/userapi.service';
import { Users } from './models/users';
import { OtherServiceService } from './services/other-service.service';
import { LocationStrategy, PlatformLocation } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('header')
  head!: HeaderComponent;
  @ViewChild('footer')
  footer!: FooterOtherpageComponent;

  title = 'AirPets';
  mainpageAndMobile = true;

  bodyStyle: string = '';

  page: any;

  marginTop: String = "";

  //test
  //users: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiURL: ApiService,
    private userservice: UserserviceService,
    private activatedRoute: ActivatedRoute,
    private userApi: UserapiService,
    private otherService: OtherServiceService,
    private location: PlatformLocation,
    private location2: LocationStrategy) {

    location.onPopState(function(event:any) {
      if (localStorage.getItem("page") == "HotelrequestComponent") {
        // if(event){
        //   event.preventDefault();
        //   Swal.fire({
        //     text: "Your data will be lost"
        //   })
        // }
        alert("Your data will be lost");
      }
    })

    // window.history.pushState({
    //   page: 0
    // }, "", "");
    // history.back();
    // $(document).on('load', function()){
    // window.onpopstate = function (event) {
    //   history.forward();
    //   if (event) {
    //     event.preventDefault();
    //     Swal.fire({
    //       title: "This action will terminate your ongoing test and you wont be able to attempt the test",
    //       text: "Do you still want to continue",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonText: 'Yes',
    //       cancelButtonText: 'No',
    //       allowOutsideClick: false
    //     }).then((result) => {
    //       // if (result.dismiss != 'cancel') {
    //       //   window.location.href = "tests.php";
    //       // }
    //       console.log(result);
    //     });
    //   }
    // }
    // }

    // window.onpopstate = function(event){
    //   if (localStorage.getItem("page") == "HotelrequestComponent") {
    //     if(event){
    //       event.preventDefault();
    //       Swal.fire({
    //         text: "Your data will be lost"
    //       }).then((result) => {
    //         console.log(result);
    //         console.log(window.location.pathname.replace('/', ''))
    //       }).finally(

    //       )
    //     }
    //   }
    // }
    // if (localStorage.getItem("page") == "HotelrequestComponent") {

    //   // history.pushState(null, '', window.location.href);
    //   this.location2.onPopState(() => {
    //     Swal.fire({
    //       text: "Your data will be lost"
    //     })
    //     history.pushState(null, '', window.location.href);
    //   });
    // }


  }

  ngOnInit(): void {
    // console.log("isLoggedIn: "+(localStorage.getItem("isLoggedIn")));
    // console.log("userKey: "+ (localStorage.getItem("userKey")));

  }

  ngAfterViewInit(): void {
    let logged: any = sessionStorage.getItem("isLoggedIn");
    if (this.page != null) {
      this.head.mobileView(this.page);
      this.head.onLogInOut(logged);
      localStorage.setItem("page", this.page);
      this.head.onViewPages(this.page);
      //localStorage.setItem("isLoggedIn", logged);
      //console.log(localStorage.getItem("page"));
      //this.footer.mobileView(this.page);
    }
  }

  onActivate($event: any) {
    let state = $event.constructor.name;
    this.page = state;
    if (state != "MainpageComponent" && state != "WishlistsComponent" && state != "LoginComponent" && state != "SignupComponent") {
      this.mainpageAndMobile = false;
      // this.bodyStyle = '';
    } else {
      this.mainpageAndMobile = true;
      // this.bodyStyle = 'mobile';
    }

    if (state == "AirpethomeComponent") {
      this.bodyStyle = "airpet";
    } else {
      this.bodyStyle = "";
    }

    if (state != "HotelrequestComponent" && state != "BookingsuccessComponent") {
      sessionStorage.removeItem("booking");
    }

    let user: any = {};
    if (sessionStorage.getItem("userId") != null) {
      this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data: Users[]) => {
        user = data;

        sessionStorage.setItem("airpets", user.airpets);
      })
      // this.marginTop = "logged";
    }

    if (state != "BookingsuccessComponent") {
      sessionStorage.removeItem("transactionId");
    }

    if (state != "MainpageComponent") {
      this.otherService.newEvent('');

      this.head.searchLoc = '';
    }
  }

}
