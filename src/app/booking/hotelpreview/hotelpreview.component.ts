import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilityAmenity } from 'src/app/models/facility-amenity.model';
import { FacilityImages } from 'src/app/models/facility-images.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { FacilityOffer } from 'src/app/models/facility-offer.model';
import { FacilitySafety } from 'src/app/models/facility-safety.model';
import { PetProfile } from 'src/app/models/pet-profile.model';
import { Rating } from 'src/app/models/rating.model';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api.service';
import { BookingaddonsService } from 'src/app/services/bookingaddons.service';
import { BookingpetService } from 'src/app/services/bookingpet.service';
import { BookingserviceService } from 'src/app/services/bookingservice.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { OtherServiceService } from 'src/app/services/other-service.service';
import { RatingService } from 'src/app/services/rating.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { HeaderComponent } from 'src/app/static_components/header/header.component';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Wishlist } from 'src/app/models/wishlist.model';
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success px-3 p-1',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-hotelpreview',
  templateUrl: './hotelpreview.component.html',
  styleUrls: ['./hotelpreview.component.css']
})
export class HotelpreviewComponent implements OnInit {

  // cards: any[] = [
  //   {"name": "Pawsome Inn", "location": "Taguig City", "availability": "Weekdays", "price": 700, "thumbnail": "../assets/image-test/pethotel-03.png", "roomNum": 10, "roomAvail": "5 rooms", "user": "Nomar Rubi", "desc": "Pawsome Hotel offers 10 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"], "happyPet": true},
  //   {"name": "Furever Stay Hotel", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": 1000, "thumbnail": "../assets/image-test/pethotel-02.jpg", "roomNum": 9, "roomAvail": "3 rooms", "user": "Chrestian Tuazon", "desc": "Furever Stay Hotel offers 9 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "PallyWood Hotel", "location": "Taguig City", "availability": "Weekdays", "price": 950, "thumbnail": "../assets/image-test/1.jpg", "roomNum": 5, "roomAvail": "1 room", "user": "Joshua Bohol", "desc": "PallyWood Hotel offers 5 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Air Conditioned"], "forOwners": ["WIFI", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "House of Pets Inn", "location": "Taguig City", "availability": "Weekdays", "price": 780, "thumbnail": "../assets/image-test/pethotel-04.jpg", "roomNum": 8, "roomAvail": "7 rooms", "user": "Duane Geronim0", "desc": "House of Pets Inn offers 8 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A shared room", "Handled Personally"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"], "happyPet": true},
  //   {"name": "Raff Days Rooms", "location": "Taguig City", "availability": "Weekdays", "price": 1250, "thumbnail": "../assets/image-test/pethotel-05.jpg", "roomNum": 5, "roomAvail": "2 rooms", "user": "Paule Acuin", "desc": "Raff Days Rooms offers 5 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A private room", "A shared room"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground"], "forOwners": ["Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "Hyatt for Cats", "location": "Taguig City", "availability": "Weekdays", "price": 900, "thumbnail": "../assets/image-test/pethotel-06.jpg", "roomNum": 6, "roomAvail": "5 rooms", "user": "Noel Anonas", "desc": "Hyatt for Cats offers 50 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Dedicated Playground", "Air Conditioned"], "forOwners": ["Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "Boho & Bark", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": 850, "thumbnail": "../assets/image-test/pethotel-07.png", "roomNum": 12, "roomAvail": "1 room", "user": "Jennifer Povadora", "desc": "Boho and Bark offers 50 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]}
  // ]
  cards: any[] = [];

  checkboxes: any = [
    { "name": "petVet", "option": "Vet Check up", "add": 250 },
    { "name": "petBath", "option": "Pet Bath", "add": 200 },
    { "name": "petCCTV", "option": "Online Surveillance", "add": 200 },
    { "name": "petGroom", "option": "Pet Grooming", "add": 400 },
  ];
  selected: boolean[] = [];
  thumbnailShow: boolean = false;

