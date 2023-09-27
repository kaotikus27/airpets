import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api.service';
import { UserapiService } from 'src/app/services/userapi.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  labels: string[] = ['Username', 'Email Address', 'Password', 'Retype Password', '', 'First Name', 'Last Name']
  inputReg: any[] = ['', '', '', '', false, '', ''];
  error: string[] = [];
  errorMessage: boolean = false;
  errorAgree: string = '';

  accounts: any = [];

  userUUid!: String;

  passwordView: string = 'password';
  passwordText: string = 'visibility';

  constructor(private router: Router, private apiURL: ApiService, private userApi: UserapiService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      this.router.navigate(['/'])
    }
    this.accounts = this.apiURL.getAccounts().subscribe((accounts: any) => {
      this.accounts = accounts;
    })
  }

  onInputReg(i: number) {
    this.error[i] = '';
    this.errorAgree = '';
  }

  onSubmit() {
    // let validReg = 'notValid';

    //   for(let a = 0; a < this.inputReg.length; a++){
    //     if(this.inputReg[a].length < 1){
    //       this.error[a] = this.labels[a] + " is required";
    //     }
    //   }
    //   if(this.inputReg[0].match(/^[a-z0-9]+$/i)){
    //     this.error[0] = "Username should be alphanumeric"
    //   }
    //   if (this.inputReg[2].match(/^[a-z0-9]+$/i)){
    //     this.error[2] = "Password should be alphanumeric";
    //   }
    //   if(this.inputReg[2] != this.inputReg[3]){
    //     this.error[3] = "Password should match"
    //   }
    //   if(this.inputReg[4] == false){
    //     this.errorAgree = "errorAgree";
    //   }
    //   this.errorMessage = true;

    //   //console.log(this.error);
    //   //console.log(this.errorMessage);

    //   for(let i = 0; i < this.error.length; i++){
    //     if(this.error[i] == ''){
    //       validReg = 'valid';
    //     } else{
    //       validReg = 'notValid';
    //     }
    //   }
    //   if(this.inputReg[4] == false){
    //     validReg = 'notValid';
    //   }

    //   if(validReg == 'valid'){
    //     const username = this.inputReg[0];
    //     const email = this.inputReg[1];
    //     const password = this.inputReg[2];
    //     const agree = this.inputReg[4];
    //     console.log(username, email, password, agree);
    //   }

    // let validReg = 'notValid';
    //   let errorTotal = 0;

    //   for(let a = 0; a < this.inputReg.length; a++){
    //     if(this.inputReg[a].length < 1){
    //       this.error[a] = this.labels[a] + " is required";
    //       this.errorMessage = true;
    //     }
    //   }
    //   if(this.inputReg[0].match(/^[a-z0-9]+$/i)){
    //     this.error[0] = "Username should be alphanumeric"
    //     this.errorMessage = true;
    //   }
    //   if (this.inputReg[2].match(/^[a-z0-9]+$/i)){
    //     this.error[2] = "Password should be alphanumeric";
    //     this.errorMessage = true;
    //   }
    //   if (this.inputReg[2].length < 8){
    //     this.error[2] = "Password should be at least 8 characters long";
    //     this.errorMessage = true;
    //   }
    //   if(this.inputReg[2] != this.inputReg[3]){
    //     this.error[3] = "Password should match"
    //     this.errorMessage = true;
    //   }
    //   if(this.inputReg[4] == false){
    //     this.errorAgree = "errorAgree";
    //     this.errorMessage = true;
    //     ++errorTotal;
    //   }
    //   for(let i = 0; i < this.error.length; i++){
    //     if(this.error[i] != ''){
    //       ++errorTotal;
    //     }
    //   }
    //   if(this.inputReg[4] == false){
    //     validReg = 'notValid';
    //   }

    //   if(errorTotal == 0){
    //     const newAcc = {
    //       name : this.inputReg[0],
    //       username : this.inputReg[0],
    //       email : this.inputReg[1],
    //       password : this.inputReg[2],
    //       furtel : false
    //     }
    //     for(let a = 0; a < this.accounts.length; a++){
    //       if(newAcc.email == this.accounts[a].email){
    //         alert("Email already in use");
    //         return;
    //       }
    //       if(newAcc.username == this.accounts[a].username){
    //         alert("Username already in use");
    //         return;
    //       }
    //     }
    //     console.log(newAcc.email);
    //     this.apiURL.addAccount(newAcc).subscribe((account:any) =>{
    //       this.accounts.push(account);
    //     });
    //     alert("Registered Successfully");
    //     this.inputReg = ['', '', '', '', false];
    //     this.router.navigate(['/login']);
    //   }

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
      // ++errorTotal;
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
      // let usercheck:any;
      let usersAll: any = this.userApi.getAllUser().subscribe((users: Users[]) => {
        usersAll = users;
        console.log(users[0]);
        console.log(users.length);
        // usersNum = users.length;
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
      // let userCheck:any = this.userApi.getUser(newAcc.emailAddress, newAcc.password).subscribe((data:any) => {
      //   userCheck = data;
      // })

      this.userApi.getAllUser().subscribe((users: Users[]) => {
        let userAllCheck = users;
        let validUser = true;

        for (let i = 0; i < userAllCheck.length; i++) {
          // if (newAcc.emailAddress == userAllCheck[i].emailAddress || newAcc.userName == userAllCheck[i].userName) {
          //   if (newAcc.emailAddress == userAllCheck[i].emailAddress) {
          //     alert("Email already in use");
          //     validUser = false;
          //     return;
          //   }
          //   if (newAcc.userName == userAllCheck[i].userName) {
          //     alert("Username already in use");
          //     validUser = false;
          //     return;
          //   }
          // }
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

        // if (validUser == true) {
        //   this.userApi.registerUser(newAcc).subscribe();
        //   alert("Registered Successfully");
        //   // this.modal = false
        //   this.inputReg = ['', '', '', '', false];
        // }
        if (validUser == true) {
          this.userApi.registerUser(newAcc).subscribe(() => {
            Swal.fire({
              text: 'Successfully Registered!',
              width: 300,
              icon: 'success',
            }).then(function() {
              window.location.href = "/";
            });
          });
          this.inputReg = ['', '', '', '', false];
        }
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
