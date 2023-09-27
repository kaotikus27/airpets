import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacilityAmenity } from '../models/facility-amenity.model';
import { FacilityImages } from '../models/facility-images.model';
import { FacilityInfo } from '../models/facility-info.model';
import { FacilityOffer } from '../models/facility-offer.model';
import { FacilitySafety } from '../models/facility-safety.model';

@Injectable({
  providedIn: 'root'
})
export class FacilityapiService {
  private apiURL = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  //Facility Info
  private facilityInfoURL = `${this.apiURL}` + "facility/";
  getAllFacilityInfo(): Observable<FacilityInfo[]> {
    return this.http.get<any>(`${this.facilityInfoURL}`);
  }
  registerFacilityInfo(facilityInfoSignup: any) {
    return this.http.post(`${this.facilityInfoURL}` + "signupFacility", facilityInfoSignup);
  }
  getFacilityInfoByFacilityId(facilityId: String): Observable<FacilityInfo[]> {
    return this.http.get<any>(`${this.facilityInfoURL}` + "byFacility/" + facilityId);
  }
  getFacilityInfoByUserId(userId: String): Observable<FacilityInfo[]> {
    return this.http.get<any>(`${this.facilityInfoURL}` + "byUser/" + userId);
  }
  getAllFacilityInfoByCity(facilityCity: String): Observable<FacilityInfo[]> {
    return this.http.get<any>(`${this.facilityInfoURL}` + "byCity/" + facilityCity);
  }
  getAllfacilityByPriceRate(priceRate: String): Observable<FacilityInfo[]> {
    return this.http.get<any>(`${this.facilityInfoURL}` + "byPriceRate/" + priceRate);
  }
  getAllFacilityInfoByIsEvaluatedAndIsApproved(isEvaluated: String, isApproved: String): Observable<FacilityInfo[]> {
    return this.http.get<any>(`${this.facilityInfoURL}byIsEvaluatedAndIsApproved/${isEvaluated}/${isApproved}`)
  }
  getAllFacilityInfoByTypeofPlaceAndIsApproved(typeOfPlace:String, isApproved:String):Observable<FacilityInfo[]>{
    return this.http.get<any>(`${this.facilityInfoURL}byTypeOfPlaceAndIsApproved/${typeOfPlace}/${isApproved}`);
  }

  //Facility Offer
  private facilityOfferURL = `${this.apiURL}` + "facilityOffers/";
  getAllFacilityOffer(): Observable<FacilityOffer[]> {
    return this.http.get<any>(`${this.facilityOfferURL}`);
  }
  registerFacilityOffer(facilityOfferSignup: any) {
    return this.http.post(`${this.facilityOfferURL}` + "signupOffer", facilityOfferSignup);
  }
  getFacilityOfferById(facilityId: String): Observable<FacilityOffer[]> {
    return this.http.get<any>(`${this.facilityOfferURL}` + facilityId);
  }
  getAllFacilityOfferByIsEvaluatedAndIsApproved(isEvaluated:String, isApproved:String):Observable<FacilityOffer[]>{
    return this.http.get<any>(`${this.facilityOfferURL}byIsEvaluatedAndIsApproved/${isEvaluated}/${isApproved}`);
  }

  //Facility Amenity
  private facilityAmenityURL = `${this.apiURL}` + "facilityAmenity/";
  getAllFacilityAmenity(): Observable<FacilityAmenity[]> {
    return this.http.get<any>(`${this.facilityAmenityURL}`);
  }
  registerFacilityAmenity(facilityAmenitySignup: any) {
    return this.http.post(`${this.facilityAmenityURL}` + "signupAmenity", facilityAmenitySignup);
  }
  getFacilityAmenityById(facilityId: String): Observable<FacilityAmenity[]> {
    return this.http.get<any>(`${this.facilityAmenityURL}` + facilityId);
  }
  getAllFacilityAmenityByIsEvaluatedAndIsApproved(isEvaluated:String, isApproved:String):Observable<FacilityAmenity[]>{
    return this.http.get<any>(`${this.facilityAmenityURL}byIsEvaluatedAndIsApproved/${isEvaluated}/${isApproved}`);
  }

  //Facility Safety
  private facilitySafetyURL = `${this.apiURL}` + "facilitySafety/";
  getAllFacilitySafety(): Observable<FacilitySafety[]> {
    return this.http.get<any>(`${this.facilitySafetyURL}`);
  }
  registerFacilitySafety(facilitySafetySignup: any) {
    return this.http.post(`${this.facilitySafetyURL}` + "signupSafety", facilitySafetySignup);
  }
  getFacilitySafetyById(facilityId: String): Observable<FacilitySafety[]> {
    return this.http.get<any>(`${this.facilitySafetyURL}` + facilityId);
  }
  getAllFacilitySafetyByIsEvaluatedAndIsApproved(isEvaluated:String, isApproved:String):Observable<FacilitySafety[]>{
    return this.http.get<any>(`${this.facilitySafetyURL}byIsEvaluatedAndIsApproved/${isEvaluated}/${isApproved}`);
  }

  //Facility Images
  private facilityImagesURL = `${this.apiURL}` + "facilityImages/";
  getAllFacilityImages(): Observable<FacilityImages[]> {
    return this.http.get<any>(`${this.facilityImagesURL}`);
  }
  registerFacilityImages(facilityImagesSignup: any) {
    return this.http.post(`${this.facilityImagesURL}` + "signupImages", facilityImagesSignup);
  }
  getFacilityImagesById(facilityId: String): Observable<FacilityImages[]> {
    return this.http.get<any>(`${this.facilityImagesURL}` + facilityId);
  }
  getAllFacilityImagesByIsEvaluatedAndIsApproved(isEvaluated: String, isApproved: String): Observable<FacilityImages[]> {
    return this.http.get<any>(`${this.facilityImagesURL}byIsEvaluatedAndIsApproved/${isEvaluated}/${isApproved}`);
  }

}