  roomDescT: string[] = [];
  roomDesc: string[] = [];

  pageValues: any = {};

  placeIncludeT: string[] = [];
  placeIncludedIcon: any = [];

  forOwnersT: any = [];
  forOwnersIcon: any = [];

  safetyT: any = [];
  safetyIcon: any = [];

  guestNum: any = [];
  pets: any = ["Dog", "Cat"]
  dropdwn: string[] = ["not-visible", "not-visible"];
  topBottom: string[] = [];
  topBottomPet: string[] = [];
  additionals: any = [];


  //user values
  petsRegistered: any = [];

  //input
  check: any = {};
  guestInput: any = ["", "Dog"];
  add: any = [];
  petBooked: any = "default";

  totalPrice: number = 0;

  //Page Values
  facilityInfos: any = {};
  facilityImages: any = {};
  facilityOffer: any = {};
  facilityAmenity: any = {};
  facilitySafety: any = {};
  hostData: any = {};

  //Ratings & Comments
  ratingsList: any = [];
  ratingsUser: any = [];
  ratingsShow: any = [];
  ratingsNull: boolean = true;

  commentsTextDefault: String = "No comments yet...";
  commentBorderStyle: String[] = [];

  comment: string = '';
  maxChars: number = 200;

  //wishlist heart
  wished: string = '';

  constructor(private router: Router, private book: BookingserviceService, private apiURL: ApiService,
    private facilityURL: FacilityapiService, private userURL: UserapiService, private bookAddons: BookingaddonsService,
    private bookPet: BookingpetService, private ratingApi: RatingService, private otherServices: OtherServiceService,
    private wishlistApi: WishlistService) { }

