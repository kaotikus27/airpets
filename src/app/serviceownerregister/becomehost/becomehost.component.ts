import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { Users } from 'src/app/models/users';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { OtherServiceService } from 'src/app/services/other-service.service';
import { UserapiService } from 'src/app/services/userapi.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
const URL = 'http://localhost:8081/api/upload';

@Component({
  selector: 'app-becomehost',
  templateUrl: './becomehost.component.html',
  styleUrls: ['./becomehost.component.css']
})
export class BecomehostComponent implements OnInit {
  // facilityMainInfoVar: any = [""]
  accomodation: any = [
    { name: "Handled Personally", desc: "Pets stays under pet sitter’s observation to ensure their safety.", img: "../assets/icons/images.png" },
    { name: "A private room", desc: "Pets stays in a private room but some areas may be shared with other pets.", img: "../assets/icons/door_open_FILL1_wght400_GRAD0_opsz48.png" },
    { name: "A shared room", desc: "Pets stays and sleep in a room or common area that may be shared with other pets.", img: "../assets/icons/download.png" }
  ];
  btnAccomodation: string[] = [];
  addressVar: any = ["street", "barangay", "city", "state", "zipcode"];
  placeOffer: any = [
    { "name": "In-house veterinarian", "icon": "../assets/icons/inhouse-vet.png" },
    { "name": "Offer Pet Bath", "icon": "../assets/icons/pet-bath.jpg" },
    { "name": "Walking Pet", "icon": "../assets/icons/walking_pet.png" },
    { "name": "Offer for Pet Pick Up", "icon": "../assets/icons/playground.png" },
    { "name": "Pet Grooming Service", "icon": "../assets/icons/pet-grooming.png" },
    { "name": "Air Conditioned", "icon": "../assets/icons/aircon.png" },
    { "name": "Online Surveillance", "icon": "../assets/icons/online-surveillance.png" },
    { "name": "Pool for Pets", "icon": "../assets/icons/pool.png" }
  ]
  btnPlaceOffer: string[] = [];
  amenities: any = [
    { "name": "Wifi", "icon": "../assets/icons/wifi-icon.png" },
    { "name": "Free Parking on Premises", "icon": "../assets/icons/free-parking-icon.png" },
    { "name": "Paid Parking on Premises", "icon": "../assets/icons/local_parking_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Dedicated Waiting Area", "icon": "../assets/icons/waiting-icon.png" }
  ];
  btnAmenities: string[] = [];
  placeSafety: any = [
    { "name": "Smoke Alarm", "icon": "../assets/icons/smoke-alarm-icon.png" },
    { "name": "Fire Extinguisher", "icon": "../assets/icons/fire-extinguisher-icon.png" },
    { "name": "First Aid Kit", "icon": "../assets/icons/first-aid.png" }
  ]
  btnSafety: string[] = [];
  setPrice: number = 100;
  filename: any;
  disabledAccomBtn: string[] = [];

  //INPUTS
  imageFiles: any = [];
  address: any = {};
  inputAccomodation: any = [];
  inputOffer: any = [];
  basicInput: any = {};
  inputAmenity: any = [];
  inputSafety: any = [];
  facilityMainInfo: any = {};
  addImages: any = [];
  filenamesList: any = '';

  //INPUTS TO BE SAVED
  facilityAccom: any = {};
  facilityInfo: any = {};
  facilityOffer: any = {};
  facilityAmenity: any = {};
  facilitySafety: any = {};
  facilityImages: any = {};
  facilityUUid!: String;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  constructor(private ngZone: NgZone, private http: HttpClient, private router: Router,
    private facilityApi: FacilityapiService, private userApi: UserapiService, private otherService: OtherServiceService) { }

