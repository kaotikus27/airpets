import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilityImages } from 'src/app/models/facility-images.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { PetProfile } from 'src/app/models/pet-profile.model';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api.service';
import { BookingaddonsService } from 'src/app/services/bookingaddons.service';
import { BookingapiService } from 'src/app/services/bookingapi.service';
import { BookingpetService } from 'src/app/services/bookingpet.service';
import { BookingserviceService } from 'src/app/services/bookingservice.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { PlatformLocation } from '@angular/common';
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
  selector: 'app-hotelrequest',
  templateUrl: './hotelrequest.component.html',
  styleUrls: ['./hotelrequest.component.css']
})
export class HotelrequestComponent implements OnInit {

  // cards: any[] = [
  //   {"name": "Pawsome Inn", "location": "Taguig City", "availability": "Weekdays", "price": 700, "thumbnail": "../assets/image-test/pethotel-03.png", "roomNum": 10, "roomAvail": "5 rooms", "user": "Nomar Rubi", "desc": "Pawsome Hotel offers 10 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"], "happyPet": true},
  //   {"name": "Furever Stay Hotel", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": 1000, "thumbnail": "../assets/image-test/pethotel-02.jpg", "roomNum": 9, "roomAvail": "3 rooms", "user": "Chrestian Tuazon", "desc": "Furever Stay Hotel offers 9 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "PallyWood Hotel", "location": "Taguig City", "availability": "Weekdays", "price": 950, "thumbnail": "../assets/image-test/1.jpg", "roomNum": 5, "roomAvail": "1 room", "user": "Joshua Bohol", "desc": "PallyWood Hotel offers 5 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Air Conditioned"], "forOwners": ["WIFI", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "House of Pets Inn", "location": "Taguig City", "availability": "Weekdays", "price": 780, "thumbnail": "../assets/image-test/pethotel-04.jpg", "roomNum": 8, "roomAvail": "7 rooms", "user": "Duane Geronim0", "desc": "House of Pets Inn offers 8 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A shared room", "Handled Personally"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"], "happyPet": true},
  //   {"name": "Raff Days Rooms", "location": "Taguig City", "availability": "Weekdays", "price": 1250, "thumbnail": "../assets/image-test/pethotel-05.jpg", "roomNum": 5, "roomAvail": "2 rooms", "user": "Paule Acuin", "desc": "Raff Days Rooms offers 5 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A private room", "A shared room"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground"], "forOwners": ["Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "Hyatt for Cats", "location": "Taguig City", "availability": "Weekdays", "price": 900, "thumbnail": "../assets/image-test/pethotel-06.jpg", "roomNum": 6, "roomAvail": "5 rooms", "user": "Noel Anonas", "desc": "Hyatt for Cats offers 50 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Dedicated Playground", "Air Conditioned"], "forOwners": ["Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "Boho & Bark", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": 850, "thumbnail": "../assets/image-test/pethotel-07.png", "roomNum": 12, "roomAvail": "1 room", "user": "Jennifer Povadora", "desc": "Boho and Bark offers 50 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]}
  // ]
  disabledInputCard: boolean = true;
  disabledInput: boolean = true;

  financialServices: any = [
    { name: "visa", icon: "../assets/icons/Visa_Logo.png" },
    { name: "mastercard", icon: "../assets/icons/MasterCard_early_1990s_logo.png" }
  ]
  cardStyle: any = ["not-selected", "not-selected"];
  cardS: any = "background-color: #e9ecef;";

  cards: any[] = [];
  pageValues: any = {};

  paymentMethod: any = "selectpayment";
  cardDetails: any = {};
  night: number = 0;
  guest: any = [];
  add: any = [];
  totalPrice: number = 0;

  //Facility Values
  facilityInfos: any = {};
  facilityImages: any = {};
  financialServiceSelected: string = 'none';
  petType: string = '';
  hostData: any = {};

  //Pet data
  pet: any = {};


  comment: string = '';
  maxChars: number = 200;

