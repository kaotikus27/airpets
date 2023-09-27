import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingAddons } from 'src/app/models/booking-addons.model';
import { BookingInfo } from 'src/app/models/booking-info.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { ApiService } from 'src/app/services/api.service';
import { BookingaddonsService } from 'src/app/services/bookingaddons.service';
import { BookingapiService } from 'src/app/services/bookingapi.service';
import { BookingserviceService } from 'src/app/services/bookingservice.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';

@Component({
  selector: 'app-bookingsuccess',
  templateUrl: './bookingsuccess.component.html',
  styleUrls: ['./bookingsuccess.component.css']
})
export class BookingsuccessComponent implements OnInit {
  // cards: any[] = [
  //   {"name": "Pawsome Inn", "location": "Taguig City", "availability": "Weekdays", "price": 700, "thumbnail": "../assets/image-test/pethotel-03.png", "roomNum": 10, "roomAvail": "5 rooms", "user": "Nomar Rubi", "desc": "Pawsome Hotel offers 10 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"], "happyPet": true},
  //   {"name": "Furever Stay Hotel", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": 1000, "thumbnail": "../assets/image-test/pethotel-02.jpg", "roomNum": 9, "roomAvail": "3 rooms", "user": "Chrestian Tuazon", "desc": "Furever Stay Hotel offers 9 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "PallyWood Hotel", "location": "Taguig City", "availability": "Weekdays", "price": 950, "thumbnail": "../assets/image-test/1.jpg", "roomNum": 5, "roomAvail": "1 room", "user": "Joshua Bohol", "desc": "PallyWood Hotel offers 5 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Air Conditioned"], "forOwners": ["WIFI", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "House of Pets Inn", "location": "Taguig City", "availability": "Weekdays", "price": 780, "thumbnail": "../assets/image-test/pethotel-04.jpg", "roomNum": 8, "roomAvail": "7 rooms", "user": "Duane Geronim0", "desc": "House of Pets Inn offers 8 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A shared room", "Handled Personally"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"], "happyPet": true},
  //   {"name": "Raff Days Rooms", "location": "Taguig City", "availability": "Weekdays", "price": 1250, "thumbnail": "../assets/image-test/pethotel-05.jpg", "roomNum": 5, "roomAvail": "2 rooms", "user": "Paule Acuin", "desc": "Raff Days Rooms offers 5 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A private room", "A shared room"], "placeIncluded": ["Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground"], "forOwners": ["Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "Hyatt for Cats", "location": "Taguig City", "availability": "Weekdays", "price": 900, "thumbnail": "../assets/image-test/pethotel-06.jpg", "roomNum": 6, "roomAvail": "5 rooms", "user": "Noel Anonas", "desc": "Hyatt for Cats offers 50 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Dedicated Playground", "Air Conditioned"], "forOwners": ["Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]},
  //   {"name": "Boho & Bark", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": 850, "thumbnail": "../assets/image-test/pethotel-07.png", "roomNum": 12, "roomAvail": "1 room", "user": "Jennifer Povadora", "desc": "Boho and Bark offers 50 comfortable rooms for pets with Taguig’s most central address. Discover carefully selected design furnishing perfectly fit for your little ones.", "accomodation": ["Handled Personally", "A private room", "A shared room"], "placeIncluded": ["In-house veterinarian", "Offer Pet Bath", "Online Surveillance", "Pet Grooming Service", "Dedicated Playground", "Pool for Pets", "Air Conditioned"], "forOwners": ["WIFI", "Free Parking", "Waiting Area"], "safety": ["Smoke Alarm", "Fire Extinguisher", "First Aid Kit"]}
  // ]
  addons: any = [
    {"name": "petVet", "option": "Vet Check up", "add": 250},
    {"name": "petBath", "option": "Pet Bath", "add": 200},
    {"name": "petCCTV", "option": "Online Surveillance", "add": 200},
    {"name": "petGroom", "option": "Pet Grooming", "add": 400},
  ];
  cards: any[] = [];
  pageValues: any = {};
  date:any = {};
  