  ngOnInit() {
    if (sessionStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['/']);
    }
    this.uploader.onAfterAddingFile = (file) => {
      // console.log("Original filename: ", file._file.name);
      this.imageFiles.push(file._file.name);
      if (this.filenamesList == '') {
        this.filenamesList = file._file.name;
      } else {
        this.filenamesList = this.filenamesList + ', ' + file._file.name;
      }
      // console.log(this.filename);
      // console.log(this.uploader.getReadyItems()[0])
      file.withCredentials = false;
    };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    // console.log('Uploaded File Details:', item);
    // console.log('testName: ', item._file.name);
    // console.log('response: ', response);
    // console.log('status: ', status);
    // console.log('headers: ', headers);
    // console.log(response);
    // this.hotelImages.push(response);
    // for(let i = 0; i < this.hotelImages.length; i++){
    //   this.newImages['image_'+ i] = this.hotelImages[i];
    // }
    // console.log(this.hotelImages);
    // console.log('testnums: ', item.Date);
    // console.log('testnums2: ', item._file);
    // console.log(); 
    // };


    //DEFAUL VALUES
    this.basicInput.room = '10';
    this.basicInput.playground = 'true';
    this.basicInput.bed = 'true';
    this.basicInput.bathroom = 'true';
    this.facilityMainInfo.facilityType = "hotel";
    // for(let i = 0; i < this.accomodation.length; i++){
    //   this.disabledAccomBtn[i] = "enabled";
    // }
    for (let i = 0; i < this.accomodation.length; i++) {
      this.btnAccomodation[i] = "not-selected";
    }
    for (let i = 0; i < this.placeOffer.length; i++) {
      this.btnPlaceOffer[i] = "not-selected";
    }
    for (let i = 0; i < this.amenities.length; i++) {
      this.btnAmenities[i] = "not-selected";
    }
    for (let i = 0; i < this.placeSafety.length; i++) {
      this.btnSafety[i] = "not-selected";
    }

    if (this.facilityMainInfo.facilityType == "hotel") {
      this.disabledAccomBtn = ["disabled", "enabled", "enabled"];
    } else if (this.facilityMainInfo.facilityType == "petSitter") {
      this.disabledAccomBtn = ["enabled", "disabled", "disabled"];
    }

    for (let i = 0; i < this.accomodation.length; i++) {
      this.inputAccomodation[i] = false;
    }
    for (let i = 0; i < this.placeOffer.length; i++) {
      this.inputOffer[i] = false;
    }
    for (let i = 0; i < this.amenities.length; i++) {
      this.inputAmenity[i] = false;
    }
    for (let i = 0; i < this.placeSafety.length; i++) {
      this.inputSafety[i] = false;
    }

