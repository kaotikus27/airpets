import { Component, HostListener, Input, OnInit, resolveForwardRef, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Register } from 'src/app/models/register';
import { UserapiService } from 'src/app/services/userapi.service';
import { Users } from 'src/app/models/users';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { OtherServiceService } from 'src/app/services/other-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public subscription!: Subscription;
  modal: boolean = false;
  labels: string[] = ['Username', 'Email Address', 'Password', 'Retype Password', '', 'First Name', 'Last Name']
  error: string[] = [];
  selection: string[] = ['active', 'not-active'];
  login: boolean = true;
  headerTitle: string = "LOGIN";
  errorMessage: boolean = false;
  errorAgree: string = '';
  getData!: number;
  main: boolean = true;
  moreFilter: boolean = true;
  modalforgotpass: boolean = false;
  errorMessageforgot: boolean = false;
  emailForgot: string = "";
  errorForgot: string = "Email Adress is required";

  //top tab
  tabs: any[] = [
    { "name": "House", "img": "../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Hotels", "img": "../assets/icons/apartment_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Apartments", "img": "../assets/icons/domain_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Clinic", "img": "../assets/icons/pets_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Sitter", "img": "../assets/icons/sound_detection_dog_barking_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Hotel with Pool", "img": "../assets/icons/water_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Villa", "img": "../assets/icons/villa_FILL0_wght400_GRAD0_opsz48.svg" }]
  active: any[] = ['not-active', 'not-active', 'not-active', 'not-active', 'not-active', 'not-active', 'not-active'];

  // header-mobile
  mobileMenus: any[] = [
    { "name": "Explore", "img": "../assets/icons/search_FILL0_wght400_GRAD0_opsz48.svg", "link": "/" },
    { "name": "Wishlists", "img": "../assets/icons/favorite_FILL0_wght400_GRAD0_opsz48.svg", "link": "/wishlists" },
    { "name": "Log in", "img": "../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg", "link": "/login" }];
  mobileBtn: any[] = ['not-select', 'not-select', 'not-select'];
  mobileViewDisplay: string = "visible";
  mobileDispAsideFromMain: string = "displayed";
  mobileDispAsideFromMainMiddleNav: string = "displayed-nav";
  headerOther: string = "not-displayed";
  headerNotMain: string = '';
  airpet: any = { name: "AirPets your Home", link: "airpets-your-home" };

  // on login
  modalLogged = false;

  // inputs
  inputLogin: any = {};
  inputReg: any[] = ['', '', '', '', false, '', ''];

  inputStoreReg: any = {};

  name: string = 'Haha';
  currentUser$!: boolean;

  accounts: any = [];
  // Users!: Users[];
  user: any = [];

  userUUid!: String;


  userInfoForgot: any = {};

  userLogged: any = {};
  profpic: String = '../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg';

  searchLoc: string = '';


  passwordView: string = 'password';
  passwordText: string = 'visibility';

  constructor(private router: Router, private userApi: UserapiService, private apiURL: ApiService, private activatedRoute: ActivatedRoute,
    private otherService: OtherServiceService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
    })

    otherService.getActionChangeProfPic().subscribe((event:any) => {
      this.profpic = event;
    });
  }

  ngOnInit(): void {
    let state = sessionStorage.getItem('isLoggedIn')
    let page = localStorage.getItem('page');

    if (sessionStorage.getItem("userId") != null) {
      this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data: Users[]) => {
        this.user = data;

        if (this.user.airpets == "false") {
          this.airpet.name = "AirPets your Home";
          this.airpet.link = "airpets-your-home";
        } else if (this.user.airpets == "true") {
          this.airpet.name = "Visit Dashboard";
          this.airpet.link = "dashboard";
        }
      })
    }

    if (page == "BecomehostComponent") {
      this.airpet.name = "Back to Home";
      this.airpet.link = "";
    }

    if (state == 'true') {
      this.currentUser$ = true;
    }

    // if(page != "MainpageComponent"){
    //   this.moreFilter = false;
    // }

    // console.log(state);

    // this.apiURL.getAccounts().subscribe((accounts) => {
    //   this.accounts = accounts;
    // });
    this.userApi.getAllUser().subscribe((users: Users[]) => {
      // console.log(users);
    })

    if (state == "true" && page == 'MainpageComponent') {
      this.mobileMenus[2].name = "Profile";
      this.mobileMenus[2].link = "/user";
      this.currentUser$ = true;
    } else if (state != "true" && page == 'MainpageComponent') {
      this.mobileMenus[2].name = "Log in";
      this.mobileMenus[2].link = "/login";
    }

    this.getUser();

  }

  async getUser(){
    // await new Promise(f => setTimeout(f, 500));
    if(sessionStorage.getItem("userId")){
      this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data:Users[]) => {
        this.userLogged = data;
  
        if(this.userLogged.imgUrl == null){
          this.profpic = "../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
        }else{
          this.profpic = `../uploads/${this.userLogged.imgUrl}`;
        }
      })
    }
  }

  onViewPages(page: string) {
    if (page == "BecomehostComponent") {
      this.airpet.name = "Back to Home";
      this.airpet.link = "";
    } else {
      if (this.user.airpets == "false") {
        this.airpet.name = "AirPets your Home";
        this.airpet.link = "airpets-your-home";
      } else if (this.user.airpets == "true") {
        this.airpet.name = "Visit Dashboard";
        this.airpet.link = "dashboard";
      }
    }

    if (page != "MainpageComponent") {
      this.moreFilter = false;
    } else {
      this.moreFilter = true;
    }

  }

  onClick(i: any) {
    if (i == 0) {
      this.modal = true;
      //console.log(this.accounts);
    } else if (i == 1) {
      this.modal = false;
      this.login = true;
      this.selection = ['active', 'not-active'];
      this.inputLogin = ['', '', false];
      this.inputReg = ['', '', '', '', false, '', ''];
      this.error = [];
      this.errorAgree = '';
    } else if (i == 2) {
      this.modalforgotpass = true;
      this.modal = false;
    } else if (i == 3) {
      this.login = true;
      this.selection = ['active', 'not-active'];
      this.headerTitle = "LOGIN";
    } else if (i == 4) {
      this.modalforgotpass = false;
      this.emailForgot = "";
      this.errorMessageforgot = false;
    }


    // var username = this.inputLogin.username;
    // var password = this.inputLogin.password;
    // var remember = this.inputLogin.remember;
    // this.apiURL.getUserData(username,password).subscribe((res:any)=>{
    //   res = false;
    // });
    // this.apiURL.getUserData(username,password).subscribe((res:any)=>{
    //   this.getData = res;
    // });
    // const username = this.inputStoreLogin.username;
    // const password = this.inputLogin.password;
    // this.apiURL.getUserData(username, password).subscribe((res:any) =>{
    //   this.getData = res;
    // });
    //this.getData = 0;
    // console.log(username, password)
    // console.log("isLoggedIn: "+(localStorage.getItem("isLoggedIn")));
    // console.log(this.getData);

  }

  onClickSelection(i: any) {
    if (i == 0) {
      this.selection = ['active', 'not-active'];
      this.login = true;
      this.headerTitle = "LOGIN";
      for (let i = 0; i < this.inputReg.length; i++) {
        if (i != 4) {
          this.inputReg[i] = '';
        } else {
          this.inputReg[i] = false;
        }
      }
      for (let i = 0; i < this.error.length; i++) {
        this.error[i] = '';
      }
      this.errorAgree = '';

      this.passwordView = 'password';
      this.passwordText = 'visibility';
    } else if (i == 1) {
      this.selection = ['not-active', 'active'];
      this.login = false;
      this.headerTitle = "SIGN UP";
      this.inputLogin = {};

      this.passwordView = 'password';
      this.passwordText = 'visibility';
    }
  }

  onInputReg(i: number) {
    this.error[i] = '';
    this.errorAgree = '';
  }

  onSubmit(i: any) {
    if (i == 0) {
      var userName = this.inputLogin.username;
      var password = this.inputLogin.password;
      var remember = this.inputLogin.remember;
      if (this.inputLogin.username != '' && this.inputLogin.username && this.inputLogin.password != '' && this.inputLogin.password) {
        console.log(userName, password, remember);

        this.userApi.getAllUser().subscribe((users: Users[]) => {
          let userAll = users;

          for (let i = 0; i < userAll.length; i++) {
            if (userName == userAll[i].userName || userName == userAll[i].emailAddress) {
              if (password == userAll[i].password) {
                sessionStorage.setItem('isLoggedIn', "true");
                this.currentUser$ = true;
                // alert("Successfully Logged in")
                Swal.fire({
                  text: 'Successfully Logged in!',
                  width: 300,
                  icon: 'success',
                  // confirmButtonColor: '#4BB543',
                  showConfirmButton: false,
                  timer: 2000,
                  allowOutsideClick: false
                }).then(function() {
                  window.location.href = "/";
                });
                this.modal = false;
                this.inputLogin = {};
                sessionStorage.setItem("userId", userAll[i].userId.toString());
                this.mobileMenus[2].name = "Profile";
                this.mobileMenus[2].link = "/user";
                console.log(userAll[i].airpets);
                if (userAll[i].airpets == "false") {
                  this.airpet.name = "AirPets your Home";
                  this.airpet.link = "airpets-your-home";
                } else if (userAll[i].airpets == "true") {
                  this.airpet.name = "Visit Dashboard";
                  this.airpet.link = "dashboard";
                }
                // this.router.navigate(['/'])
                return;
              } else {
                Swal.fire({
                  text: "Wrong password!",
                  icon: "error",
                  confirmButtonColor: "#BB00B4"
                })
                return;
              }
            }
          }
          Swal.fire({
            text: "User not found!",
            icon: "error",
            confirmButtonColor: "#BB00B4"
          })
          return;
        })
        //this.userservice.onLogin(username, password);

        // this.apiURL.getUserData(username,password).subscribe((res:any)=>{
        //   this.getData = res;

        //   console.log(res);
        //   if(this.getData == 1){
        //     localStorage.setItem('isLoggedIn', "true");

        //     console.log("isLoggedIn: "+(localStorage.getItem("isLoggedIn")));
        //     this.currentUser$ = true;
        //     alert("Successfully Logged in");
        //     //res = 0;
        //   } else{
        //     alert("User not found!");
        //   }
        // })
        //console.log(this.accounts[2].username)

        // for(let i = 0; i < this.accounts.length; i++){
        //   if(username == this.accounts[i].username || username == this.accounts[i].email){
        //     if(password == this.accounts[i].password){
        //       localStorage.setItem('isLoggedIn', "true");
        //       this.currentUser$ = true;
        //       alert("Successfully Logged in")
        //       this.modal = false;
        //       this.inputLogin = {};
        //       localStorage.setItem("userKey", i.toString());
        //       this.apiURL.userAccount(i);
        //       this.mobileMenus[2].name = "Profile";
        //       this.mobileMenus[2].link = "/user";
        //       return;
        //     } else{
        //       alert("Wrong password");
        //     }
        //   }
        // }
        // alert("User not found!");
        // return;
      } else{
        Swal.fire({
          text: "Fill up the necessary fields!",
          icon: "error",
          confirmButtonColor: "#BB00B4"
        })
        return;
      }
    } else if (i == 1) {
      let validReg = 'Valid';
      let errorTotal = 0;


      for (let a = 0; a < this.inputReg.length; a++) {
        if (this.inputReg[a].length < 1) {
          this.error[a] = this.labels[a] + " is required";
          this.errorMessage = true;
        }
      }
      if (this.inputReg[0].match(/^[a-z0-9]+$/i)) {
        this.error[0] = "Username should be alphanumeric"
        this.errorMessage = true;
      }
      if(!this.inputReg[1].match(/^(?=.{1,81}$)[\w\.-]+@[\w\.-]+\.\w{2,4}$/) && this.inputReg[1].length != 0){
        this.error[1] = "Please input correct email format";
        this.errorMessage = true;
      }
      if (this.inputReg[2].match(/^[a-z0-9]+$/i)) {
        this.error[2] = "Password should be alphanumeric";
        this.errorMessage = true;
      }
      if (this.inputReg[2].length < 8) {
        this.error[2] = "Password should be at least 8 characters long";
        this.errorMessage = true;
      }
      if (this.inputReg[2] != this.inputReg[3]) {
        this.error[3] = "Password should match"
        this.errorMessage = true;
      }
      if (this.inputReg[4] == false) {
        this.errorAgree = "errorAgree";
        this.errorMessage = true;
      }
      if(!this.inputReg[5].match(/^[a-zA-Z]+$/) && this.inputReg[5].length != 0){
        this.error[5] = "Firstname should only contain letters";
        this.errorMessage = true;
      }
      if(!this.inputReg[6].match(/^[a-zA-Z]+$/) && this.inputReg[6].length != 0){
        this.error[6] = "Lastname should only contain letters";
        this.errorMessage = true;
      }
      for (let i = 0; i < this.error.length; i++) {
        if (this.error[i] != '') {
          ++errorTotal;
        }
      }
      console.log(errorTotal);
      if (this.inputReg[4] == false) {
        validReg = 'notValid';
      }


      if (errorTotal == 0 && validReg == 'Valid') {
        let usersAll: any = this.userApi.getAllUser().subscribe((users: Users[]) => {
          usersAll = users;
        })
        var newAcc = {
          userId: uuidv4(),
          firstName: this.inputReg[5],
          lastName: this.inputReg[6],
          userName: this.inputReg[0],
          emailAddress: this.inputReg[1],
          password: this.inputReg[2],
          airpets: false
        }
        this.userApi.getAllUser().subscribe((users: Users[]) => {
          let userAllCheck = users;
          let validUser = true;

          for (let i = 0; i < userAllCheck.length; i++) {
            if (newAcc.emailAddress == userAllCheck[i].emailAddress || newAcc.userName == userAllCheck[i].userName) {
              if (newAcc.emailAddress == userAllCheck[i].emailAddress) {
                Swal.fire({
                  text: "Email already in use",
                  icon: "warning",
                  confirmButtonColor: "#BB00B4"
                })
                validUser = false;
                return;
              }
              if (newAcc.userName == userAllCheck[i].userName) {
                Swal.fire({
                  text: "Username already in use",
                  icon: "warning",
                  confirmButtonColor: "#BB00B4"
                })
                validUser = false;
                return;
              }
            }
          }

          if (validUser == true) {
            this.userApi.registerUser(newAcc).subscribe(() => {
              Swal.fire({
                text: 'Successfully Registered!',
                width: 300,
                icon: 'success',
                // confirmButtonColor: '#4BB543',
                // showConfirmButton: false,
                // timer: 2000,
                // allowOutsideClick: false
              }).then(function() {
                window.location.href = "/";
              });
            });
            this.modal = false
            this.inputReg = ['', '', '', '', false];
          }
        })
      }
    } else if (i == 2) {
      console.log(this.emailForgot.length);
      if (this.emailForgot.length != 0) {
        this.userApi.getUserByEmail(this.emailForgot).subscribe(async (data: Users[]) => {
          this.userInfoForgot = data;

          if (this.userInfoForgot != null) {
            console.log(this.userInfoForgot);

            var forgotPassInfo = {
              name: `${this.userInfoForgot.firstName} ${this.userInfoForgot.lastName}`,
              email: `${this.userInfoForgot.emailAddress}`
            }
            console.log(forgotPassInfo);

            this.subscription = this.userApi.sendEmail(forgotPassInfo).subscribe((data: any) => {
              let msg = data
              console.log("password: ", msg.password);
              this.userInfoForgot.password = msg.password;
              console.log(this.userInfoForgot);

              this.userApi.registerUser(this.userInfoForgot).subscribe(() => {
                this.modalforgotpass = false;
                Swal.fire({
                  text: msg.message,
                  icon: "success",
                  confirmButtonColor: "#BB00B4"
                })
              });
            });

          } else {
            this.errorForgot = "Email does not exist";
            this.errorMessageforgot = true;
          }

        })
      } else if (this.emailForgot.length == 0) {
        this.errorMessageforgot = true;
        this.errorForgot = "Email Adress is required";
      }
    }
  }

  onInputForgotPass() {
    if (this.emailForgot.length != 0) {
      this.errorMessageforgot = false;
    }
  }


  // mobile-menu
  onSelectMobileBtn(i: any) {
    for (let a = 0; a < this.mobileBtn.length; a++) {
      this.mobileBtn[a] = "not-select";
      if (a == i) {
        this.mobileBtn[i] = "select";
      }
    }
  }

  mobileView(a: any) {
    console.log(a);
    if (a != 'MainpageComponent' || a != 'LoginComponent' || a != 'WishlistsComponent' || a != 'SignupComponent' && a != null) {
      this.mobileViewDisplay = "visible";
    } else {
      this.mobileViewDisplay = "not-visible";
    }

    if (a == "AirpethomeComponent") {
      this.main = false;
    } else {
      this.main = true;
    }

    if (a == 'MainpageComponent' && this.mobileViewDisplay == "visible") {
      this.mobileBtn = ["select", "not-select", "not-select"];
      this.mobileDispAsideFromMain = "displayed";
      this.mobileDispAsideFromMainMiddleNav = "displayed-nav";
      this.headerOther = "not-displayed";
    } else if (a == 'WishlistsComponent' && this.mobileViewDisplay == "visible") {
      this.mobileBtn = ["not-select", "select", "not-select"];
      this.mobileDispAsideFromMain = "not-displayed";
      this.headerOther = "displayed";
      this.mobileDispAsideFromMainMiddleNav = "not-displayed";
      this.headerNotMain = "Wishlist";
    } else if (a == 'LoginComponent' || a == 'SignupComponent' || a == 'UsermainpageComponent' && this.mobileViewDisplay == "visible") {
      this.mobileBtn = ["not-select", "not-select", "select"];
      this.mobileDispAsideFromMain = "not-displayed";
      this.mobileDispAsideFromMainMiddleNav = "not-displayed";
      this.headerOther = "displayed";
      if (a == 'LoginComponent' || a == 'SignupComponent') {
        this.headerNotMain = "Log in or Sign up";
      } else {
        this.headerNotMain = "Profile";
      }
    } 
    // else if(this.mobileViewDisplay != "visible"){
    //   this.headerOther = "not-displayed";
      
    // }

    if (a == "BecomehostComponent") {
      this.airpet.name = "Back to Home";
      this.airpet.link = "";
    } else {
      this.airpet.name = "AirPets your Home";
      this.airpet.link = "airpets-your-home";
    }
  }

  onLogInOut(i: any) {
    // console.log(i);
    if (i == "true") {
      this.mobileMenus[2].name = "Profile";
      this.mobileMenus[2].link = "/user";
      this.currentUser$ = true;
    } else {
      this.mobileMenus[2].name = "Log in";
      this.mobileMenus[2].link = "/login";
    }
  }

  // mobile-navbar transition effect
  currentPosition: any = [];
  @HostListener('window:scroll') getScrollHeight() {
    this.currentPosition.push(window.pageYOffset)
    if (this.currentPosition.length == 3) {
      this.currentPosition.shift();
    }
    // console.log(this.currentPosition);
    // console.log(window.pageYOffset);
    if (this.currentPosition[0] < this.currentPosition[1])
      this.mobileViewDisplay = "not-visible";
    else
      this.mobileViewDisplay = "visible";
  }

  // onLogin(event:any){
  //   event.preventDefault();
  //   const target = event.target;
  //   const username = target.querySelector('#username').value;
  //   const password = target.querySelector('#password').value;
  //   const remember = target.querySelector('#remember').value;
  //   console.log(username, password, remember);
  // }



  onClickLogged(i: number) {
    if (i == 0) {
      this.modalLogged = true;
    } else if (i == 1) {
      this.modalLogged = false;
    }
    //this.currentUser$ = Boolean(i);
    // console.log(this.currentUser$)
  }

  onSelectUserBox(i: number) {
    if (i == 0) {
      this.router.navigate(['/user']);
      this.modalLogged = false;
    } else if (i == 1) {
      this.router.navigate(['/wishlists']);
      this.modalLogged = false;
    } else if (i == 2) {
      this.modalLogged = false;
      this.currentUser$ = false;
      this.airpet.name = "AirPets your Home";
      this.airpet.link = "airpets-your-home";
      // localStorage.removeItem("isLoggedIn");
      // localStorage.removeItem("userKey");
      this.userApi.onLogOut();
      // alert("Successfully logged out");
      // this.router.navigate(['']);
      this.mobileMenus[2].name = 'Log in';
      this.mobileMenus[2].link = '/login';
    }
  }

  onClickAirpet() {
    let page = localStorage.getItem('page');
    if (page == "BecomehostComponent") {
      this.airpet.name = "Back to Home";
      this.airpet.link = "";
    } else {
      this.airpet.name = "AirPets your Home";
      this.airpet.link = "airpets-your-home";
    }
  }

  visible: boolean = false

  onclick() {
    this.visible = !this.visible
  }



  // onBookNotLogged(){
  //   this.modal = true;
  // }


  sendMail() {
    // console.log(this.infoForm.value);
    this.userApi.getUserByEmail(this.emailForgot).subscribe((data: Users[]) => {
      this.userInfoForgot = data;
      console.log(this.userInfoForgot);
    })
    // var forgotPassInfo = {
    //   name: 
    // }
    // this.subscription = this.userApi.sendEmail(this.infoForm.value).
    // subscribe(data => {
    //   let msg = data['message']
    //   alert(msg);
    //   // console.log(data, "success");
    // }, error => {
    //   console.error(error, "error");
    // } );
  }


  onSearch() {
    console.log(this.searchLoc);
    // sessionStorage.setItem("searchLoc", this.searchLoc);
    this.otherService.newEvent(this.searchLoc);
  }

  passwordToggle(input:any){
    if(this.passwordView == 'password' && this.passwordText == 'visibility'){
      this.passwordView = 'text';
      this.passwordText = 'visibility_off';
    } else{
      this.passwordView = 'password';
      this.passwordText = 'visibility';
    }
  }
}


