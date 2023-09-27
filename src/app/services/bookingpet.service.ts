import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingpetService {
  private petBreed = '';
  private petType = '';

  constructor() { }

  storeVal(petBreed:string, petType:string){
    this.petBreed = petBreed;
    this.petType = petType;
  }

  getPetBreed(){
    return this.petBreed;
  }
  getPetType(){
    return this.petType;
  }
}