    // for(let i = 0; i < this.imageFiles.length; i++){
    //   this.filenamesList = this.filenamesList + ', ' + this.imageFiles[i];
    // }

  }


  onInputType() {
    console.log(this.facilityMainInfo.facilityType);
    if (this.facilityMainInfo.facilityType == "hotel") {
      this.disabledAccomBtn = ["disabled", "enabled", "enabled"];
    } else if (this.facilityMainInfo.facilityType == "petSitter") {
      this.disabledAccomBtn = ["enabled", "disabled", "disabled"];
    }
  }

  onClick(a: string, i: number) {
    if (a == 'accomodation') {
      for (let b = 0; b < this.btnAccomodation.length; b++) {
        if (i == b && this.btnAccomodation[b] == "not-selected" && this.disabledAccomBtn[b] == "enabled") {
          this.btnAccomodation[b] = "selected";
          this.inputAccomodation[b] = true;
        }
        else if (i == b && this.btnAccomodation[b] == "selected" && this.disabledAccomBtn[b] == "enabled") {
          this.btnAccomodation[b] = "not-selected";
          this.inputAccomodation[b] = false;
        }
      }
    }
    if (a == 'placeOffer') {
      for (let c = 0; c < this.btnPlaceOffer.length; c++) {
        if (i == c && this.btnPlaceOffer[c] == "not-selected") {
          this.btnPlaceOffer[c] = "selected";
          this.inputOffer[c] = true;
        }
        else if (i == c && this.btnPlaceOffer[c] == "selected") {
          this.btnPlaceOffer[c] = "not-selected";
          this.inputOffer[c] = false;
        }
      }
    }
    if (a == 'amenities') {
      for (let d = 0; d < this.btnAmenities.length; d++) {
        if (i == d && this.btnAmenities[d] == "not-selected") {
          this.btnAmenities[d] = "selected";
          this.inputAmenity[d] = true;
        }
        else if (i == d && this.btnAmenities[d] == "selected") {
          this.btnAmenities[d] = "not-selected";
          this.inputAmenity[d] = false;
        }
      }
    }
    if (a == 'safety') {
      for (let e = 0; e < this.btnSafety.length; e++) {
        if (i == e && this.btnSafety[e] == "not-selected") {
          this.btnSafety[e] = "selected";
          this.inputSafety[e] = true;
        }
        else if (i == e && this.btnSafety[e] == "selected") {
          this.btnSafety[e] = "not-selected";
          this.inputSafety[e] = false;
        }
      }
    }

  }

  priceInput(a: string) {
    if (a == 'add') {
      this.setPrice += 50;
    } else if (a == 'minus' && this.setPrice != 0) {
      this.setPrice -= 50;
    }
  }


  // imgTest(){
  //   console.log(this.filename);
  // }

  // imageInput(a: any){
  //   console.log(a);
  // }

  fileSelect(event: any) {
    console.log("Original filenames: ", this.imageFiles);
  }





  user: any = {};

  async onSubmit(a: any) {
    let validReg = "not-valid";
    for (let i = 0; i < this.btnAccomodation.length; i++) {
      if (this.btnAccomodation[i] == "selected") {
        validReg = "valid";
      }
    }
    for (let i = 0; i < this.addressVar.length; i++) {
      console.log(this.address[this.addressVar[i]])
      if (this.address[this.addressVar[i]] == undefined || this.address[this.addressVar[i]] == '') {
        validReg = "not-valid";
      }
    }
    let validOffer = "not-valid";
    for (let i = 0; i < this.inputOffer.length; i++) {
      if (this.inputOffer[i] == true) {
        validOffer = "valid";
      }
    }
    let validAmenity = "not-valid";
    for (let i = 0; i < this.inputAmenity.length; i++) {
      if (this.inputAmenity[i] == true) {
        validAmenity = "valid";
      }
    }
    let validSafety = "not-valid";
    for (let i = 0; i < this.inputSafety.length; i++) {
      if (this.inputSafety[i] == true) {
        validSafety = "valid";
      }
    }
    let validImg = "valid";
    if (this.imageFiles.length < 3 || this.imageFiles.length > 5) {
      validImg = "not-valid";
    }
    let validDesc = "valid";
    if (this.facilityMainInfo.facilityName == "" || this.facilityMainInfo.facilityName == undefined) {
      validDesc = "not-valid";
    }
    if (this.facilityMainInfo.facilityDesc == "" || this.facilityMainInfo.facilityDesc == undefined) {
      validDesc = "not-valid";
    }


    console.log("validReg: ", validReg);
    console.log("validOffer: ", validOffer);
    console.log("validAmenity: ", validAmenity);
    console.log("validSafety: ", validSafety);
    console.log("validDesc: ", validDesc);
    console.log("validImg: ", validImg);
    if (validReg == "valid" && validOffer == "valid" && validAmenity == "valid" && validSafety == "valid" && validDesc == "valid" && validImg == "valid") {
      this.facilityUUid = uuidv4();
      // let hours;
      // let timeIdentity = "AM";
      // if(dateNow.getHours() > 12){
      //   hours = dateNow.getHours() - 12;
      //   timeIdentity = "PM";
      // }
      let dateNow = new Date();
      let time = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
      let day = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`
      console.log(time, day);

      this.facilityInfo = {
        userId: sessionStorage.getItem("userId"),
        facilityId: this.facilityUUid,
        typeOfPlace: this.facilityMainInfo.facilityType,
        facilityStreet: this.address.street,
        facilityBrgy: this.address.barangay,
        facilityCity: this.address.city,
        facilityState: this.address.state,
        facilityZip: this.address.zipcode,
        roomNum: this.basicInput.room,
        roomBooked: 0,
        playground: this.basicInput.playground,
        petBed: this.basicInput.bed,
        petBathroom: this.basicInput.bathroom,
        facilityTitle: this.facilityMainInfo.facilityName,
        facilityDesc: this.facilityMainInfo.facilityDesc,
        priceRate: this.setPrice,
        isApproved: false,
        handledPersonally: this.inputAccomodation[0],
        privateRoom: this.inputAccomodation[1],
        sharedRoom: this.inputAccomodation[2],
        createdTime: time,
        createdDay: day,
        isEvaluated: false
      };
      this.facilityOffer = {
        facilityId: this.facilityUUid,
        petGroom: this.inputOffer[4],
        petBath: this.inputOffer[1],
        petWalk: this.inputOffer[2],
        petPool: this.inputOffer[7],
        petAircon: this.inputOffer[5],
        petCCTV: this.inputOffer[6],
        petVet: this.inputOffer[0],
        petPickup: this.inputOffer[3],
        isApproved: false,
        isEvaluated: false
      };
      this.facilityAmenity = {
        facilityId: this.facilityUUid,
        freePark: this.inputAmenity[1],
        wifi: this.inputAmenity[0],
        paidPark: this.inputAmenity[2],
        waitingArea: this.inputAmenity[3],
        isApproved: false,
        isEvaluated: false
      }
      this.facilitySafety = {
        facilityId: this.facilityUUid,
        safetySmoke: this.inputSafety[0],
        safetyFire: this.inputSafety[1],
        safetyKit: this.inputSafety[2],
        isApproved: false,
        isEvaluated: false
      }
      this.facilityImages.facilityId = this.facilityUUid;
      this.facilityImages.isApproved = false;
      this.facilityImages.isEvaluated = false;
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.addImages.push(response);

        for (let i = 0; i < this.addImages.length; i++) {
          this.facilityImages['image' + (i + 1)] = this.addImages[i].toString();
        }

      };
      // this.facilityImages = {
      //   facilityId : this.facilityUUid,
      //   image1 : this.addImages[0],
      //   image2 : this.addImages[1],
      //   image3 : this.addImages[2],
      //   image4 : this.addImages[3],
      //   image5 : this.addImages[4]
      // }
      await new Promise(f => setTimeout(f, 1000));

      if (a == 'register') {
        console.log("Facility Info: ", this.facilityInfo);
        console.log("Facility Offer: ", this.facilityOffer);
        console.log("Facility Amenity: ", this.facilityAmenity);
        console.log("Facility Safety: ", this.facilitySafety);
        console.log("Facility Images: ", this.facilityImages);

        Swal.fire({
          title: "Are you sure you want to register this facility?",
          text: "You can't undo this action",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#BB00B4"
        }).then((action) => {
          if (action.isConfirmed == true) {
            this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data: Users[]) => {
              this.user = data;
              this.user.airpets = true;

              this.userApi.registerUser(this.user).subscribe();

              this.facilityApi.registerFacilityInfo(this.facilityInfo).subscribe();
              this.facilityApi.registerFacilityOffer(this.facilityOffer).subscribe();
              this.facilityApi.registerFacilityAmenity(this.facilityAmenity).subscribe();
              this.facilityApi.registerFacilitySafety(this.facilitySafety).subscribe();
              this.facilityApi.registerFacilityImages(this.facilityImages).subscribe();

              Swal.fire({
                text: "Successfully registered your Facility!",
                icon: "success",
                confirmButtonColor: "#BB00B4"
              }).then(() => {
                this.router.navigate(['']);
              })
            })
          }
        })
      }
    } else {
      Swal.fire({
        text: "Fill up all the required fields!",
        icon: "warning",
        confirmButtonColor: "#BB00B4"
      })
    }
    // for(let i = 0; i < this.hotelImages.length; i++){
    //   this.newImages['image_'+ i] = this.hotelImages[i];
    // }
    // if(a = 'register'){
    //   console.log("Hotel Info: ", this.hotelInfo);
    //   console.log("Place Offer: ", this.newOffer);
    //   console.log("Amenity: ", this.newAmenity);
    //   console.log("Safety: ", this.newSafety);
    //   console.log("Images: ", this.newImages);
    // }
  }


  test() {
    // this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data:Users[]) => {
    //   console.log(data);
    //   this.user = data;
    //   console.log(this.user.airpets);
    //   this.user.airpets = true;

    //   this.userApi.registerUser(this.user).subscribe();
    // })
  }

  openTerms() {
    this.otherService.newAction(true);
  }
}