  constructor(private router: Router, private book: BookingserviceService, private apiURL: ApiService,
    private facilityURL: FacilityapiService, private userURL: UserapiService, private bookAddons: BookingaddonsService,
    private bookPet: BookingpetService, private bookingApi: BookingapiService, location: PlatformLocation, private wishlistApi: WishlistService) {
    // if(localStorage.getItem("page") == "HotelrequestComponent"){
    //   // console.log(localStorage.getItem("page"));
    //   location.onPopState(() => {
    //     console.log(localStorage.getItem("page"))
    //     alert("Your data will be lost!");
    //     return;
    //     // Swal.fire({
    //     //   text: "Your data will be lost",
    //     //   width: 400,

    //     // }).then(() => {
    //     //   router.navigate([this.facilityInfos.facilityId])
    //     // })
    //   })
    // }
  }

  ngOnInit(): void {
    let petId = this.book.getGuest();
    this.userURL.getPetById(petId!).subscribe((data: PetProfile[]) => {
      this.pet = data;
    })
    // this.apiURL.getHotels().subscribe((data:any) => {
    //   this.cards = data;

    //   let name = this.router.url.slice(1).replaceAll('%20', ' ');
    //   let name1 = name.slice().replaceAll("/payment", "")
    //   console.log(name1);
    //   for(let a = 0; a < this.cards.length; a++){
    //     if(name1 == this.cards[a].name){
    //       this.pageValues = this.cards[a];
    //       console.log(this.pageValues);
    //     }
    //   }
    // })
    let facilityId = this.router.url.slice(1).replaceAll("/payment", "");
    this.facilityURL.getFacilityInfoByFacilityId(facilityId).subscribe((data: FacilityInfo[]) => {
      this.facilityInfos = data;

      this.userURL.getUserById(this.facilityInfos.userId).subscribe((data: Users[]) => {
        this.hostData = data;
      })
    })
    this.facilityURL.getFacilityImagesById(facilityId).subscribe((data: FacilityImages[]) => {
      this.facilityImages = data;
    })


    // if()
    this.night = this.book.getNight();
    this.guest = this.book.getGuest();
    this.add = this.book.getAdd();
    this.totalPrice = this.book.getTotalPrice();

    console.log(this.book.getAdd());

    if (sessionStorage.getItem("booking") != "true") {
      this.router.navigate([facilityId]);
    }
  }

  onSelectPayment() {
    if (this.paymentMethod == "cash" || this.paymentMethod == "selectpayment" && this.disabledInputCard == false) {
      this.disabledInput = true;
      this.disabledInputCard = true;
      this.cardStyle = ["not-selected", "not-selected"]
      this.cardS = "background-color: #e9ecef;";
    } else if (this.paymentMethod == "card" && this.disabledInputCard == true) {
      this.disabledInputCard = false;
      this.cardS = ""
    }
    console.log(this.paymentMethod);
  }

  onBack() {
    let refreshAdd: any = [];
    this.router.navigate([this.facilityInfos.facilityId]);
    this.book.putAdd(refreshAdd);
    sessionStorage.removeItem("booking")
  }

