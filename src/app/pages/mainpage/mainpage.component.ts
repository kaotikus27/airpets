import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { FacilityImages } from 'src/app/models/facility-images.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { OtherServiceService } from 'src/app/services/other-service.service';
import { UserapiService } from 'src/app/services/userapi.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  tabs: any[] = [
    { "name": "House", "img": "../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Hotels", "img": "../assets/icons/apartment_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Apartments", "img": "../assets/icons/domain_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Clinic", "img": "../assets/icons/pets_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Sitter", "img": "../assets/icons/sound_detection_dog_barking_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Hotel with Pool", "img": "../assets/icons/water_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Villa", "img": "../assets/icons/villa_FILL0_wght400_GRAD0_opsz48.svg" }]
  active: any[] = ['not-active', 'not-active', 'not-active', 'not-active', 'not-active', 'not-active', 'not-active'];
  filter: boolean = false;
  selection: any[] = [
    { "name": "CCTV", "value": "petCCTV" },
    { "name": "Pet Walk", "value": "petWalk" },
    { "name": "Pet Pool", "value": "petPool" },
    { "name": "Air Conditioned", "value": "petAircon" },
    { "name": "Free Bath", "value": "petBath" },
    { "name": "Pet Grooming", "value": "petGroom" },
    { "name": "Veterinarian ready", "value": "petVet" },
    { "name": "Pet Pickup", "value": "petPickup" }];
  // properties: any[] = [
  //   { "value": "House", "img": "../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg" },
  //   { "value": "Apartment", "img": "../assets/icons/apartment_FILL0_wght400_GRAD0_opsz48.svg" },
  //   { "value": "Hotel", "img": "../assets/icons/domain_FILL0_wght400_GRAD0_opsz48.svg" },
  //   { "value": "Pet Clinic", "img": "../assets/icons/pets_FILL0_wght400_GRAD0_opsz48.svg" }];
  properties: any[] = [
    { "name": "Pet Hotel", "value": "hotel", "img": "../assets/icons/domain_FILL0_wght400_GRAD0_opsz48.svg" },
    { "name": "Pet Sitter", "value": "petSitter", "img": "../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg" }];
  error: boolean[] = [false, false];
  cardHover: any = [];

  //test static home result
  // cards: any[] = [
  //   {"name": "Pawsome Inn", "location": "Taguig City", "availability": "Weekdays", "price": "700", "thumbnail": "../assets/image-test/pethotel-03.png"},
  //   {"name": "Furever Stay Hotel", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": "1000", "thumbnail": "../assets/image-test/pethotel-02.jpg"},
  //   {"name": "PallyWood Hotel", "location": "Taguig City", "availability": "Weekdays", "price": "950", "thumbnail": "../assets/image-test/1.jpg"},
  //   {"name": "House of Pets Inn", "location": "Taguig City", "availability": "Weekdays", "price": "780", "thumbnail": "../assets/image-test/pethotel-04.jpg"},
  //   {"name": "Raff Days Rooms", "location": "Taguig City", "availability": "Weekdays", "price": "1250", "thumbnail": "../assets/image-test/pethotel-05.jpg"},
  //   {"name": "Hyatt for Cats", "location": "Taguig City", "availability": "Weekdays", "price": "900", "thumbnail": "../assets/image-test/pethotel-06.jpg"},
  //   {"name": "Boho & Bark", "location": "Taguig City", "availability": "Weekdays/Weekends", "price": "850", "thumbnail": "../assets/image-test/pethotel-07.png"}
  // ]
  // cards: any = [];

  // input values
  priceRange: number[] = [];
  select: any[] = [];
  selectChoice: Array<any> = [];
  propertyChoice: any = '';


  //facility datas
  facilityInfos: any = [];
  facilityImages: any = [];

  viewAll: boolean = false;

  userLogged: any = {};
  loggedIn: boolean = false;

  // countObservable: Observable<number> | undefined;
  // subscription: Subscription | undefined;

  constructor(private router: Router, private apiURL: ApiService, private facilityURL: FacilityapiService,
    private otherService: OtherServiceService, private userApi: UserapiService) {

    this.otherService.getEvent().subscribe(async event => {
      this.viewAll = false;
      await new Promise(f => setTimeout(f, 500));
      if (event.length == 0) {
        this.facilityURL.getAllFacilityInfo().subscribe((facilityInfos: FacilityInfo[]) => {
          this.facilityInfos = facilityInfos;
        })
        this.facilityURL.getAllFacilityImages().subscribe((facilityImages: FacilityImages[]) => {
          this.facilityImages = facilityImages;
          this.viewAll = true;
        })
        return;
      }

      facilityURL.getAllFacilityInfoByCity(event).subscribe((data: FacilityInfo[]) => {
        this.facilityInfos = data;

        this.facilityImages = [];
        for (let i = 0; i < this.facilityInfos.length; i++) {
          facilityURL.getFacilityImagesById(this.facilityInfos[i].facilityId).subscribe((data: FacilityImages[]) => {
            this.facilityImages[i] = data;
          })
        }
      })
      if (this.facilityImages[0].image1 != null) {
        await new Promise(f => setTimeout(f, 500));
        this.viewAll = true;
        console.log(this.facilityImages)
      }
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("userId") != null) {
      this.getUser();
    }
    // this.countObservable = interval(1000);
    // this.subscription = this.countObservable.subscribe(() => {
      
    // });
    this.getAllFacilities();
  }

  getAllFacilities() {
    this.facilityURL.getAllFacilityInfoByIsEvaluatedAndIsApproved("true", "true").subscribe((facilityInfos: FacilityInfo[]) => {
      this.facilityInfos = facilityInfos;
    })
    this.facilityURL.getAllFacilityImagesByIsEvaluatedAndIsApproved("true", "true").subscribe((facilityImages: FacilityImages[]) => {
      this.facilityImages = facilityImages;
      this.viewAll = true;
    })
  }

  getUser() {
    this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((data: Users[]) => {
      this.userLogged = data;
      this.loggedIn = true;
    })
  }

  onClick(i: number) {
    for (let a = 0; a < this.active.length; a++) {
      if (a == i && this.active[a] == "not-active") {
        this.active[a] = "active";
      } else {
        this.active[a] = "not-active";
      }

    }
    console.log(this.tabs[i].name)
  }

  onClickFilter(i: number) {
    if (i == 0) {
      this.filter = true;
    } else if (i == 1) {
      // clear selection
      this.priceRange = [];
      this.selectChoice = [];
      this.propertyChoice = '';
      for (let i = 0; i < this.selection.length; i++) {
        this.select[i] = false;
      }
      this.error = [false, false];
      this.filter = false;
    }
  }

  onInputPrice(i: number) {
    if (i == 0) {
      if (this.priceRange[0] >= this.priceRange[1] && this.priceRange[1] != null) {
        this.error[0] = true;
      } else {
        this.error[0] = false;
      }
    } else if (i == 1) {
      if (this.priceRange[0] >= this.priceRange[1] && this.priceRange[0] != null) {
        this.error[1] = true;
      } else {
        this.error[1] = false;
      }
    }
  }

  async onSubmitFilter() {
    for (let i = 0; i < this.selection.length; i++) {
      if (this.select[this.selection[i].value]) {
        this.selectChoice[this.selection[i].value] = this.select[this.selection[i].value];
      } else {
        this.selectChoice[this.selection[i].value] = false;
      }
    }
    console.log(this.selectChoice);
    console.log(this.propertyChoice);
    console.log(this.priceRange.length);
    let filter = 'notOk';

    if (this.priceRange[0] < this.priceRange[1] || this.priceRange.length == 0) {
      filter = 'ok';
    } else if (this.priceRange[0] > this.priceRange[1]) {
      filter = 'notOk';
    }
    // if(this.selectChoice.length != 0){
    //   filter = 'ok';
    // }
    // if(this.propertyChoice != null){
    //   filter = 'ok';
    // }

    if (filter == 'ok') {
      this.viewAll = false;
      this.facilityInfos = [];
      this.facilityImages = [];
      let newFacilityInfos: any = [];
      let newFacilityImages: any[] = [];
      await new Promise(f => setTimeout(f, 500));

      let facilityByType: any = [];
      let facilityByPrice: any = [];
      if (this.propertyChoice != '' && this.priceRange.length == 0) {
        newFacilityInfos = [];
        newFacilityImages = [];
        this.facilityURL.getAllFacilityInfoByTypeofPlaceAndIsApproved(this.propertyChoice, 'true').subscribe((data: FacilityInfo[]) => {
          facilityByType = data;
          newFacilityInfos = data;

          for (let i = 0; i < facilityByType.length; i++) {
            this.facilityURL.getFacilityImagesById(facilityByType[i].facilityId).subscribe((data: FacilityImages[]) => {
              newFacilityImages[i] = data;
            })
          }
        })
      }
      await new Promise(f => setTimeout(f, 300));
      if (this.priceRange.length > 0 && this.propertyChoice == '') {
        newFacilityInfos = [];
        newFacilityImages = [];
        for (let i = this.priceRange[0]; i <= this.priceRange[1]; i++) {
          let dataInfo: any;
          this.facilityURL.getAllfacilityByPriceRate(i.toString()).subscribe(async (data: FacilityInfo[]) => {
            dataInfo = data;
            if (dataInfo) {
              for (let i = 0; i < dataInfo.length; i++) {
                facilityByPrice.push(dataInfo[i]);
                await new Promise(f => setTimeout(f, 500));

                if (this.propertyChoice == '') {
                  newFacilityInfos.push(dataInfo[i]);

                  this.facilityURL.getFacilityImagesById(dataInfo[i].facilityId).subscribe(async (data: FacilityImages[]) => {
                    newFacilityImages.push(data);
                    await new Promise(f => setTimeout(f, 300));

                    this.facilityInfos = newFacilityInfos;
                    this.facilityImages = newFacilityImages;
                  })
                }
              }
              await new Promise(f => setTimeout(f, 300));
            }
          })
        }
        console.log(newFacilityInfos);
      }

      if (this.priceRange.length > 0 && this.propertyChoice != '') {
        newFacilityInfos = [];
        newFacilityImages = [];
        this.facilityURL.getAllFacilityInfoByTypeofPlaceAndIsApproved(this.propertyChoice, 'true').subscribe((data: FacilityInfo[]) => {
          facilityByType = data;
        })
        for (let i = this.priceRange[0]; i <= this.priceRange[1]; i++) {
          let dataInfo: any;
          this.facilityURL.getAllfacilityByPriceRate(i.toString()).subscribe(async (data: FacilityInfo[]) => {
            dataInfo = data;
            if (dataInfo) {
              for (let i = 0; i < dataInfo.length; i++) {
                facilityByPrice.push(dataInfo[i]);
                await new Promise(f => setTimeout(f, 500));
              }
            }
          })
        }
        await new Promise(f => setTimeout(f, 500));
        let typeLength = facilityByType.length;
        for(let i = 0; i < typeLength; i++){
          await new Promise(f => setTimeout(f, 100));
        }

        console.log(facilityByType);
        console.log(facilityByPrice);
        console.log(facilityByType.length, facilityByPrice.length);
        for (let i = 0; i < facilityByType.length; i++) {
          for (let a = 0; a < facilityByPrice.length; a++) {
            if (facilityByType[i].facilityId == facilityByPrice[a].facilityId) {
              console.log('a');
              console.log(facilityByType[i].facilityId, facilityByPrice[a].facilityId)
              newFacilityInfos.push(facilityByType[i]);

              this.facilityURL.getFacilityImagesById(facilityByType[i].facilityId).subscribe(async (data: FacilityImages[]) => {
                newFacilityImages.push(data);

                await new Promise(f => setTimeout(f, 300));
              })
            }
          }
        }
        console.log("byBoth: ", newFacilityInfos);
        console.log(newFacilityInfos.length)
        console.log(newFacilityImages[0]);
        for(let i = 0; i < newFacilityInfos.length; i++){
          await new Promise(f => setTimeout(f, 300));
        }

        if (newFacilityImages[0] != undefined) {
          this.viewAll = true;
          this.facilityInfos = newFacilityInfos;
          this.facilityImages = newFacilityImages;
        }

      }

      if (this.propertyChoice == '' && this.priceRange.length == 0) {
        this.getAllFacilities();
        console.log("none: ", newFacilityInfos);
      }

      // if (this.propertyChoice != '' && this.priceRange.length == 0) {
      //   newFacilityInfos = facilityByType;

      //   console.log('type')
      //   if(this.propertyChoice != ''){
      //     newFacilityInfos = [];
      //     newFacilityImages = [];
      //     this.facilityURL.getAllFacilityInfoByTypeofPlaceAndIsApproved(this.propertyChoice, 'true').subscribe((data: FacilityInfo[]) => {
      //       newFacilityInfos = data;

      //       for (let i = 0; i < facilityByType.length; i++) {
      //         this.facilityURL.getFacilityImagesById(facilityByType[i].facilityId).subscribe((data: FacilityImages[]) => {
      //           newFacilityImages[i] = data;
      //         })
      //       }
      //     })
      //   }
      // } else if (this.priceRange.length > 0 && this.propertyChoice == '') {
      //   newFacilityInfos = facilityByPrice;
      //   console.log("byPrice: ",newFacilityInfos);

      //   for (let i = 0; i < facilityByPrice.length; i++) {
      //     this.facilityURL.getFacilityImagesById(facilityByPrice[i].facilityId).subscribe((data: FacilityImages[]) => {
      //       newFacilityImages.push(data);
      //     })
      //   }
      // } else if (this.priceRange.length > 0 && this.propertyChoice != '') {
      //   for (let i = 0; i < facilityByType.length; i++) {
      //     for (let a = 0; a < facilityByPrice.length; a++) {
      //       if (facilityByType[i].facilityId == facilityByPrice[a].facilityId) {
      //         newFacilityInfos.push(facilityByType[i]);

      //         this.facilityURL.getFacilityImagesById(facilityByType[i].facilityId).subscribe((data: FacilityImages[]) => {
      //           newFacilityImages.push(data);
      //         })
      //       }
      //       await new Promise(f => setTimeout(f, 300));
      //     }
      //   }
      //   console.log("byBoth: ", newFacilityInfos);

      // } else if (this.propertyChoice == '' && this.priceRange.length == 0) {
      //   this.getAllFacilities();
      //   console.log("none: ", newFacilityInfos);
      // }

      

      // console.log(this.facilityInfos);
      // for (let i = 0; i < newFacilityInfos.length; i++) {
      //   await new Promise(f => setTimeout(f, 300));
      // }

      if (newFacilityImages != null) {
        this.viewAll = true;
        this.facilityInfos = newFacilityInfos;
        this.facilityImages = newFacilityImages;
      }

      this.priceRange = [];
      this.selectChoice = [];
      this.select = [];
      this.propertyChoice = '';
      this.filter = false;
    }
  }

  onFilterPrice() {

  }

  onFilterTypeOfPlace() {

  }

  onClickCard(i: any) {
    let facilityLink = this.facilityInfos[i].facilityId;
    this.router.navigate([facilityLink]);
  }

  onHoverCard(i: number) {
    this.cardHover[i] = "onhoverCard";
    for (let a = 0; a < this.facilityInfos.length; a++) {
      if (a != i) {
        this.cardHover[a] = '';
      }
    }
  }

  onLeave(i: number) {
    this.cardHover[i] = "";
  }
}
