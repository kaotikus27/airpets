import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiURL = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  addRating(rating:any){
    return this.http.post(`${this.apiURL}ratings/addRating`,rating)
  }
  getAllRating():Observable<Rating[]>{
    return this.http.get<Rating[]>(`${this.apiURL}ratings`);
  }
  getRatingById(ratingId:String):Observable<Rating[]>{
    return this.http.get<Rating[]>(`${this.apiURL}ratings/byRatingId/${ratingId}`)
  }
  getRatingByTransactionId(transactionId:String):Observable<Rating[]>{
    return this.http.get<Rating[]>(`${this.apiURL}ratings/byTransactionId/${transactionId}`);
  }
  getAllRatingByUserId(userId:String):Observable<Rating[]>{
    return this.http.get<Rating[]>(`${this.apiURL}ratings/byUser/${userId}`);
  }
  getAllRatingByFacilty(facilityId:String):Observable<Rating[]>{
    return this.http.get<Rating[]>(`${this.apiURL}ratings/byFacility/${facilityId}`);
  }
  getAllRatingByStar(star:String):Observable<Rating[]>{
    return this.http.get<Rating[]>(`${this.apiURL}ratings/byStar/${star}`);
  }
}
