import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingAddons } from 'src/app/models/booking-addons.model';
import { BookingInfo } from 'src/app/models/booking-info.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { PetProfile } from 'src/app/models/pet-profile.model';
import { Users } from 'src/app/models/users';
import { BookingapiService } from 'src/app/services/bookingapi.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { UserapiService } from 'src/app/services/userapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facilitydashboard',
  templateUrl: './facilitydashboard.component.html',
  styleUrls: ['./facilitydashboard.component.css']
})
export class FacilitydashboardComponent implements OnInit {
  facilityInfos: any = {};
  analyticsRooms: any = [
    { name: "Rooms", value: 0 },
    { name: "Reserved", value: 0 },
    { name: "Available", value: 0 }
  ];
  transactions: any = [];
  transactionUsers: any = [];
  transactionAddons: any = [];
  transactionsExist: boolean = false;
  disabledCCTV: boolean[] = [];
  disabledVid: any = [];
  disabledDelete: boolean[] = [];
  disabledDel: any = [];

  activeCCTV: any = [];

  petInfos: any = [];
  cancelBtn: string[] = [];
  cancelDisabled: boolean[] = [];
  notActiveBook: boolean[] = [];
  notActive: boolean[] = [];
  notEndAccomodation: boolean[] = [];

  historyExist: boolean = false;
  historyBookings: any = [];
  statusHistory: any = [];
  historyUsers: any = [];
  historyAddons: any = [];
  historyPetInfos: any = [];

  loadingTransaction: String = "No Current Reservation...";
  loadingHistory: String = "No History yet..."

  guestDogs:number = 0;
  guestCats:number = 0;

  cctvActive:number = 0;
  cctvInActive:number = 0;

  airpetsBtn: string = 'not-registered';
  airpets!: boolean;

  constructor(private userAPI: UserapiService, private facilityURL: FacilityapiService,
    private router: Router, private bookingAPI: BookingapiService) { }

  async ngOnInit(): Promise<void> {
    if (sessionStorage.getItem("airpets") != "true") {
      this.router.navigate(['']);
    }

    let userId = sessionStorage.getItem("userId");
    this.facilityURL.getFacilityInfoByUserId(userId!).subscribe((data: FacilityInfo[]) => {
      this.facilityInfos = data;

      this.analyticsRooms[0].value = this.facilityInfos.roomNum;
    })
    await new Promise(f => setTimeout(f, 300));

    this.getTransactions();
    this.getHistory();

  }

