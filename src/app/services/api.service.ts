import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/register';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _jsonURL = 'http://localhost:5000/users';
  accounts:any = [];
  hotel:any = [];

  private accountNum: any = (Number(localStorage.getItem("userKey"))+1);
  private accountInfoURL = 'http://localhost:5000/users/'+ this.accountNum;

  private _hotelURL = 'http://localhost:5000/furtelHome';

  constructor( private http: HttpClient) { 
    // this.getJSON().subscribe(data => {
    //   console.log(data);
    //  });
  }
  // apiUrl = 'jdbc:mysql://localhost:3306/airpetsusers';

  // getAllData():Observable<any> {
  //   return this._http.get(`${this.apiUrl}`);
  // }

  // test
  // public getJSON() {
  //   return this.http.get(this._jsonURL).subscribe((res) => {
  //     return res;
  //   });
  // }
  getAccounts(){
    return this.http.get(this._jsonURL);
  }

  addAccount(newAcc: any){
    return this.http.post(this._jsonURL, newAcc, httpOptions);
  }

  userAccount(i: number){
    return this.getAccounts().subscribe((accounts:any) => {
      this.accounts = accounts[i];
    })
  }



  getUserLoggedAccount(){
    return this.http.get(this.accountInfoURL);
  }

  editInfo(newInfo: any){
    this.accounts.push(newInfo);
    return this.http.put(this.accountInfoURL, newInfo);
  }


  getHotels(){
    return this.http.get(this._hotelURL);
  }
  getHotelClicked(i:number){
    return this.getHotels().subscribe((hotel:any) => {
      this.hotel = hotel[i];
    })
  }

  // public writeJSON() {
  //   return this._http.post
  // }

  // getUserData(username:any, password:any){
  //   return this.http.get('http://localhost:8080/user/'+username+'/'+password);
  // }

  // logout(username:any, password:any){
  //   return this.http.delete('http://localhost:8080/user/'+username+'/'+password);
  // }
}