  ngOnInit(): void {
    let facilityId = this.router.url.slice(1);
    let userId;
    this.userURL.getPetsByUserIdAndPetDeleted(sessionStorage.getItem("userId")!, "false").subscribe((data: PetProfile[]) => {
      this.petsRegistered = data;
    })
    this.facilityURL.getFacilityInfoByFacilityId(facilityId).subscribe((data: FacilityInfo[]) => {
      this.facilityInfos = data;
      userId = this.facilityInfos.userId;
      this.totalPrice = +this.facilityInfos.priceRate;

      if (this.facilityInfos.privateRoom == "true") {
        this.roomDescT.push("A private room");
        this.roomDesc.push("Pets stays in a private room but some areas may be shared with other pets.");
      }
      if (this.facilityInfos.sharedRoom == "true") {
        this.roomDescT.push("A shared room");
        this.roomDesc.push("Pets stays and sleep in a room or common area that may be shared with other pets.");
      }
      if (this.facilityInfos.handledPersonally == "true") {
        this.roomDescT.push("Handled Personally");
        this.roomDesc.push("Pets stays under pet sitter’s observation to ensure their safety.");
      }

      this.userURL.getUserById(userId).subscribe((data: Users[]) => {
        this.hostData = data;
      })

      for (let e = 0; e < this.facilityInfos.roomNum; e++) {
        this.guestNum[e] = e + 1;
      }
    })

    this.facilityURL.getFacilityImagesById(facilityId).subscribe((data: FacilityImages[]) => {
      this.facilityImages = data;
      this.thumbnailShow = true;
    })

    this.facilityURL.getFacilityOfferById(facilityId).subscribe((data: FacilityOffer[]) => {
      this.facilityOffer = data;

      if (this.facilityOffer.petVet == "true") {
        this.placeIncludeT.push("In-house veterinarian");
        this.placeIncludedIcon.push("../assets/icons/inhouse-vet.png");
        this.additionals.push(this.checkboxes[0]);
      }
      if (this.facilityOffer.petBath == "true") {
        this.placeIncludeT.push("Offer Pet Bath");
        this.placeIncludedIcon.push("../assets/icons/pet-bath.jpg");
        this.additionals.push(this.checkboxes[1]);
      }
      if (this.facilityOffer.petCCTV == "true") {
        this.placeIncludeT.push("Online Surveillance");
        this.placeIncludedIcon.push("../assets/icons/online-surveillance.png");
        this.additionals.push(this.checkboxes[2]);
      }
      if (this.facilityOffer.petGroom == "true") {
        this.placeIncludeT.push("Pet Grooming Service");
        this.placeIncludedIcon.push("../assets/icons/pet-grooming.png");
        this.additionals.push(this.checkboxes[3]);
      }
      if (this.facilityOffer.petPickup == "true") {
        this.placeIncludeT.push("Pet Pickup")
        this.placeIncludedIcon.push("../assets/icons/playground.png");
      }
      if (this.facilityOffer.petPool == "true") {
        this.placeIncludeT.push("Pool for Pets");
        this.placeIncludedIcon.push("../assets/icons/pool.png");
      }
      if (this.facilityOffer.petAircon == "true") {
        this.placeIncludeT.push("Air Conditioned");
        this.placeIncludedIcon.push("../assets/icons/aircon.png");
      }
      if (this.facilityOffer.petWalk == "true") {
        this.placeIncludeT.push("Walking Pet");
        this.placeIncludedIcon.push("../assets/icons/walking_pet.png");
      }
    })

    this.facilityURL.getFacilityAmenityById(facilityId).subscribe((data: FacilityAmenity[]) => {
      this.facilityAmenity = data;

      if (this.facilityAmenity.wifi == "true") {
        this.forOwnersT.push("WIFI");
        this.forOwnersIcon.push("../assets/icons/wifi-icon.png");
      }
      if (this.facilityAmenity.freePark == "true") {
        this.forOwnersT.push("Free Parking");
        this.forOwnersIcon.push("../assets/icons/free-parking-icon.png");
      }
      if (this.facilityAmenity.paidPark == "true") {
        this.forOwnersT.push("Paid Parking");
        this.forOwnersIcon.push("../assets/icons/local_parking_FILL0_wght400_GRAD0_opsz48.svg");
      }
      if (this.facilityAmenity.waitingArea == "true") {
        this.forOwnersT.push("Waiting Area");
        this.forOwnersIcon.push("../assets/icons/waiting-icon.png");
      }
    })

    this.facilityURL.getFacilitySafetyById(facilityId).subscribe((data: FacilitySafety[]) => {
      this.facilitySafety = data;

      if (this.facilitySafety.safetySmoke == "true") {
        this.safetyT.push("Smoke Alarm");
        this.safetyIcon.push("../assets/icons/smoke-alarm-icon.png");
      }
      if (this.facilitySafety.safetyFire == "true") {
        this.safetyT.push("Fire Extinguisher");
        this.safetyIcon.push("../assets/icons/fire-extinguisher-icon.png");
      }
      if (this.facilitySafety.safetyKit == "true") {
        this.safetyT.push("First Aid Kit");
        this.safetyIcon.push("../assets/icons/first-aid.png");
      }

    })

    this.topBottom[0] = "topdropdwn";
    this.topBottom[this.guestNum.length - 1] = "botdropdwn";

    this.topBottomPet[0] = "topdropdwn";
    this.topBottomPet[this.pets.length - 1] = "botdropdwn";


    for (let f = 0; f < this.checkboxes.length; f++) {
      this.selected[f] = false;
    }

    this.getRatings();
    this.getWishlist();
  }

  getRatings() {
    let facilityId = this.router.url.slice(1);

    this.ratingApi.getAllRatingByFacilty(facilityId).subscribe(async (data: Rating[]) => {
      this.ratingsList = data;

      for (let i = 0; i < this.ratingsList.length; i++) {
        this.userURL.getUserById(this.ratingsList[i].userId).subscribe(async (data: Users[]) => {
          this.ratingsUser[i] = data;
        })
        if (i < this.ratingsList.length - 1) {
          this.commentBorderStyle[i] = "comment-card-border";
        }
      }

      for (let i = 0; i < this.ratingsList.length; i++) {
        this.commentsTextDefault = "Loading...";
        await new Promise(f => setTimeout(f, 500));
      }
      if (this.ratingsList.length != 0) {
        this.ratingsNull = false;
      }

    })
  }