  async getTransactions() {
    this.transactions = [];
    this.transactionUsers = [];
    this.transactionAddons = [];
    this.transactionsExist = false;
    this.disabledCCTV = [];
    this.disabledVid = [];
    this.disabledDelete = [];
    this.disabledDel = [];

    this.petInfos = [];
    this.cancelBtn = [];
    this.cancelDisabled = [];
    this.notActiveBook = [];
    this.notActive = [];
    this.notEndAccomodation = [];

    let dateNow = new Date();
    let day = ("0" + dateNow.getDate()).slice(-2);
    let month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    let year = dateNow.getFullYear();
    await new Promise(f => setTimeout(f, 500));
    this.bookingAPI.getAllBookingInfoByFacilityIdAndIsCompleted(this.facilityInfos.facilityId, "false").subscribe(async (data: BookingInfo[]) => {
      this.transactions = data;

      this.analyticsRooms[1].value = this.transactions.length;
      this.analyticsRooms[2].value = this.facilityInfos.roomNum - this.transactions.length;

      for (let i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].bookingStatus == "Active") {
          this.notActive[i] = false;
          this.notActiveBook[i] = false;
        } else if (this.transactions[i].bookingStatus == "Reserved") {
          this.notActive[i] = true;
          this.notActiveBook[i] = true;
        }
        console.log(this.notActive[i]);
      }

      for (let i = 0; i < this.transactions.length; i++) {
        let yearBooked = this.transactions[i].checkinDate.slice(0, 4);
        let monthBooked = this.transactions[i].checkinDate.slice(5, 7);
        let dayBooked = this.transactions[i].checkinDate.slice(8);
        if (yearBooked == year) {
          if (monthBooked == month) {
            if (dayBooked > day) {
              this.cancelBtn[i] = "cancelActive";
              this.cancelDisabled[i] = false;
              this.notActiveBook[i] = true;
            } else {
              this.cancelBtn[i] = "cancelInactive";
              this.cancelDisabled[i] = true;
              this.notActiveBook[i] = false;
            }
          } else if (monthBooked < month) {
            this.cancelBtn[i] = "cancelActive";
            this.cancelDisabled[i] = false;
            // this.notActiveBook[i] = true;
          } else {
            this.cancelBtn[i] = "cancelInactive";
            this.cancelDisabled[i] = true;
            // this.notActiveBook[i] = false;
          }
        } else if (yearBooked > year) {
          this.cancelBtn[i] = "cancelActive";
          this.cancelDisabled[i] = false;
          // this.notActiveBook[i] = true;
        } else if (yearBooked < year) {
          this.cancelBtn[i] = "cancelInactive";
          this.cancelDisabled[i] = true;
          // this.notActiveBook[i] = false;
        }
      }

      for (let i = 0; i < this.transactions.length; i++) {
        let yearBookedEnd = this.transactions[i].checkoutDate.slice(0, 4);
        let monthBookedEnd = this.transactions[i].checkoutDate.slice(5, 7);
        let dayBookedEnd = this.transactions[i].checkoutDate.slice(8);
        if (yearBookedEnd == year) {
          if (monthBookedEnd == month) {
            if (dayBookedEnd <= day) {
              this.notEndAccomodation[i] = false;
            } else {
              this.notEndAccomodation[i] = true;
            }
          } else if (monthBookedEnd < month) {
            this.notEndAccomodation[i] = false;
          } else {
            this.notEndAccomodation[i] = true;
          }
        } else if (yearBookedEnd > year) {
          this.notEndAccomodation[i] = true;
        } else if (yearBookedEnd < year) {
          this.notEndAccomodation[i] = false;
        }
      }

      for (let i = 0; i < this.transactions.length; i++) {
        this.userAPI.getUserById(this.transactions[i].userId).subscribe((data: Users[]) => {
          this.transactionUsers[i] = data;

          if (this.transactionUsers[i].imgUrl == null || this.transactionUsers[i].imgUrl == '') {
            this.transactionUsers[i].imgUrl = "../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
          } else {
            this.transactionUsers[i].imgUrl = `../uploads/${this.transactionUsers[i].imgUrl}`
          }
        })

        this.bookingAPI.getBookingAddonsByTransactionId(this.transactions[i].transactionId).subscribe((data: BookingAddons[]) => {
          this.transactionAddons[i] = data;

          if (this.transactionAddons[i].petCCTV == "true") {
            this.transactionAddons[i].petCCTV = "Active";
            this.disabledCCTV[i] = false;
            this.disabledVid[i] = "cctvEnabled";
          } else {
            this.transactionAddons[i].petCCTV = "Inactive";
            this.disabledCCTV[i] = true;
            this.disabledVid[i] = "disabled";
          }
        })
      }

      for (let i = 0; i < this.transactions.length; i++) {
        this.userAPI.getPetById(this.transactions[i].petId).subscribe((data: PetProfile[]) => {
          this.petInfos[i] = data;
        })
      }

      //get Today's Guests
      this.guestDogs = 0;
      this.guestCats = 0;
      for(let i = 0; i < this.transactions.length; i++){
        let pet:any;
        this.userAPI.getPetById(this.transactions[i].petId).subscribe((data:PetProfile[]) => {
          pet = data;
  
          if(pet.petType == 'Dog'){
            this.guestDogs = this.guestDogs + 1;
          } else if(pet.petType == 'Cat'){
            this.guestCats = this.guestCats + 1;
          }
        })
      }

      //Get Customer's Active CCTV
      this.cctvActive = 0;
      this.cctvInActive = 0;
      for(let i = 0; i < this.transactions.length; i++){
        let addOnns:any;
        this.bookingAPI.getBookingAddonsByTransactionId(this.transactions[i].transactionId).subscribe((data:BookingAddons[]) => {
          addOnns = data;

          if(addOnns.petCCTV == "true"){
            this.cctvActive = this.cctvActive + 1;
          } else if(addOnns.petCCTV == "false"){
            this.cctvInActive = this.cctvInActive + 1;
          }
        })
      }

      if (this.transactions.length == 0) {
        this.loadingTransaction = "No Current Reservation...";
      }
      for (let i = 0; i < this.transactions.length; i++) {
        this.loadingTransaction = "Loading...";
        await new Promise(f => setTimeout(f, 300));
      }
      if (this.transactions.length != 0) {
        this.transactionsExist = true;
      }
    })
  }

  getHistory() {
    this.historyExist = false;
    this.historyBookings = [];
    this.statusHistory = [];
    this.historyUsers = [];
    this.historyAddons = [];
    this.historyPetInfos = [];
    this.bookingAPI.getAllBookingInfoByFacilityIdAndIsCompleted(this.facilityInfos["facilityId"], "true").subscribe(async (data: BookingInfo[]) => {
      this.historyBookings = data;

      for (let i = 0; i < this.historyBookings.length; i++) {
        if (this.historyBookings[i].bookingStatus == "Completed") {
          this.statusHistory[i] = "statusCompleted";
        } else if (this.historyBookings[i].bookingStatus == "Canceled") {
          this.statusHistory[i] = "statusCanceled";
        }
      }

      for (let i = 0; i < this.historyBookings.length; i++) {
        this.userAPI.getUserById(this.historyBookings[i].userId).subscribe((data: Users[]) => {
          this.historyUsers[i] = data;

          if (this.historyUsers[i].imgUrl == null || this.historyUsers[i].imgUrl == '') {
            this.historyUsers[i].imgUrl = "../assets/icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
          } else {
            this.historyUsers[i].imgUrl = `../uploads/${this.historyUsers[i].imgUrl}`
          }
        })
      }

      for (let i = 0; i < this.historyBookings.length; i++) {
        this.userAPI.getPetById(this.historyBookings[i].petId).subscribe((data: PetProfile[]) => {
          this.historyPetInfos[i] = data;
        })
      }

      for (let i = 0; i < this.historyBookings.length; i++) {
        this.bookingAPI.getBookingAddonsByTransactionId(this.historyBookings[i].transactionId).subscribe((data: BookingAddons[]) => {
          this.historyAddons[i] = data;
        })
      }

      for (let i = 0; i < this.historyBookings.length; i++) {
        this.loadingHistory = "Loading..."
        await new Promise(f => setTimeout(f, 300));
      }
      if (this.historyBookings.length != 0) {
        this.historyExist = true;
      }
    })
  }

  onStartAccomodation(transactionId: string) {
    Swal.fire({
      title: "Do you want to start the accomodation?",
      text: "You cannot undo this action",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#BB00B4",
      width: 500
    }).then((action) => {
      if (action.isConfirmed == true) {
        let bookinfo: any;
        this.bookingAPI.getBookingInfoByTransactionId(transactionId).subscribe((data: BookingInfo[]) => {
          bookinfo = data;

          bookinfo.paymentStatus = "paid";
          bookinfo.bookingStatus = "Active";
          console.log(bookinfo);

          this.bookingAPI.addBookingInfo(bookinfo).subscribe((data: any) => {

            Swal.fire({
              text: "Successfully started Accomodation",
              icon: "success",
              confirmButtonColor: "#BB00B4"
            }).then(() => {
              this.ngOnInit();
            })
          })
        })
      }
    })
  }

  onCancelBooking(transactionId: String) {
    Swal.fire({
      title: "Do you want to cancel the accomodation?",
      icon: "warning",
      // text: "You cannot undo this action",
      text: 'Please input the reason for the cancellation:',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#BB00B4",
      width: 500,
      input: 'textarea'
    }).then((action) => {
      if (action.isConfirmed == true) {
        console.log(action.value);
        let transaction: any;
        this.bookingAPI.getBookingInfoByTransactionId(transactionId).subscribe((data: BookingInfo[]) => {
          transaction = data;

          transaction.bookingStatus = "Canceled";
          transaction.isCompleted = true;
          transaction.facilityCancelNote = action.value;

          let pet: any;
          this.userAPI.getPetById(transaction.petId).subscribe((data: PetProfile[]) => {
            pet = data;

            pet.bookingStatus = "notBooked";

            let facilityInfo: any;
            this.facilityURL.getFacilityInfoByFacilityId(transaction.facilityId).subscribe((data: FacilityInfo[]) => {
              facilityInfo = data;

              let booked: number = +facilityInfo["roomBooked"];
              facilityInfo["roomBooked"] = booked - 1;

              this.bookingAPI.addBookingInfo(transaction).subscribe(() => {
                this.userAPI.savePet(pet).subscribe(() => {
                  this.facilityURL.registerFacilityInfo(facilityInfo).subscribe(() => {
                    Swal.fire({
                      text: "Successfully canceled Booking",
                      icon: "success",
                      confirmButtonColor: "#BB00B4"
                    }).then(() => {
                      this.getTransactions();
                      this.getHistory();
                    })
                  })
                });
              });
            })
          })
        })

      }
    })
  }

  onEndAccom(transactionId: string) {
    Swal.fire({
      title: "Do you want to finish the accomodation?",
      text: "You cannot undo this action",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#BB00B4",
      width: 500
    }).then((action) => {
      if (action.isConfirmed == true) {
        let bookinginfo: any;
        let petprofile: any;
        this.bookingAPI.getBookingInfoByTransactionId(transactionId).subscribe((data: BookingInfo[]) => {
          bookinginfo = data;

          bookinginfo.bookingStatus = "Completed";
          bookinginfo.isCompleted = "true";

          this.userAPI.getPetById(bookinginfo.petId).subscribe((data: PetProfile[]) => {
            petprofile = data;

            petprofile.bookingStatus = "notBooked";
            
            this.userAPI.savePet(petprofile).subscribe();
            this.bookingAPI.addBookingInfo(bookinginfo).subscribe();

            let facilityBooked: any;
            this.facilityURL.getFacilityInfoByFacilityId(bookinginfo.facilityId).subscribe((data: FacilityInfo[]) => {
              facilityBooked = data;

              let facilityRoom: number = +facilityBooked.roomBooked;
              facilityBooked.roomBooked = facilityRoom - 1;

              this.facilityURL.registerFacilityInfo(facilityBooked).subscribe();

              Swal.fire({
                text: "Successfully finished Accomodation",
                icon: "success",
                confirmButtonColor: "#BB00B4"
              }).then(() => {
                this.getTransactions();
                this.getHistory();
              })
            })
          })
        })
      }
    });
  }

  viewCCTV(transactionId: String) {
    console.log(transactionId)
    this.router.navigate([transactionId + "/view-cctv"])
  }

  onClickProfile(){
    this.router.navigate(['user']);
  }

  logout(){
    this.userAPI.onLogOut();
  }
}
