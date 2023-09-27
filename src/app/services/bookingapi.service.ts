import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { BookingAddons } from '../models/booking-addons.model';
import { BookingInfo } from '../models/booking-info.model';
import { BookingPetInfo } from '../models/booking-pet-info.model';

@Injectable({
  providedIn: 'root'
})
export class BookingapiService {
  private apiURL = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  //Booking Info
  private bookingInfoURL = `${this.apiURL}`+"bookings/";
  getAllBookingInfo():Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`);
  }
  addBookingInfo(bookingInfo:any){
    return this.http.post(`${this.bookingInfoURL}`+"addBooking/", bookingInfo);
  }
  getAllBookingInfoByFacilityId(facilityId:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byFacility/" + facilityId);
  }
  getAllBookingInfoByUserId(userId:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byUser/" + userId);
  }
  getBookingInfoByTransactionId(transactionId:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byTransaction/" + transactionId);
  }
  getAllBookingInfoByPaymentStatus(paymentStatus:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byPaymentStatus/" + paymentStatus);
  }
  getAllBookingInfoByBookingStatus(bookingStatus:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byBookingStatus/" + bookingStatus);
  }
  getAllBookingInfoByUserIdAndBookingStatus(userId:String,bookingStatus:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byUserIdAndBookingStatus/" + userId + "/" + bookingStatus);
  }
  getAllBookingInfoByUserIdAndIsCompleted(userId:String,isCompleted:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byUserIdAndIsCompleted/" + userId + "/" + isCompleted);
  }
  getAllBookingInfoByFacilityIdAndBookingStatus(facilityId:String,bookingStatus:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byFacilityIdAndBookingStatus/" + facilityId + "/" + bookingStatus);
  }
  getAllBookingInfoByFacilityIdAndIsCompleted(facilityId:String,isCompleted:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byFacilityIdAndIsCompleted/" + facilityId + "/" + isCompleted);
  }
  getAllBookingInfoByIsRated(isRated:String):Observable<BookingInfo[]>{
    return this.http.get<any>(`${this.bookingInfoURL}`+ "byIsRated/" + isRated);
  }

  //Booking addons
  private bookingAddonsURL = `${this.apiURL}`+"bookingAddons/";
  getAllBookingAddons():Observable<BookingAddons[]>{
    return this.http.get<any>(`${this.bookingAddonsURL}`);
  }
  addBookingAddons(newBookingAddons:any){
    return this.http.post(`${this.bookingAddonsURL}`+"addBookingAddons/", newBookingAddons);
  }
  getBookingAddonsByTransactionId(transactionId:String):Observable<BookingAddons[]>{
    return this.http.get<any>(`${this.bookingAddonsURL}` + transactionId);
  }

  //Booking Pet Info
  private bookingPetURL = `${this.apiURL}`+"pets/";
  getAllBookingPetInfo():Observable<BookingPetInfo[]>{
    return this.http.get<any>(`${this.bookingPetURL}`);
  }
  addBookingPetInfo(newPetBooking:any){
    return this.http.post(`${this.bookingPetURL}`+"addPets/", newPetBooking);
  }
  getBookingPetInfoByPetId(petId:String):Observable<BookingPetInfo[]>{
    return this.http.get<any>(`${this.bookingPetURL}` + "byPetId/" + petId);
  }
  getAllBookingPetInfoByUserId(userId:String):Observable<BookingPetInfo[]>{
    return this.http.get<any>(`${this.bookingPetURL}` + "byUserId/" + userId);
  }
  getAllBookingPetInfoByTransactionId(transactionId:String):Observable<BookingPetInfo[]>{
    return this.http.get<any>(`${this.bookingPetURL}` + "byTransactionId/" + transactionId);
  }
}
