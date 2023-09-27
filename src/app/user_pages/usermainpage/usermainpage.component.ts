import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BookingInfo } from 'src/app/models/booking-info.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api.service';
import { BookingapiService } from 'src/app/services/bookingapi.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { PetProfile } from 'src/app/models/pet-profile.model';
import { OtherServiceService } from 'src/app/services/other-service.service';
import { Subscription } from 'rxjs';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating.model';
import { Location } from '@angular/common';
const URL = 'http://localhost:8081/api/upload';
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success px-3 p-1',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-usermainpage',
  templateUrl: './usermainpage.component.html',
  styleUrls: ['./usermainpage.component.css']
})
export class UsermainpageComponent implements OnInit {
  user: any = {};
  profilepic: any;
  hotelInfo: any = {};

  editModal: boolean = false;
  buttonState: string = 'disabled';
  buttonState2: string = 'disabled';

  editProfDefault: any = {};
  editProf: any = {};
  password: string = '';
  changepassword: any = {};

  disabled1: boolean = true;
  disabled2: boolean = true;

  hideError: string = 'hidden';
  passError: string = 'lorem ipsum';

  airpetsBtn: string = 'not-registered';
  airpets!: boolean;

  modalProf: string = 'modalHidden';
  filename: string = "No File Selected...";
  profilepicView: string = '';
  newImgFile: string = '';

  notNull: boolean = false;

  transactionsNone: boolean = true;
  bookingTransactionsInfo: any = [];
  facilityInfos: any = [];

  isNotActive: boolean[] = [];

  petModal: boolean = false;
  petHeader: string = "Pet Profile";
  petProfile: boolean = true;
  petInput: any = {};
  petfilename: string = "No File Selected...";
  newImgFilePet: string = '';
  petsBooked: any = [];

  noPet: boolean = true;
  petsRegisteredInfos: any = [];
  petsRegisteredView: any = [];

  subscription!: Subscription;
  message: string = '';

  cancelBtn: string[] = [];
  cancelDisabled: boolean[] = [];

  transactions: any = [];
  history: any = [];
  historyReversed: any = [];
  successfulTransactions: any = [];

  historyNotExist: boolean = true;
  historyFacilityInfo: any = [];
  historyFacilityInfoReversed: any = [];
  historyPetInfo: any = [];
  historyPetInfoReversed: any = [];
  historyRatingText: String[] = [];
  historyRatingColor: String[] = [];

  loadingTransaction: String = "";
  loadingHistory: String = "";

  modalRate: Boolean = false;
  rating = 0;
  comment = "";
  maxChars = 200;
  ratingBookingInfos: any = [];
  ratingFacilityInfos: any = [];

  visible: String = "not-visible";

  facilityInfo: any = {};
  facilityNotNull: boolean = false;

  passwordView: string = 'password';
  passwordText: string = 'visibility';

  passwordViewChangePass: string[] = ['password', 'password'];
  passwordTextChangePass: string[] = ['visibility', 'visibility'];

  transactionFilterStyle: string[] = ['activeFilter', 'activeFilter'];
  historyFilterStyle: string[] = ['activeFilter', 'activeFilter'];

  constructor(private apiURL: ApiService, private userApi: UserapiService, private router: Router,
    private bookingApi: BookingapiService, private facilityApi: FacilityapiService,
    private otherService: OtherServiceService, private ratingApi: RatingService, private location: Location) {

    if (this.router.getCurrentNavigation()?.extras.state != undefined) {
      this.petModal = this.router.getCurrentNavigation()?.extras.state!.data;
      this.petHeader = "Add Pet";
      this.petProfile = false;
    }
  }

  async ngOnInit(): Promise<void> {

    this.uploader.onAfterAddingFile = (file) => {
      console.log(file);
      this.filename = file._file.name.toString();
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // this.user.imgUrl = response;
      console.log(response);
    };

    this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((user: Users[]) => {
      this.user = user;

      if (this.user.airpets == "true") {
        this.airpetsBtn = '';
        this.airpets = true;
      } else if (this.user.airpets == "false") {
        this.airpetsBtn = 'not-registered';
        this.airpets = false;
      }

      if (this.user.imgUrl == null || this.user.imgUrl == '') {
        this.profilepic = "../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
        this.profilepicView = "../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
      } else {
        this.profilepic = `../uploads/${this.user.imgUrl}`;
        this.profilepicView = `../uploads/${this.user.imgUrl}`;
      }

      this.editProfDefault.firstName = this.user.firstName;
      this.editProfDefault.lastName = this.user.lastName;
      this.editProfDefault.username = this.user.userName;
      this.editProfDefault.email = this.user.emailAddress;

      this.editProf = this.editProfDefault;

      this.getFacility();
    })

    this.getPets();
    this.getTransactions('getAll');
    this.getHistory('getAll');

    this.notNull = true;

    this.petInput.petType = "Dog";
    this.petInput.petGender = "Male";
  }

