import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {
  private dates = {};
  private night: number = 0;
  private guest = '';
  private add = [];
  private totalPrice: number = 0;
  private accomodation: number = 0;
  private comment: string = '';

  constructor() { }


  storeValues(price:number, dates:any, night:number, guest:any, add:any, totalPrice:number, comment:string){
    this.dates = dates;
    this.night = night;
    this.guest = guest;
    this.add = add;
    this.totalPrice = totalPrice;

    console.log(this.dates);

    this.accomodation = price * night;
    this.comment = comment;
  }

  getDates(){
    return this.dates;
  }
  getNight(){
    return this.night;
  }
  getGuest(){
    return this.guest;
  }
  getAdd(){
    return this.add;
  }
  getTotalPrice(){
    return this.totalPrice;
  }
  getAccomodation(){
    return this.accomodation;
  }
  getComment(){
    return this.comment;
  }


  putAdd(add:any){
    this.add = add;
  }
}
