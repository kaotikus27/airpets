import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ForgotPasswordInfo } from '../models/forgot-password-info.model';
import { PetProfile } from '../models/pet-profile.model';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {
  private apiURL = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  //------------------------------User------------------------------------
  getAllUser():Observable<Users[]>{
    return this.http.get<any>(`${this.apiURL}`+"users");
  }
  registerUser(userSignup:any){
    return this.http.post(this.apiURL+"users/signupClient", userSignup);
  }
  getUser(emailAddress:String, password:String):Observable<Users[]>{
    return this.http.get<any>(`${this.apiURL}` + emailAddress + "/" + password);
  }
  getUserById(userId:String):Observable<Users[]>{
    return this.http.get<any>(`${this.apiURL}`+"users/" + userId);
  }
  getUserByEmail(emailAddress:String):Observable<Users[]>{
    return this.http.get<any>(`${this.apiURL}`+"users/findByEmail/" + emailAddress);
  }

  //-------------------------------Pet--------------------------------------
  getAllPets():Observable<PetProfile[]>{
    return this.http.get<any>(`${this.apiURL}`+"pets");
  }
  savePet(newPetDetails:any){
    return this.http.post(`${this.apiURL}`+"pets/addPet", newPetDetails);
  }
  getPetById(petId:String):Observable<PetProfile[]>{
    return this.http.get<PetProfile[]>(`${this.apiURL}`+"pets/byPetId/" + petId);
  }
  getPetsByUserId(userId:String):Observable<PetProfile[]>{
    return this.http.get<PetProfile[]>(`${this.apiURL}`+"pets/byUserId/" + userId);
  }
  getPetsByBookingStatus(bookingStatus:String):Observable<PetProfile[]>{
    return this.http.get<PetProfile[]>(`${this.apiURL}`+"pets/byBookingStatus/" + bookingStatus);
  }
  getPetsByPetDeleted(petDeleted:String):Observable<PetProfile[]>{
    return this.http.get<PetProfile[]>(`${this.apiURL}pets/byIsDeleted/${petDeleted}`);
  }
  getPetsByUserIdAndPetDeleted(userId:String, petDeleted:String):Observable<PetProfile[]>{
    return this.http.get<PetProfile[]>(`${this.apiURL}pets/byUserIdAndPetDeleted/${userId}/${petDeleted}`);
  }


  sendEmail(obj:any): Observable<ForgotPasswordInfo> {
    return this.http.post<ForgotPasswordInfo>('http://localhost:8081/forgotPass/sendFormData', obj)
  }


  onLogOut(){
    localStorage.clear();
    sessionStorage.clear();
    // alert('Successfully logged out!');
    Swal.fire({
      text: 'Successfully logged out!',
      width: 300,
      icon: 'success',
      // confirmButtonColor: '#4BB543',
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false
    }).then(function() {
      window.location.href = "/";
    });
  }
}