  getWishlist(){
    let facilityId = this.router.url.slice(1);
    let userId = sessionStorage.getItem("userId");

    this.wishlistApi.getWishlistByUserIdAndFacilityIdAndIsRemoved(userId!,facilityId,'false').subscribe((data:Wishlist[]) => {
     if(data){
       this.wished = 'wished'
     } else{
       this.wished = '';
     }
    })
  }

  checkinfo: number[] = [];
  nights: number = 0;
  months: any = {};
  days: any = {};
  onSelectdate(i: number) {
    if (this.check.checkin && this.check.checkout) {
      // var month1 = +this.check.checkin.slice(5, 7);
      // var month2 = +this.check.checkout.slice(5, 7);
      // this.months.month1 = month1;
      // this.months.month2 = month2;
      // var day1 = +this.check.checkin.slice(8, 10);
      // var day2 = +this.check.checkout.slice(8, 10);
      // this.days.day1 = day1;
      // this.days.day2 = day2;
      let checkinDate = new Date(this.check.checkin);
      let checkoutDate = new Date(this.check.checkout);

      let dateDiff = this.calculateDateDiff(checkinDate, checkoutDate) + 1;
      console.log(dateDiff);

      if (dateDiff > 0) {
        this.totalPrice = this.facilityInfos.priceRate * dateDiff;
      } else {
        this.totalPrice = this.facilityInfos.priceRate;
      }

      // console.log(checkinDate, checkoutDate);
      // console.log(this.check.checkin, this.check.checkout)
      // console.log(checkoutDate > checkinDate);
      // if (this.check.checkout > this.check.checkin) {
      //   var priceday = this.pageValues.price * ((day2 - day1) - 1);
      //   this.checkinfo.push(day2 - day1);
      //   if (this.checkinfo.length == 3) {
      //     this.checkinfo.shift();
      //   }
      //   if (this.checkinfo.length == 1) {
      //     this.totalPrice = this.totalPrice + this.facilityInfos.priceRate * ((day2 - day1) - 1);
      //   } else if (this.checkinfo.length == 2) {
      //     if (this.checkinfo[1] > this.checkinfo[0]) {
      //       this.totalPrice = this.totalPrice + this.facilityInfos.priceRate * (this.checkinfo[1] - this.checkinfo[0]);
      //     } else if (this.checkinfo[1] < this.checkinfo[0]) {
      //       this.totalPrice = this.totalPrice - this.facilityInfos.priceRate * (this.checkinfo[0] - this.checkinfo[1]);
      //     }
      //   }
      //   // console.log("Nights: ",(day2 - day1));
      //   // console.log("Length: "+this.checkinfo.length)

      //   this.nights = day2 - day1;
      // } else {
      //   this.totalPrice = +this.facilityInfos.priceRate;
      // }
    }
  }

