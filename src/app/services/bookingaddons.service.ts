import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingaddonsService {
  // private petVet = "";
  // private petBath = "";
  // private petCCTV = "";
  // private petGroom = "";
  private bookAddons = {
    petVet : "false",
    petBath : "false",
    petCCTV : "false",
    petGroom : "false"
  };

  constructor() { }

  // storeValues(petVet:any, petBath:any, petCCTV:any, petGroom:any){
  //   this.petVet = petVet;
  //   this.petBath = petBath;
  //   this.petCCTV = petCCTV;
  //   this.petGroom = petGroom;
  // }

  storeVal(bookAddons:any){
    this.bookAddons["petVet"] = bookAddons["petVet"];
    this.bookAddons["petBath"] = bookAddons["petBath"];
    this.bookAddons["petCCTV"] = bookAddons["petCCTV"];
    this.bookAddons["petGroom"] = bookAddons["petGroom"];
  }

  getStoredVal(){
    return this.bookAddons;
  }

  setPetVet(petVet:any){
    this.bookAddons.petVet = petVet;
  }
  setPetBath(petBath:any){
    this.bookAddons.petBath = petBath;
  }
  setPetCCTV(petCCTV:any){
    this.bookAddons.petCCTV = petCCTV;
  }
  setPetGroom(petGroom:any){
    this.bookAddons.petGroom = petGroom;
  }

  // getPetVet(){
  //   return this.petVet;
  // }
  // getPetBath(){
  //   return this.petBath;
  // }
  // getPetCCTV(){
  //   return this.petCCTV;
  // }
  // getPetGroom(){
  //   return this.petGroom;
  // }

}
