import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiURL = "http://localhost:8080/wishlists";

  constructor(private http:HttpClient) { }

  addWishlist(wishlist:any){
    return this.http.post(`${this.apiURL}/addWishlist`,wishlist);
  }

  getWishlistByWishlistId(wishlistId:String):Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>(`${this.apiURL}/byWishlistId/${wishlistId}`);
  }

  getAllWishlist():Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>(`${this.apiURL}`);
  }

  getAllWishlistByUserIdAndIsRemoved(userId:String, isRemoved:String):Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>(`${this.apiURL}/byUserIdAndIsRemoved/${userId}/${isRemoved}`);
  }

  getWishlistByUserIdAndFacilityIdAndIsRemoved(userId:String, facilityId:String, isRemoved:String):Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>(`${this.apiURL}/byUserIdAndFacilityIdAndIsRemoved/${userId}/${facilityId}/${isRemoved}`);
  }
}