  calculateDateDiff(checkinDate: any, checkoutDate: any) {

    return Math.floor((Date.UTC(checkoutDate.getFullYear(),
      checkoutDate.getMonth(), checkoutDate.getDate()) - Date.UTC(checkinDate.getFullYear(),
        checkinDate.getMonth(), checkinDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  onClickDrpDwn(i: number) {
    if (i == 0) {
      this.dropdwn[0] = "visible";
    } else if (i == 1) {
      this.dropdwn = ["not-visible", "not-visible"];
    } else if (i == 2) {
      this.dropdwn[1] = "visible";
    }
  }

  // dropSelect(i:number, a:number){
  //   this.dropdwn = ["not-visible", "not-visible"]
  //   if(a == 0){
  //     this.guestInput[a] = this.guestNum[i];
  //   }else if(a == 1){
  //     this.guestInput[a] = this.pets[i];
  //   }
  //   console.log(this.guestInput);
  // }

  price(second: number, method: string) {
    if (method == "add") {
      this.totalPrice = (this.totalPrice + second);
    } else if (method == "minus") {
      this.totalPrice -= second;
    }
  }

  // onSelectAdditional(i:number){
  //   for(let a = 0; a < this.checkboxes.length; a++){
  //     if(a == i && this.selected[i] == false){
  //       this.selected[i] = true;
  //       this.add.push(this.checkboxes[i]);
  //       this.price(this.checkboxes[i].add, "add");
  //     } else if(a == i && this.selected[i] == true){
  //       this.selected[i] = false;

  //       for(let b = 0; b < this.add.length; b++){
  //         if(this.add[b] == this.checkboxes[i]){
  //           this.add.splice(b);
  //         }
  //       }
  //       this.price(this.checkboxes[i].add, "minus");
  //     }
  //   }
  // }
  onSelectAdditional(i: number) {
    console.log(this.additionals);
    for (let a = 0; a < this.additionals.length; a++) {
      if (a == i && this.selected[i] == false) {
        this.selected[i] = true;
        this.add.push(this.additionals[i]);
        this.price(this.additionals[i].add, "add");
      } else if (a == i && this.selected[i] == true) {
        this.selected[i] = false;

        for (let b = 0; b < this.add.length; b++) {
          if (this.add[b] == this.additionals[i]) {
            this.add.splice(b);
          }
        }
        this.price(this.additionals[i].add, "minus");
      }
    }
    console.log(this.add);
  }

  async onInputPet() {
    await new Promise(f => setTimeout(f, 500));
    console.log(this.petBooked);
  }

  onReserve() {
    let facilityId = this.router.url.slice(1);
    let user: any;
    let facility: any;
    let pet: any;
    let roomsLeft = +this.facilityInfos.roomNum - this.facilityInfos.roomBooked;
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      this.userURL.getUserById(sessionStorage.getItem("userId")!).subscribe((data: Users[]) => {
        user = data;

        this.facilityURL.getFacilityInfoByFacilityId(facilityId).subscribe((data: FacilityInfo[]) => {
          facility = data;

          if (facility.userId == user.userId) {
            Swal.fire({
              text: "You can't book on you own Facility!",
              width: 300,
              icon: 'warning',
              confirmButtonColor: '#8B488C'
            })
          } else {
            if (roomsLeft > 0) {
              this.userURL.getPetById(this.petBooked).subscribe((data: PetProfile[]) => {
                pet = data;

                console.log(pet);

                if (this.check.checkin && this.check.checkout && sessionStorage.getItem("isLoggedIn") == "true" && this.petBooked != "default" && pet.bookingStatus == "notBooked") {
                  console.log("day1: ", this.days.day1, "day2: ", this.days.day2);
                  if (this.days.day2 < this.days.day1) {
                    // alert("Wrong Check In/Out dates");
                    Swal.fire({
                      text: "Wrong Check In/Out dates",
                      width: 300,
                      icon: 'warning',
                      confirmButtonColor: "#8B488C"
                    })
                    return;
                  }
                  let bookadd: any = {};
                  for (let i = 0; i < this.add.length; i++) {
                    let name = this.add[i].name;
                    bookadd[name] = "true";
                  }
                  console.log(bookadd);
                  // this.bookAddons.storeVal(bookadd);
                  if (bookadd["petVet"]) {
                    this.bookAddons.setPetVet(bookadd["petVet"]);
                  }
                  if (bookadd["petBath"]) {
                    this.bookAddons.setPetBath(bookadd["petBath"]);
                  }
                  if (bookadd["petCCTV"]) {
                    this.bookAddons.setPetCCTV(bookadd["petCCTV"]);
                  }
                  if (bookadd["petGroom"]) {
                    this.bookAddons.setPetGroom(bookadd["petGroom"]);
                  }
                  // this.bookPet.storeVal(this.guestInput[0], this.guestInput[1]);
                  this.router.navigate([this.facilityInfos.facilityId + '/payment']);
                  this.book.storeValues(this.facilityAmenity.priceRate, this.check, this.nights, this.petBooked, this.add, this.totalPrice, this.comment);

                  console.log(this.comment);
                  sessionStorage.setItem("booking", "true");
                } else if (this.petsRegistered.length == 0) {
                  Swal.fire({
                    text: 'No registered pet!',
                    width: 300,
                    icon: 'warning',
                    confirmButtonColor: "#8B488C"
                  }).then((event) => {
                    if (event.isConfirmed) {
                      Swal.fire({
                        text: 'Register a pet?',
                        width: 300,
                        icon: 'question',
                        confirmButtonColor: "#8B488C",
                        showCancelButton: true
                      }).then((event) => {
                        if (event.isConfirmed) {
                          this.router.navigate(['user'], { state: { data: 'haha' } });
                          // this.otherServices.newActionNoPet(true)
                        }
                      })
                    }
                  })
                } else if (this.petBooked == "default") {
                  Swal.fire({
                    text: 'Need to input a pet first!',
                    width: 300,
                    icon: 'warning',
                    confirmButtonColor: "#8B488C"
                  })
                } else if (pet.bookingStatus == "Booked") {
                  Swal.fire({
                    text: 'Pet is already booked!',
                    width: 300,
                    icon: 'warning',
                    confirmButtonColor: "#8B488C"
                  })
                }
                else {
                  Swal.fire({
                    text: 'Need to input a date first!',
                    width: 300,
                    icon: 'warning',
                    confirmButtonColor: "#8B488C"
                  })
                }

              })
            } else {
              Swal.fire({
                text: 'No rooms left!',
                width: 300,
                icon: 'warning',
                confirmButtonColor: "#8B488C"
              })
            }
          }
        })
      })
    } else {
      Swal.fire({
        text: 'Need to login first!',
        width: 300,
        icon: 'warning',
        confirmButtonColor: "#8B488C"
      })
    }

  }

  onInputChange() {
    if (this.comment.length > this.maxChars) {
      this.comment = this.comment.substring(0, this.maxChars);
      Swal.fire({
        text: `Maximum character limit reached. Please limit your text to ${this.maxChars} characters or less.`,
        width: 400,
        icon: 'warning',
        confirmButtonColor: 'red'
      })
      this.onInputChange()
      return;
    }
  }

  onClickWishList() {
    let facilityId = this.router.url.slice(1);
    let userId = sessionStorage.getItem("userId");

    let dateNow = new Date();
    let day = ("0" + dateNow.getDate()).slice(-2);
    let month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    let hours = ("0" + dateNow.getHours()).slice(-2);
    let minutes = ("0" + dateNow.getMinutes()).slice(-2);
    let seconds = ("0" + dateNow.getSeconds()).slice(-2);

    let wishlistData: any;
    this.wishlistApi.getWishlistByUserIdAndFacilityIdAndIsRemoved(userId!, facilityId, 'false').subscribe((data: Wishlist[]) => {
      if (data) {
        wishlistData = data;
        wishlistData.isRemoved = 'true';

        this.wishlistApi.addWishlist(wishlistData).subscribe(() => {
          Swal.fire({
            title: 'Facility has been removed to wishlists',
            confirmButtonColor: '#BB00B4',
            icon: 'success'
          })
          this.wished = '';
        })
      } else {
        var newWishlist = {
          wishlistId: uuidv4(),
          userId: userId,
          facilityId: facilityId,
          addDate: `${dateNow.getFullYear()}-${month}-${day}`,
          addTime: `${hours}:${minutes}:${seconds}`,
          isRemoved: 'false'
        }
        this.wishlistApi.addWishlist(newWishlist).subscribe(() => {
          Swal.fire({
            title: 'Facility has been added to wishlists',
            confirmButtonColor: '#BB00B4',
            icon: 'success'
          })
          this.wished = 'wished';
        });
      }
    })
  }
}
