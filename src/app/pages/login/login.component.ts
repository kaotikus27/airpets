import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api.service';
import { UserapiService } from 'src/app/services/userapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // inputLogin: any[] = ['', '', false];
  inputLogin: any = {};

  passwordView: string = 'password';
  passwordText: string = 'visibility';

  // accounts: any = [];

  constructor(private router: Router, private apiURL: ApiService, private userApi: UserapiService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      this.router.navigate(['/']);
    }

    // this.apiURL.getAccounts().subscribe((accounts) => {
    //   this.accounts = accounts;
    // });
  }

  onSubmitLogin() {
    var userName = this.inputLogin.username;
    var password = this.inputLogin.password;
    var remember = this.inputLogin.remember;
    // if (this.inputLogin.username != '' && this.inputLogin.password != '') {
    //   console.log(userName, password, remember);

    //   this.userApi.getAllUser().subscribe((users: Users[]) => {
    //     let userAll = users;

    //     for (let i = 0; i < userAll.length; i++) {
    //       if (userName == userAll[i].userName || userName == userAll[i].emailAddress) {
    //         if (password == userAll[i].password) {
    //           sessionStorage.setItem('isLoggedIn', "true");
    //           // this.currentUser$ = true;
    //           alert("Successfully Logged in")
    //           // this.modal = false;
    //           this.inputLogin = {};
    //           // localStorage.setItem("userKey", i.toString());
    //           // this.apiURL.userAccount(i);
    //           this.router.navigate(['/user']);
    //           sessionStorage.setItem("userId", userAll[i].userId.toString());
    //           // this.mobileMenus[2].name = "Profile";
    //           // this.mobileMenus[2].link = "/user";
    //           return;
    //         } else {
    //           alert("Wrong password");
    //         }
    //       }
    //     }
    //     alert("User not found!");
    //     return;
    //   })
    // }
    if (this.inputLogin.username != '' && this.inputLogin.username && this.inputLogin.password != '' && this.inputLogin.password) {
      console.log(userName, password, remember);

      this.userApi.getAllUser().subscribe((users: Users[]) => {
        let userAll = users;

        for (let i = 0; i < userAll.length; i++) {
          if (userName == userAll[i].userName || userName == userAll[i].emailAddress) {
            if (password == userAll[i].password) {
              sessionStorage.setItem('isLoggedIn', "true");
              // this.currentUser$ = true;
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
              // this.modal = false;
              this.inputLogin = {};
              sessionStorage.setItem("userId", userAll[i].userId.toString());
              // this.mobileMenus[2].name = "Profile";
              // this.mobileMenus[2].link = "/user";
              console.log(userAll[i].airpets);
              // if (userAll[i].airpets == "false") {
              //   this.airpet.name = "AirPets your Home";
              //   this.airpet.link = "airpets-your-home";
              // } else if (userAll[i].airpets == "true") {
              //   this.airpet.name = "Visit Dashboard";
              //   this.airpet.link = "dashboard";
              // }
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
    }
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
