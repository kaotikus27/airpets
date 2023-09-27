import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilityImages } from 'src/app/models/facility-images.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { Users } from 'src/app/models/users';
import { Wishlist } from 'src/app/models/wishlist.model';
import { ApiService } from 'src/app/services/api.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { UserapiService } from 'src/app/services/userapi.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css']
})
export class WishlistsComponent implements OnInit {
  link: any[] = ["/login"];
  notLogged: boolean = true;
  user: any = [];
  facilities: any = [];

  haveValues: boolean = false;

  wishlistDatas: any = [];
  facilityInfos: any = [];
  facilityImages: any = [];
  facilityHostsFirstName: any = [];
  facilityHostsLastName: any = [];

  loadingWishlists: string = '';

  constructor(private router: Router, private apiURL: ApiService, private userApi: UserapiService,
    private facilityApi: FacilityapiService, private wishlistApi: WishlistService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      this.notLogged = false;
    } else {
      this.notLogged = true;
    }

    this.userApi.getUserById(sessionStorage.getItem("userId")!).subscribe((user: Users[]) => {
      this.user = user;
    })
    this.getWishlists();
  }

  getWishlists() {
    this.facilityInfos = [];
    this.facilityImages = [];
    this.facilityHostsFirstName = [];
    this.facilityHostsLastName = [];
    this.haveValues = false;
    let userId = sessionStorage.getItem("userId")
    let wishlistsData: any;
    this.wishlistApi.getAllWishlistByUserIdAndIsRemoved(userId!, 'false').subscribe(async (data: Wishlist[]) => {
      wishlistsData = data;
      this.wishlistDatas = data;

      if (wishlistsData.length > 0) {
        for (let i = 0; i < wishlistsData.length; i++) {
          let facility: any;
          this.facilityApi.getFacilityInfoByFacilityId(wishlistsData[i].facilityId).subscribe((data: FacilityInfo[]) => {
            facility = data;
            this.facilityInfos[i] = facility;

            let ownerData: any;
            this.userApi.getUserById(facility.userId).subscribe((data: Users[]) => {
              ownerData = data;
              this.facilityHostsFirstName[i] = ownerData["firstName"];
              this.facilityHostsLastName[i] = ownerData["lastName"];
            })
            let facilityImgs: any;
            this.facilityApi.getFacilityImagesById(facility.facilityId).subscribe((data: FacilityImages[]) => {
              facilityImgs = data;
              this.facilityImages[i] = facilityImgs;
            })
          })
        }
        for (let i = 0; i < wishlistsData.length; i++) {
          this.loadingWishlists = "Loading...";
          await new Promise(f => setTimeout(f, 300));
        }
        if (this.facilityImages != undefined) {
          this.haveValues = true;
        }
      } else {
        this.loadingWishlists = 'No Wishlist has been added yet';
      }
    })
  }

  onClick(i: number) {
    if (i == 0) {
      this.router.navigate(["/login"]);
    }
  }

  onClickRemove(facilityId: string) {
    let userId = sessionStorage.getItem('userId');
    let wishlistData: any;
    this.wishlistApi.getWishlistByUserIdAndFacilityIdAndIsRemoved(userId!, facilityId, 'false').subscribe((data: Wishlist[]) => {
      wishlistData = data;

      wishlistData.isRemoved = true;
      this.wishlistApi.addWishlist(wishlistData).subscribe(() => {
        Swal.fire({
          title: 'Facility has been removed to wishlist',
          icon: 'success',
          confirmButtonColor: '#BB00B4'
        }).then(() => {
          this.getWishlists();
        })
      })
    })
  }

  onClickBookNow(facilityId: string) {
    this.router.navigate([facilityId]);
  }
}