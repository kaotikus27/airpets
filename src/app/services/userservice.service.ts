import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  getData!:boolean;
  currentUser$!:boolean;

  accounts:any = [];

  constructor(private http: HttpClient, private apiURL: ApiService, private auth: AuthGuard) { }

  ngOnInit(){
    this.apiURL.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  // onLogin(username:string, password:string){
  //   this.apiURL.getUserData(username, password).subscribe((res:any) => {
  //     this.getData = res;
  //     console.log(res);

  //     if(this.getData = true){
  //       localStorage.setItem('isLoggedIn', "true");

  //       console.log("isLoggedIn: "+(localStorage.getItem("isLoggedIn")));

  //       alert("Successfully logged in");
  //     } else{
  //       alert("User not found!");
  //     }
  //   })
  // }

  // onLogout(){
  //   localStorage.setItem('isLoggedIn', "false");
  //   console.log("isLoggedIn: "+(localStorage.getItem("isLoggedIn")));
  // }


  //onRegister(newAcc:any){
    //console.log(this.accounts[1]);
    // for(let i = 0; i < this.accounts.length; i++){
    //   if(newAcc.email == this.accounts[i].email){
    //     alert('email already in use')
    //     return;
    //   }
    // }
    // this.apiURL.addAccount(newAcc).subscribe((account) => this.accounts.push(account));
  //}
}