  onSubmit() {
    console.log(this.cardDetails);
    if (this.paymentMethod == "selectpayment") {
      // alert("Choose a payment Method");
      Swal.fire({
        text: "Choose a payment Method",
        width: 300,
        icon: 'warning',
        confirmButtonColor: "#8B488C"
      })
      return;
    } else if (this.paymentMethod == "card" && (this.cardDetails.cardNum == undefined ||
      this.cardDetails.cardExp == undefined || this.cardDetails.cardCCV == undefined ||
      this.cardDetails.zipCode == undefined)) {
      // alert("Fill up card details!");
      Swal.fire({
        text: "Fill up card details!",
        width: 300,
        icon: 'warning',
        confirmButtonColor: "#8B488C"
      })
      return;
    }
    let transactionNum = "";
    var chars = "0123456789"
    for (let i = 0; i < 13; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      if (i != 4 && i != 8) {
        transactionNum += chars.substring(rnum, rnum + 1);
      } else {
        transactionNum += "-";
      }
    }
    let facilityId = this.router.url.slice(1).replaceAll("/payment", "");
    let checkinout: any = this.book.getDates();
    let paymentStatus = "unpaid";
    if (this.paymentMethod == "card") {
      paymentStatus = "paid";
    }
    let dateNow = new Date();
    let timeToday = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
    let dayToday = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
    // this.router.navigate([this.facilityInfos.facilityId + '/book-success']);
    let newBook = {
      transactionId: transactionNum,
      userId: sessionStorage.getItem("userId")!,
      facilityId: facilityId,
      petId: this.book.getGuest(),
      petComment: this.book.getComment(),
      paymentMethod: this.paymentMethod,
      checkinDate: checkinout.checkin,
      checkoutDate: checkinout.checkout,
      paymentStatus: paymentStatus,
      paymentDate: dayToday,
      paymentTime: timeToday,
      totalBill: this.totalPrice,
      bookingStatus: "Reserved",
      financialService: this.financialServiceSelected,
      isCompleted: "false",
      isRated: "false"
    }
    let addons: any = this.bookAddons.getStoredVal();
    addons["transactionId"] = transactionNum;

    this.pet.bookingStatus = "Booked";
    this.userURL.savePet(this.pet).subscribe((data: any) => {
      this.pet = data;
    })
    // console.log(addons);
    // let pet = {
    //   petId: uuidv4(),
    //   userId: sessionStorage.getItem("userId")!,
    //   petType: this.bookPet.getPetType(),
    //   transactionId: transactionNum,
    //   petBreed: this.bookPet.getPetBreed()
    // }
    // let addons = {
    //   transactionId : transactionNum,
    //   petVet : storedVal["petVet"],
    //   petBath : storedVal["petBath"],
    //   petCCTV : storedVal["petCCTV"],
    //   petGroom : storedVal["petGroom"]
    // }
    console.log(newBook);
    console.log(addons);
    // console.log(pet);

    sessionStorage.setItem("transactionId", transactionNum);
    this.bookingApi.addBookingInfo(newBook).subscribe();
    this.bookingApi.addBookingAddons(addons).subscribe();

    let facilityInfo: any;
    this.facilityURL.getFacilityInfoByFacilityId(facilityId).subscribe((data: FacilityInfo[]) => {
      facilityInfo = data;

      let booked: number = +facilityInfo["roomBooked"];

      facilityInfo["roomBooked"] = booked + 1;
      this.facilityURL.registerFacilityInfo(facilityInfo).subscribe();
    });

    let wishlistData:any;
    this.wishlistApi.getWishlistByUserIdAndFacilityIdAndIsRemoved(sessionStorage.getItem('userId')!, facilityId, 'false').subscribe((data:Wishlist[]) => {
      wishlistData = data;
      if(data){
        wishlistData.isRemoved = 'true';
        this.wishlistApi.addWishlist(wishlistData).subscribe();
      }
    })

    Swal.fire({
      text: 'Successfully Booked!',
      width: 400,
      icon: 'success',
      // confirmButtonColor: '#4BB543',
      showConfirmButton: true,
      // timer: 2000
    }).then(() => {
      this.router.navigate([this.facilityInfos.facilityId + '/book-success']);
      // window.location.href = `/${this.facilityInfos.facilityId}/book-success`;
    });
  }


  onSelectCard(financialService: any) {
    this.financialServiceSelected = financialService;
    if (financialService == "visa" && this.disabledInputCard == false) {
      this.disabledInput = false;
      this.cardStyle = ["selected", "not-selected"];
    } else if (financialService == "mastercard" && this.disabledInputCard == false) {
      this.disabledInput = false;
      this.cardStyle = ["not-selected", "selected"];
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  showMessage($event: any) {
    $event.returnValue = "Your data will be lost!";
  }

  // @HostListener('window:popstate', ['$event'])
  // onPopState($event:any) {
  //   swalWithBootstrapButtons.fire({
  //     text: 'Your data will be lost!',
  //     width: 300,
  //     icon: 'warning',
  //     cancelButtonColor: 'warning'
  //   })
  // }


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
}