  getPets() {
    this.userApi.getPetsByUserIdAndPetDeleted(sessionStorage.getItem("userId")!, "false").subscribe(async (data: PetProfile[]) => {
      this.petsRegisteredInfos = data;
      this.petsRegisteredView = data;
      if (this.petsRegisteredInfos.length != 0) {
        this.noPet = false;

        await new Promise(f => setTimeout(f, 500));
        for (let i = 0; i < this.petsRegisteredInfos.length; i++) {
          if (this.petsRegisteredInfos[i]["bookingStatus"] == "notBooked") {
            this.petsRegisteredView[i]["bookingStatus"] = "NOT BOOKED";
          } else if (this.petsRegisteredInfos[i]["bookingStatus"] == "booked") {
            this.petsRegisteredView[i]["bookingStatus"] = "BOOKED";
          }
        }
      } else {
        this.noPet = true;
      }
    })
  }

  getTransactions(filter: string) {
    this.bookingTransactionsInfo = [];
    this.transactionsNone = true;
    this.loadingTransaction = "Loading...";

    let dateNow = new Date();
    let day = ("0" + dateNow.getDate()).slice(-2);
    let month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    let year = dateNow.getFullYear();
    if (filter == 'getAll') {
      this.bookingApi.getAllBookingInfoByUserIdAndIsCompleted(sessionStorage.getItem("userId")!, "false").subscribe(async (data: BookingInfo[]) => {
        this.bookingTransactionsInfo = data;

        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          if (this.bookingTransactionsInfo[i].bookingStatus == "Active") {
            this.isNotActive[i] = false;
          } else if (this.bookingTransactionsInfo[i].bookingStatus == "Reserved") {
            this.isNotActive[i] = true;
          }
          let yearBooked = this.bookingTransactionsInfo[i].checkinDate.slice(0, 4);
          let monthBooked = this.bookingTransactionsInfo[i].checkinDate.slice(5, 7);
          let dayBooked = this.bookingTransactionsInfo[i].checkinDate.slice(8);
          if (yearBooked == year) {
            if (monthBooked == month) {
              if (dayBooked > day) {
                this.cancelBtn[i] = "cancelActive";
                this.cancelDisabled[i] = false;
              } else {
                this.cancelBtn[i] = "cancelInactive";
                this.cancelDisabled[i] = true;
              }
            } else if (monthBooked < month) {
              this.cancelBtn[i] = "cancelInactive";
              this.cancelDisabled[i] = true;
            } else {
              this.cancelBtn[i] = "cancelActive";
              this.cancelDisabled[i] = false;
            }

          }
          this.userApi.getPetById(this.bookingTransactionsInfo[i].petId).subscribe((data: PetProfile[]) => {
            this.petsBooked[i] = data;

            this.facilityApi.getFacilityInfoByFacilityId(this.bookingTransactionsInfo[i].facilityId).subscribe((data: FacilityInfo[]) => {
              this.facilityInfos[i] = data;
            })
          })
        }
        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          this.loadingTransaction = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.bookingTransactionsInfo.length != 0) {
          this.transactionsNone = false;
        } else if (this.bookingTransactionsInfo.length == 0 && this.transactionFilterStyle[0] == 'activeFilter' && this.transactionFilterStyle[1] == 'activeFilter') {
          this.loadingTransaction = "No Current Reservation...";
        }
      })
    } else if (filter == 'getActive') {
      this.bookingApi.getAllBookingInfoByUserIdAndBookingStatus(sessionStorage.getItem('userId')!, 'Active').subscribe(async (data: BookingInfo[]) => {
        this.bookingTransactionsInfo = data;

        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          if (this.bookingTransactionsInfo[i].bookingStatus == "Active") {
            this.isNotActive[i] = false;
          } else if (this.bookingTransactionsInfo[i].bookingStatus == "Reserved") {
            this.isNotActive[i] = true;
          }
          console.log(this.isNotActive[i]);
          let yearBooked = this.bookingTransactionsInfo[i].checkinDate.slice(0, 4);
          let monthBooked = this.bookingTransactionsInfo[i].checkinDate.slice(5, 7);
          let dayBooked = this.bookingTransactionsInfo[i].checkinDate.slice(8);
          if (yearBooked == year) {
            if (monthBooked == month) {
              if (dayBooked > day) {
                this.cancelBtn[i] = "cancelActive";
                this.cancelDisabled[i] = false;
              } else {
                this.cancelBtn[i] = "cancelInactive";
                this.cancelDisabled[i] = true;
              }
            } else if (monthBooked < month) {
              this.cancelBtn[i] = "cancelInactive";
              this.cancelDisabled[i] = true;
            } else {
              this.cancelBtn[i] = "cancelActive";
              this.cancelDisabled[i] = false;
            }

          }
          this.userApi.getPetById(this.bookingTransactionsInfo[i].petId).subscribe((data: PetProfile[]) => {
            this.petsBooked[i] = data;

            this.facilityApi.getFacilityInfoByFacilityId(this.bookingTransactionsInfo[i].facilityId).subscribe((data: FacilityInfo[]) => {
              this.facilityInfos[i] = data;
            })
          })
        }
        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          console.log(this.bookingTransactionsInfo.length);
          this.loadingTransaction = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.bookingTransactionsInfo.length != 0) {
          this.transactionsNone = false;
        } else if (this.bookingTransactionsInfo.length == 0 && this.transactionFilterStyle[0] == 'activeFilter' && this.transactionFilterStyle[1] == 'notActiveFilter') {
          this.loadingTransaction = "No active transactions..."
        }
      });
    } else if (filter == 'getReserved') {
      this.bookingApi.getAllBookingInfoByUserIdAndBookingStatus(sessionStorage.getItem('userId')!, 'Reserved').subscribe(async (data: BookingInfo[]) => {
        this.bookingTransactionsInfo = data;

        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          if (this.bookingTransactionsInfo[i].bookingStatus == "Active") {
            this.isNotActive[i] = false;
          } else if (this.bookingTransactionsInfo[i].bookingStatus == "Reserved") {
            this.isNotActive[i] = true;
          }
          let yearBooked = this.bookingTransactionsInfo[i].checkinDate.slice(0, 4);
          let monthBooked = this.bookingTransactionsInfo[i].checkinDate.slice(5, 7);
          let dayBooked = this.bookingTransactionsInfo[i].checkinDate.slice(8);
          if (yearBooked == year) {
            if (monthBooked == month) {
              if (dayBooked > day) {
                this.cancelBtn[i] = "cancelActive";
                this.cancelDisabled[i] = false;
              } else {
                this.cancelBtn[i] = "cancelInactive";
                this.cancelDisabled[i] = true;
              }
            } else if (monthBooked < month) {
              this.cancelBtn[i] = "cancelInactive";
              this.cancelDisabled[i] = true;
            } else {
              this.cancelBtn[i] = "cancelActive";
              this.cancelDisabled[i] = false;
            }

          }
          this.userApi.getPetById(this.bookingTransactionsInfo[i].petId).subscribe((data: PetProfile[]) => {
            this.petsBooked[i] = data;

            this.facilityApi.getFacilityInfoByFacilityId(this.bookingTransactionsInfo[i].facilityId).subscribe((data: FacilityInfo[]) => {
              this.facilityInfos[i] = data;
            })
          })
        }
        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          this.loadingTransaction = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.bookingTransactionsInfo.length != 0) {
          this.transactionsNone = false;
        } else if (this.bookingTransactionsInfo.length == 0 && this.transactionFilterStyle[0] == 'notActiveFilter' && this.transactionFilterStyle[1] == 'activeFilter') {
          this.loadingTransaction = "No reserved transactions..."
        }
      });
    } else if (filter == 'getNone') {
      this.loadingTransaction = "Please select a filter";
      this.bookingApi.getAllBookingInfoByUserIdAndBookingStatus(sessionStorage.getItem('userId')!, 'none').subscribe(async (data: BookingInfo[]) => {
        this.bookingTransactionsInfo = data;

        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          if (this.bookingTransactionsInfo[i].bookingStatus == "Active") {
            this.isNotActive[i] = false;
          } else if (this.bookingTransactionsInfo[i].bookingStatus == "Reserved") {
            this.isNotActive[i] = true;
          }
          console.log(this.isNotActive[i]);
          let yearBooked = this.bookingTransactionsInfo[i].checkinDate.slice(0, 4);
          let monthBooked = this.bookingTransactionsInfo[i].checkinDate.slice(5, 7);
          let dayBooked = this.bookingTransactionsInfo[i].checkinDate.slice(8);
          if (yearBooked == year) {
            if (monthBooked == month) {
              if (dayBooked > day) {
                this.cancelBtn[i] = "cancelActive";
                this.cancelDisabled[i] = false;
              } else {
                this.cancelBtn[i] = "cancelInactive";
                this.cancelDisabled[i] = true;
              }
            } else if (monthBooked < month) {
              this.cancelBtn[i] = "cancelInactive";
              this.cancelDisabled[i] = true;
            } else {
              this.cancelBtn[i] = "cancelActive";
              this.cancelDisabled[i] = false;
            }

          }
          this.userApi.getPetById(this.bookingTransactionsInfo[i].petId).subscribe((data: PetProfile[]) => {
            this.petsBooked[i] = data;

            this.facilityApi.getFacilityInfoByFacilityId(this.bookingTransactionsInfo[i].facilityId).subscribe((data: FacilityInfo[]) => {
              this.facilityInfos[i] = data;
            })
          })
        }
        for (let i = 0; i < this.bookingTransactionsInfo.length; i++) {
          console.log(this.bookingTransactionsInfo.length);
          // this.loadingTransaction = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.bookingTransactionsInfo.length != 0) {
          this.transactionsNone = false;
        }
        this.loadingTransaction = "Please select a filter";
      });
    }

  }

  getHistory(filter: string) {
    this.history = [];
    this.historyNotExist = true;
    // this.loadingHistory = "No History yet...";
    this.loadingHistory = "";

    if (filter == "getAll") {
      this.bookingApi.getAllBookingInfoByUserIdAndIsCompleted(sessionStorage.getItem("userId")!, "true").subscribe(async (data: BookingInfo[]) => {
        this.history = data;

        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].bookingStatus == "Completed") {
            this.successfulTransactions[i] = true;
          } else {
            this.successfulTransactions[i] = false;
          }
          this.facilityApi.getFacilityInfoByFacilityId(this.history[i].facilityId).subscribe((data: FacilityInfo[]) => {
            this.historyFacilityInfo[i] = data;
          })
          this.userApi.getPetById(this.history[i].petId).subscribe((data: PetProfile[]) => {
            this.historyPetInfo[i] = data;
          })
        }

        for (let i = 0; i < this.history.length; i++) {
          this.loadingHistory = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.history.length != 0) {
          this.historyNotExist = false;
        } else if (this.history.length == 0 && this.historyFilterStyle[0] == 'activeFilter' && this.historyFilterStyle[1] == 'activeFilter') {
          this.loadingHistory = "No History yet...";
        }
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].isRated == "true") {
            this.historyRatingText[i] = "Already Rated";
            this.historyRatingColor[i] = "isRated";
          } else if (this.history[i].isRated == "false") {
            this.historyRatingText[i] = "Rate your Experience";
            this.historyRatingColor[i] = "isNotRated";
          }
        }
      })
    } else if (filter == "getCompleted") {
      this.bookingApi.getAllBookingInfoByUserIdAndBookingStatus(sessionStorage.getItem("userId")!, "Completed").subscribe(async (data: BookingInfo[]) => {
        this.history = data;

        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].bookingStatus == "Completed") {
            this.successfulTransactions[i] = true;
          } else {
            this.successfulTransactions[i] = false;
          }
          this.facilityApi.getFacilityInfoByFacilityId(this.history[i].facilityId).subscribe((data: FacilityInfo[]) => {
            this.historyFacilityInfo[i] = data;
          })
          this.userApi.getPetById(this.history[i].petId).subscribe((data: PetProfile[]) => {
            this.historyPetInfo[i] = data;
          })
        }

        for (let i = 0; i < this.history.length; i++) {
          this.loadingHistory = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.history.length != 0) {
          this.historyNotExist = false;
        } else if (this.history.length == 0 && this.historyFilterStyle[0] == 'activeFilter' && this.historyFilterStyle[1] == 'notActiveFilter') {
          this.loadingHistory = "No completed transactions yet..."
        }
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].isRated == "true") {
            this.historyRatingText[i] = "Already Rated";
            this.historyRatingColor[i] = "isRated";
          } else if (this.history[i].isRated == "false") {
            this.historyRatingText[i] = "Rate your Experience";
            this.historyRatingColor[i] = "isNotRated";
          }
        }
      })
    } else if (filter == "getCanceled") {
      this.bookingApi.getAllBookingInfoByUserIdAndBookingStatus(sessionStorage.getItem("userId")!, "Canceled").subscribe(async (data: BookingInfo[]) => {
        this.history = data;

        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].bookingStatus == "Completed") {
            this.successfulTransactions[i] = true;
          } else {
            this.successfulTransactions[i] = false;
          }
          this.facilityApi.getFacilityInfoByFacilityId(this.history[i].facilityId).subscribe((data: FacilityInfo[]) => {
            this.historyFacilityInfo[i] = data;
          })
          this.userApi.getPetById(this.history[i].petId).subscribe((data: PetProfile[]) => {
            this.historyPetInfo[i] = data;
          })
        }
        
        for (let i = 0; i < this.history.length; i++) {
          this.loadingHistory = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        // while(this.loadingHistory == "" || this.loadingHistory.slice(0,7) == "Loading"){
        //   if(this.loadingHistory.length == 10){
        //     this.loadingHistory = "Loading";
        //   } else{
        //     this.loadingHistory = this.loadingHistory + ".";
        //   }
        //   console.log(this.loadingHistory);
        //   await new Promise(f => setTimeout(f, 500));
        // }
        // for (let i = 0; i < this.history.length; i+3) {
        //   this.loadingHistory = "Loading...";
        //   if(this.loadingHistory.slice(0,7) == "Loading"){
        //     if(this.loadingHistory.length == 10){
        //       this.loadingHistory = this.loadingHistory.slice(0,7);
        //     }else{
        //       this.loadingHistory = this.loadingHistory + ".";
        //     }
        //   }
        //   await new Promise(f => setTimeout(f, 500));
        //   console.log(this.loadingHistory);
        // }
        if (this.history.length != 0) {
          this.historyNotExist = false;
        } else if (this.history.length == 0 && this.historyFilterStyle[0] == 'notActiveFilter' && this.historyFilterStyle[1] == 'activeFilter') {
          this.loadingHistory = "No canceled transactions yet..."
        }
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].isRated == "true") {
            this.historyRatingText[i] = "Already Rated";
            this.historyRatingColor[i] = "isRated";
          } else if (this.history[i].isRated == "false") {
            this.historyRatingText[i] = "Rate your Experience";
            this.historyRatingColor[i] = "isNotRated";
          }
        }
      })
    } else if (filter == "getNone") {
      this.loadingHistory = "Please select a filter";
      this.bookingApi.getAllBookingInfoByUserIdAndBookingStatus(sessionStorage.getItem("userId")!, "None").subscribe(async (data: BookingInfo[]) => {
        this.history = data;

        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].bookingStatus == "Completed") {
            this.successfulTransactions[i] = true;
          } else {
            this.successfulTransactions[i] = false;
          }
          this.facilityApi.getFacilityInfoByFacilityId(this.history[i].facilityId).subscribe((data: FacilityInfo[]) => {
            this.historyFacilityInfo[i] = data;
          })
          this.userApi.getPetById(this.history[i].petId).subscribe((data: PetProfile[]) => {
            this.historyPetInfo[i] = data;
          })
        }

        for (let i = 0; i < this.history.length; i++) {
          // this.loadingHistory = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.history.length != 0) {
          this.historyNotExist = false;
        }
        this.loadingHistory = "Please select a filter";
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].isRated == "true") {
            this.historyRatingText[i] = "Already Rated";
            this.historyRatingColor[i] = "isRated";
          } else if (this.history[i].isRated == "false") {
            this.historyRatingText[i] = "Rate your Experience";
            this.historyRatingColor[i] = "isNotRated";
          }
        }
      })
    }

  }

  getFacility() {
    this.facilityApi.getFacilityInfoByFacilityId(this.user.facilityId).subscribe(async (data: FacilityInfo[]) => {
      this.facilityInfo = data;

      await new Promise(f => setTimeout(f, 500));
      this.facilityNotNull = true;


    })
  }

  // loading(where:any){
  //   if(where == "canceled"){
  //     if()
  //   }
  // }

  onCLickEditProfile(i: number) {
    if (i == 0) {
      this.editModal = !this.editModal;
    } else if (i == 1) {
      this.editModal = !this.editModal;
      this.passwordView = 'password';
      this.passwordText = 'visibility';

      this.passwordViewChangePass = ['password', 'password'];
      this.passwordTextChangePass = ['visibility', 'visibility'];
      this.hideError = "hidden";
      this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data) => {
        this.user = data;

        this.editProfDefault.firstName = this.user.firstName;
        this.editProfDefault.lastName = this.user.lastName;
        this.editProfDefault.username = this.user.userName;
        this.editProfDefault.email = this.user.emailAddress;
        this.editProf = this.editProfDefault;
      })
      this.password = '';
      this.changepassword = {};
    }
  }

  inputPass() {
    if (this.password) {
      this.buttonState = 'enabled';
      this.disabled1 = false;
    } else {
      this.buttonState = 'disabled';
      this.disabled1 = true;
    }
  }

  onEditProf() {
    if (this.password == this.user.password) {
      if (this.editProf.firstName != '' && this.editProf.firstName != null) {
        this.user.firstName = this.editProf.firstName;
      }
      if (this.editProf.lastName != '' && this.editProf.lastName != null) {
        this.user.lastName = this.editProf.lastName;
      }
      if (this.editProf.username != '' && this.editProf.username != null) {
        if (this.editProf.username.match(/^[a-z0-9]+$/i)) {
          Swal.fire({
            text: "Username should be alphanumeric!",
            icon: "warning",
            confirmButtonColor: "#BB00B4"
          })
          return;
        } else {
          this.user.userName = this.editProf.username;
        }
      }
      if (this.editProf.email != '' && this.editProf.email != null) {
        this.user.emailAddress = this.editProf.email;
      }

      console.log(this.user);
      this.userApi.registerUser(this.user).subscribe();

      Swal.fire({
        text: "Succesfully edited profile!",
        icon: "success",
        confirmButtonColor: "#BB00B4"
      }).then(() => {
        this.editModal = !this.editModal;
        this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data) => {
          this.user = data;

          this.editProfDefault.firstName = this.user.firstName;
          this.editProfDefault.lastName = this.user.lastName;
          this.editProfDefault.username = this.user.userName;
          this.editProfDefault.email = this.user.emailAddress;

          this.editProf = this.editProfDefault;
        })
        this.password = '';
        this.changepassword = {};
      })
    } else {
      Swal.fire({
        text: "Wrong password",
        icon: "error",
        confirmButtonColor: "#BB00B4"
      })
      return;
    }
  }

  inputRenewPass() {
    this.hideError = 'hidden';
    if (this.changepassword.current && this.changepassword.new && this.changepassword.new2) {
      this.buttonState2 = 'enabled';
      this.disabled2 = false;
    } else {
      this.buttonState2 = 'disabled';
      this.disabled2 = true;
    }
  }

  onCLickChangePass() {
    if (this.user.password == this.changepassword.current) {
      if (this.changepassword.new == this.changepassword.new2) {
        if (!this.changepassword.new.match(/^[a-z0-9]+$/i)) {
          if (this.user.password != this.changepassword.new) {
            this.user.password = this.changepassword.new;
            this.userApi.registerUser(this.user).subscribe(() => {
              Swal.fire({
                text: "Successfully changed password",
                icon: "success",
                confirmButtonColor: "#BB00B4"
              }).then(() => {
                this.editModal = false;
                this.editProf = {};
                this.password = '';
                this.changepassword = {};
              })
            });
          } else {
            this.hideError = '';
            this.passError = '(Password cannot be reused. Please choose a different password)';
          }
        } else {
          this.hideError = '';
          this.passError = '(Password must consist of alphanumeric characters)';
        }
      } else {
        this.hideError = '';
        this.passError = '(The new pasword should match)';
      }
    } else {
      this.hideError = '';
      this.passError = '(Wrong current password)';
    }
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  onClickPic(a: string) {
    if (a == "show") {
      this.modalProf = "";
    } else if (a == "close") {
      this.modalProf = "hidden";
      this.filename = "No File Selected...";
      if (this.user.imgUrl == null || this.user.imgUrl == '') {
        this.profilepicView = "../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
      } else {
        this.profilepicView = `../uploads/${this.user.imgUrl}`;
      }
    }

  }

  async onSelectPic() {
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.filename.split('.')[1]);
    let getExtention = this.filename.split('.')[1];
    let ext = getExtention.toLowerCase();

    if (ext == 'jpg' || ext == 'gif' || ext == 'bmp' || ext == 'png') {
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = async (item: any, response: any, status: any, headers: any) => {
        console.log(response);
        await new Promise(f => setTimeout(f, 1000));
        this.profilepicView = `../uploads/${response}`;
        this.newImgFile = response;
      };
    } else {
      Swal.fire({
        title: "Invalid file type!",
        icon: 'error',
        confirmButtonColor: '#BB00B4'
      })
    }

  }

  async confirmUpload() {
    await new Promise(f => setTimeout(f, 1000));
    this.user.imgUrl = this.newImgFile;
    this.userApi.registerUser(this.user).subscribe(() => {
      swalWithBootstrapButtons.fire({
        text: 'Successfully Updated Profile Picture!',
        width: 300,
        icon: 'success',
        confirmButtonColor: '#4BB543'
      }).then(() => {
        this.modalProf = "hidden";
        this.filename = 'No File Selected...';
        if (this.user.imgUrl != null || this.user.imgUrl != '') {
          this.profilepic = `../uploads/${this.user.imgUrl}`;
        }
        this.otherService.newActionChangeProfPic(`../uploads/${this.user.imgUrl}`);
      })
    });
  }

  onClickAirpets() {
    if (this.user.airpets == "true") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/airpets-your-home']);
    }
  }

  viewCCTV(transactionId: any) {
    console.log(transactionId);
    this.router.navigate([transactionId + "/view-cctv"])
  }

  onClickAddPetBtn() {
    if (this.petHeader == "Pet Profile") {
      this.petHeader = "Add Pet";
      this.petProfile = false;
    }
  }

  onClickViewPet(a: string) {
    this.petModal = !this.petModal;
    this.petInput = {}
    this.petInput.petType = 'Dog';
    this.petInput.petGender = 'Male';
    this.petHeader = "Pet Profile";
    this.petProfile = true;
  }

  petBack() {
    this.petProfile = true;
    this.petHeader = "Pet Profile";
  }

  async petPicName(event: any) {
    await new Promise(f => setTimeout(f, 1000));
    this.petfilename = this.filename;
    console.log(this.petfilename);
  }

  async onSelectPicPet(event: any) {
    console.log(event);
  }

  petImgName() {
    this.petfilename = this.filename;
  }

  async registerPet() {
    await new Promise(f => setTimeout(f, 1000));
    let spacePetName = '';
    let spacePetBreed = '';

    this.uploader.uploadAll();
    this.uploader.onCompleteItem = async (item: any, response: any, status: any, headers: any) => {
      console.log(response);
      await new Promise(f => setTimeout(f, 1000));
      this.newImgFilePet = response;
      console.log(this.newImgFilePet);

      if (this.petInput.petName != null) {
        let petNameL = this.petInput.petName.length;
        console.log(petNameL);
        for (let a = 0; a < petNameL; a++) {
          spacePetName += ' ';
        }
      }
      if (this.petInput.petBreed != null) {
        let petBreedL = this.petInput.petBreed.length;
        console.log(petBreedL);
        for (let a = 0; a < petBreedL; a++) {
          spacePetBreed += ' ';
        }
      }
      if (this.petInput.petName != null && this.petInput.petBreed != null) {
        if (this.petInput.petName != spacePetName && this.petInput.petBreed != spacePetBreed) {
          if (this.filename != 'No File Selected...') {
            await new Promise(f => setTimeout(f, 1000));
            this.petInput.petImg = this.newImgFilePet;
            this.petInput.petId = uuidv4();
            this.petInput.userId = this.user.userId;
            this.petInput.bookingStatus = 'notBooked';
            this.petInput.petDeleted = 'false';
            // console.log(this.petInput);
            this.userApi.savePet(this.petInput).subscribe((data: any) => {
              this.userApi.getPetsByUserIdAndPetDeleted(sessionStorage.getItem("userId")!, "false").subscribe(async (data: PetProfile[]) => {
                this.petsRegisteredInfos = data;
                if (this.petsRegisteredInfos != []) {
                  this.noPet = false;
                }

                this.petsRegisteredView = data;
                await new Promise(f => setTimeout(f, 500));
                for (let i = 0; i < this.petsRegisteredInfos.length; i++) {
                  if (this.petsRegisteredInfos[i].bookingStatus == "notBooked") {
                    this.petsRegisteredView[i].bookingStatus = "NOT BOOKED";
                  } else if (this.petsRegisteredInfos[i].bookingStatus == "booked") {
                    this.petsRegisteredView[i].bookingStatus = "BOOKED";
                  }
                }

                console.log(this.petsRegisteredView[0].bookingStatus);
                console.log(this.noPet)
              })
            });
            swalWithBootstrapButtons.fire({
              text: 'Successfully Registered Pet',
              width: 300,
              icon: 'success',
              confirmButtonColor: '#4BB543'
            })
            this.petModal = false;
            this.filename = 'No File Selected...';
          }
        } else {
          // alert("Incorrect input!");

        }
      };
    }
  }

  onCancelBooking(transactionId: String) {
    Swal.fire({
      title: "Do you want to cancel the accomodation?",
      icon: "warning",
      text: "You cannot undo this action",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#BB00B4",
      width: 500
    }).then((action) => {
      if (action.isConfirmed == true) {
        let transaction: any;
        this.bookingApi.getBookingInfoByTransactionId(transactionId).subscribe((data: BookingInfo[]) => {
          transaction = data;

          transaction.bookingStatus = "Canceled";
          transaction.isCompleted = true;

          let pet: any;
          this.userApi.getPetById(transaction.petId).subscribe((data: PetProfile[]) => {
            pet = data;

            pet.bookingStatus = "notBooked";

            console.log(pet);
            console.log(transaction);

            this.bookingApi.addBookingInfo(transaction).subscribe(() => {
              this.userApi.savePet(pet).subscribe(() => {
                Swal.fire({
                  text: "Successfully canceled Booking",
                  icon: "success",
                  confirmButtonColor: "#BB00B4"
                }).then(() => {
                  this.getTransactions('getAll');
                  this.getHistory('getAll');
                })
              });
            });
          })
        })

      }
    })
  }

  seeMore() {
    console.log(this.visible);
    if (this.visible == "not-visible") {
      this.visible = "visible";
    } else {
      this.visible = "not-visible";
    }

  }

  onClickRating(transactionId: String, isRated: String) {
    if (isRated == "false") {
      this.modalRate = true;
      this.bookingApi.getBookingInfoByTransactionId(transactionId).subscribe((data: BookingInfo[]) => {
        this.ratingBookingInfos = data;

        this.facilityApi.getFacilityInfoByFacilityId(this.ratingBookingInfos.facilityId).subscribe((data: FacilityInfo[]) => {
          this.ratingFacilityInfos = data;
        })
      })
    } else if (isRated == "true") {
      Swal.fire({
        text: "Already rated!",
        icon: "info",
        width: 300,
        confirmButtonColor: "#BB00B4"
      })
    }
  }

  onClickCloseRating() {
    this.modalRate = false;
    this.rating = 0;
    this.comment = "";
    this.ratingBookingInfos = [];
    this.ratingFacilityInfos = [];
  }

  onInputChange() {
    if (this.comment.length > this.maxChars) {
      this.comment = this.comment.substring(0, this.maxChars);
      Swal.fire({
        text: `Maximum character limit reached. Please limit your text to ${this.maxChars} characters or less.`,
        icon: "warning",
        confirmButtonColor: "#BB00B4"
      })
      // alert(`Maximum character limit reached. Please limit your text to ${this.maxChars} characters or less.`);
      this.onInputChange()
      return;
    }
  }

  indexOfHistory: any;
  getIndexRating(i: number) {
    // console.log(i);
    // console.log(this.history[i]);
    this.indexOfHistory = i;
  }

  submitRating(facilityId: String, petId: String, transactionId: String) {
    if (this.rating != 0) {

      let dateNow = new Date();
      let day = ("0" + dateNow.getDate()).slice(-2);
      let month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
      let hours = ("0" + dateNow.getHours()).slice(-2);
      let minutes = ("0" + dateNow.getMinutes()).slice(-2);
      let seconds = ("0" + dateNow.getSeconds()).slice(-2);
      console.log(`${hours}:${minutes}:${seconds}`);

      var newRating = {
        ratingId: uuidv4(),
        transactionId: transactionId,
        userId: sessionStorage.getItem("userId"),
        facilityId: facilityId,
        petId: petId,
        star: this.rating,
        comment: this.comment,
        ratingDate: `${dateNow.getFullYear()}-${month}-${day}`,
        ratingTime: `${hours}:${minutes}:${seconds}`
      };
      let transactionBeingRated: any = {}
      this.bookingApi.getBookingInfoByTransactionId(transactionId).subscribe((data: BookingInfo[]) => {
        transactionBeingRated = data;

        transactionBeingRated.isRated = true;
        this.bookingApi.addBookingInfo(transactionBeingRated).subscribe();
        this.ratingApi.addRating(newRating).subscribe((data: any) => {
          console.log(data);

          Swal.fire({
            text: "Successfully sent your Rating!",
            icon: "success",
            timer: 2000,
            width: 300,
            showConfirmButton: false,
            allowOutsideClick: false,
          }).then(() => {
            this.modalRate = false;
            this.rating = 0;
            this.comment = "";

            this.history[this.indexOfHistory].isRated = "true";
            this.historyRatingColor[this.indexOfHistory] = "isRated";
            this.historyRatingText[this.indexOfHistory] = "Already Rated";
          })
        })
      })
    } else if (this.rating == 0) {
      Swal.fire({
        text: "Need to input star rating!",
        icon: "warning",
        width: 300,
        confirmButtonColor: "#BB00B4"
      })
    }
  }

  logout() {
    this.userApi.onLogOut();
  }

  onClickDeletePetBtn(pet: any) {
    Swal.fire({
      title: `Are you sure you want to delete ${pet.petName}?`,
      icon: 'warning',
      text: 'You cannot undo this action!',
      showCancelButton: true,
      confirmButtonColor: '#BB00B4'
    }).then((selected: any) => {
      if (selected.isConfirmed == true) {
        pet.petDeleted = true;
        this.userApi.savePet(pet).subscribe(() => {
          Swal.fire({
            text: 'Successfully deleted pet!',
            icon: 'success',
          }).then(() => {
            this.getPets();
          })
        });
      }
    })
  }

  passwordToggle(input: any) {
    if (input == 'editProf') {
      if (this.passwordView == 'password' && this.passwordText == 'visibility') {
        this.passwordView = 'text';
        this.passwordText = 'visibility_off';
      } else {
        this.passwordView = 'password';
        this.passwordText = 'visibility';
      }
    } else if (input == 'changePassOriginal') {
      if (this.passwordViewChangePass[0] == 'password' && this.passwordTextChangePass[0] == 'visibility') {
        this.passwordViewChangePass[0] = 'text';
        this.passwordTextChangePass[0] = 'visibility_off';
      } else {
        this.passwordViewChangePass[0] = 'password';
        this.passwordTextChangePass[0] = 'visibility';
      }
    } else if (input == 'changePassNew') {
      if (this.passwordViewChangePass[1] == 'password' && this.passwordTextChangePass[1] == 'visibility') {
        this.passwordViewChangePass[1] = 'text';
        this.passwordTextChangePass[1] = 'visibility_off';
      } else {
        this.passwordViewChangePass[1] = 'password';
        this.passwordTextChangePass[1] = 'visibility';
      }
    }

  }

  onClickFilter(column: string, btn: string) {
    if (column == 'transaction' && btn == 'active') {
      if (this.transactionFilterStyle[0] == 'activeFilter') {
        this.transactionFilterStyle[0] = 'notActiveFilter';
      } else {
        this.transactionFilterStyle[0] = 'activeFilter';
      }
    } else if (column == 'transaction' && btn == 'reserved') {
      if (this.transactionFilterStyle[1] == 'activeFilter') {
        this.transactionFilterStyle[1] = 'notActiveFilter';
      } else {
        this.transactionFilterStyle[1] = 'activeFilter';
      }
    } else if (column == 'history' && btn == 'completed') {
      if (this.historyFilterStyle[0] == 'activeFilter') {
        this.historyFilterStyle[0] = 'notActiveFilter';
      } else {
        this.historyFilterStyle[0] = 'activeFilter';
      }
    } else if (column == 'history' && btn == 'canceled') {
      if (this.historyFilterStyle[1] == 'activeFilter') {
        this.historyFilterStyle[1] = 'notActiveFilter';
      } else {
        this.historyFilterStyle[1] = 'activeFilter';
      }
    }

    if (column == "transaction") {
      if (this.transactionFilterStyle[0] == 'activeFilter' && this.transactionFilterStyle[1] == 'activeFilter') {
        this.getTransactions('getAll');
      } else if (this.transactionFilterStyle[0] == 'activeFilter' && this.transactionFilterStyle[1] == 'notActiveFilter') {
        this.getTransactions('getActive');
      } else if (this.transactionFilterStyle[0] == 'notActiveFilter' && this.transactionFilterStyle[1] == 'activeFilter') {
        this.getTransactions('getReserved');
      } else if (this.transactionFilterStyle[0] == 'notActiveFilter' && this.transactionFilterStyle[1] == 'notActiveFilter') {
        this.getTransactions('getNone');
      }
    } else if (column == "history") {
      if (this.historyFilterStyle[0] == 'activeFilter' && this.historyFilterStyle[1] == 'activeFilter') {
        this.getHistory('getAll');
      } else if (this.historyFilterStyle[0] == 'activeFilter' && this.historyFilterStyle[1] == 'notActiveFilter') {
        this.getHistory('getCompleted');
      } else if (this.historyFilterStyle[0] == 'notActiveFilter' && this.historyFilterStyle[1] == 'activeFilter') {
        this.getHistory('getCanceled');
      } else if (this.historyFilterStyle[0] == 'notActiveFilter' && this.historyFilterStyle[1] == 'notActiveFilter') {
        this.getHistory('getNone');
      }
    }

  }

  showCancelReason(transactionId:string){
    let bookingData:any;
    this.bookingApi.getBookingInfoByTransactionId(transactionId).subscribe((data:BookingInfo[]) => {
      bookingData = data;
      if(bookingData.facilityCancelNote == null){
        bookingData.facilityCancelNote = 'None';
      }
      Swal.fire({
        text: `${bookingData.facilityCancelNote}`,
        icon: 'info',
        confirmButtonColor: '#BB00B4'
      })
    })
  }
}