  add: any = {};
  dateToday: any;
  dayToday: string = '';
  timeToday: string = '';
  totalPrice: number = 0;

  facilityInfos: any = {};
  transactionNumber: any;

  bookingInfo: any = {};
  bookingAddonsAdded: any = [];
  paid: boolean = false;
  accomodation: any;

  constructor(private router: Router, private book: BookingserviceService, private apiURL: ApiService,
    private facilityURL: FacilityapiService, private bookingApi: BookingapiService) { }

  ngOnInit(): void {
    // this.apiURL.getHotels().subscribe((data:any) => {
    //   this.cards = data;

    //   let name = this.router.url.slice(1).replaceAll('%20', ' ');
    //   let name1 = name.slice().replaceAll("/book-success", "")
    //   console.log(name1);
    //   for(let a = 0; a < this.cards.length; a++){
    //     if(name1 == this.cards[a].name){
    //       this.pageValues = this.cards[a];
    //       console.log(this.pageValues);
    //     }
    //   }
    // })
    let facilityId = this.router.url.slice(1).replaceAll('/book-success','');
    this.facilityURL.getFacilityInfoByFacilityId(facilityId).subscribe((data:FacilityInfo[]) => {
      this.facilityInfos = data;

      // console.log(this.facilityInfos.priceRate);
      // console.log(this.book.getNight());
      // this.accomodation = this.facilityInfos.priceRate * this.book.getNight();
    })

    let transactionId = sessionStorage.getItem("transactionId");
    console.log(transactionId);
    this.bookingApi.getBookingInfoByTransactionId(transactionId!).subscribe((data:BookingInfo[]) => {
      this.bookingInfo = data;
      console.log(this.bookingInfo);

      if(this.bookingInfo.paymentStatus == "paid"){
        this.paid = true;
      }

      this.accomodation = +this.bookingInfo.totalBill;


      let bookingAddons:any = {};
      this.bookingApi.getBookingAddonsByTransactionId(transactionId!).subscribe((data:BookingAddons[]) => {
        bookingAddons = data;
  
        let i = 0;
        if(bookingAddons.petVet == "true"){
          this.bookingAddonsAdded[i] = this.addons[0];
          i++;
        }
        if(bookingAddons.petBath == "true"){
          this.bookingAddonsAdded[i] = this.addons[1];
          i++;
        }
        if(bookingAddons.petCCTV == "true"){
          this.bookingAddonsAdded[i] = this.addons[2];
          i++;
        }
        if(bookingAddons.petGroom == "true"){
          this.bookingAddonsAdded[i] = this.addons[3];
        }
        console.log(this.bookingAddonsAdded);
  
        for(let i = 0; i < this.bookingAddonsAdded.length; i++){
          this.accomodation = this.accomodation - this.bookingAddonsAdded[i].add;
        }
        console.log(this.accomodation);
        
      })
    })
    
    

    this.date = this.book.getDates();
    // this.accomodation = this.book.getAccomodation();
    
    this.add = this.book.getAdd();
    this.totalPrice = this.book.getTotalPrice();

    let dateNow = new Date();
    this.timeToday = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
    this.dayToday = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`
    // this.dateToday = dateNow.toLocaleString().replaceAll(",", " - ");

    if(sessionStorage.getItem("booking") != "true"){
      this.router.navigate([facilityId]);
    }

    // let transactionNum = "";
    // var chars = "0123456789"
    // for(let i = 0; i < 13; i++){
    //   var rnum = Math.floor(Math.random() * chars.length);
    //   if(i != 4 && i != 8){
    //     transactionNum += chars.substring(rnum, rnum+1);
    //   } else{
    //     transactionNum += "-";
    //   }
    // }
    // this.transactionNumber = transactionNum;
    // console.log(transactionNum);
  }


  onDone(){
    this.book.storeValues(0, null, 0, null, null, 0, '');
    sessionStorage.removeItem("booking");
    this.router.navigate([""]);
  }

  onGotoTransaction(){
    this.book.storeValues(0, null, 0, null, null, 0, '');
    sessionStorage.removeItem("booking");
    this.router.navigate(["/user"]);
  }

}
