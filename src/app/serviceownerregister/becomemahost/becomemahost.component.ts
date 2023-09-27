import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap } from '@angular/google-maps';
import { FileUploader } from 'ng2-file-upload';
// import { ToastrService } from 'ngx-toastr';
const URL = 'http://localhost:8081/api/upload';

@Component({
  selector: 'app-becomemahost',
  templateUrl: './becomemahost.component.html',
  styleUrls: ['./becomemahost.component.css']
})
export class BecomemahostComponent implements OnInit {
// selectedFile: File = null;
accomodation: any = [
  {name: "Handled Personally", desc: "Pets stays under pet sitter’s observation to ensure their safety.", img: "../assets/icons/images.png"},
  {name: "A private room", desc: "Pets stays in a private room but some areas may be shared with other pets.", img: "../assets/icons/door_open_FILL1_wght400_GRAD0_opsz48.png"},
  {name: "A shared room", desc: "Pets stays and sleep in a room or common area that may be shared with other pets.", img: "../assets/icons/download.png"}
];
placeOffer:any = [
  {"name": "In-house veterinarian", "icon": "../assets/icons/inhouse-vet.png"},
  {"name": "Offer Pet Bath", "icon": "../assets/icons/pet-bath.jpg"},
  {"name": "Walking Pet", "icon": "../assets/icons/walking_pet.png"},
  {"name": "Dedicated Playground", "icon": "../assets/icons/playground.png"},
  {"name": "Pet Grooming Service", "icon": "../assets/icons/pet-grooming.png"},
  {"name": "Air Conditioned", "icon": "../assets/icons/aircon.png"},
  {"name": "Online Surveillance", "icon": "../assets/icons/online-surveillance.png"},
  {"name": "Pool for Pets", "icon": "../assets/icons/pool.png"}
]

value:number = 100;
  // onFileSelected(event) {
  //   console.log(event);
  //   this.selectedFile = <File>event.target.files[0];
  // }
  // onUpload() {
  //   this.http.post('')
  // }

  // click = false;
  // imageshitname: string = "NO file chosen";

  // onClickedAccomodations() {
  //   this.click = !this.click;
  // }


  @ViewChild('search')
  public searchElementRef!: ElementRef;
  // @ViewChild(GoogleMap)
  // public map!: GoogleMap;

  zoom = 12;
  // center!: google.maps.LatLngLiteral;
  // options: google.maps.MapOptions = {
  //   zoomControl: true,
  //   scrollwheel: false,
  //   disableDefaultUI: true,
  //   fullscreenControl: true,
  //   disableDoubleClickZoom: true,
  //   mapTypeId: 'hybrid',
  //   // maxZoom:this.maxZoom,
  //   // minZoom:this.minZoom,
  // };
  latitude!: any;
  longitude!: any;

  constructor(private ngZone: NgZone, private http: HttpClient) { }

  // ngAfterViewInit(): void {
  //   // Binding autocomplete to search input control
  //   let autocomplete = new google.maps.places.Autocomplete(
  //     this.searchElementRef.nativeElement
  //   );
  //   // Align search box to center
  //   this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
  //     this.searchElementRef.nativeElement
  //   );
  //   autocomplete.addListener('place_changed', () => {
  //     this.ngZone.run(() => {
  //       //get the place result
  //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //       //verify result
  //       if (place.geometry === undefined || place.geometry === null) {
  //         return;
  //       }

  //       console.log({ place }, place.geometry.location?.lat());

  //       //set latitude, longitude and zoom
  //       this.latitude = place.geometry.location?.lat();
  //       this.longitude = place.geometry.location?.lng();
  //       this.center = {
  //         lat: this.latitude,
  //         lng: this.longitude,
  //       };
  //     });
  //   });
  // }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });


  ngOnInit() {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };
    // });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      // this.toastr.success('File successfully uploaded!');
    };
  }

  priceInput(a:string){
    if(a == 'add'){
      this.value += 50;
    } else if(a == 'minus' && this.value != 0){
      this.value -= 50;
    }
  }

  onSubmit(){
    
  }

  
}
