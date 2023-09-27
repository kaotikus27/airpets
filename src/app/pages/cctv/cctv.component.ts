import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { map, Observable, share, Subject, Subscription, timer } from 'rxjs';
import { BookingInfo } from 'src/app/models/booking-info.model';
import { FacilityInfo } from 'src/app/models/facility-info.model';
import { Users } from 'src/app/models/users';
import { BookingapiService } from 'src/app/services/bookingapi.service';
import { FacilityapiService } from 'src/app/services/facilityapi.service';
import { UserapiService } from 'src/app/services/userapi.service';

@Component({
  selector: 'app-cctv',
  templateUrl: './cctv.component.html',
  styleUrls: ['./cctv.component.css']
})
export class CctvComponent implements OnInit {
  time = new Date();
  rxTime = new Date();
  intervalId: NodeJS.Timer | undefined;
  subscription: Subscription | undefined;


  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  bookingInfos: any = {};
  facilityInfos: any = {};
  hostData: any = {};

  userViewing:String = '';

  constructor(private facilityAPI: FacilityapiService, private bookingAPI: BookingapiService,
    private router: Router, private userApi: UserapiService) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        let hour = this.rxTime.getHours();
        let minuts = this.rxTime.getMinutes();
        let seconds = this.rxTime.getSeconds();
        //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        let NewTime = hour + ":" + minuts + ":" + seconds
        // console.log(NewTime);
        this.rxTime = time;
      });

      let transactionId = this.router.url.slice(1).replaceAll("/view-cctv", "");
      console.log(transactionId);
    this.bookingAPI.getBookingInfoByTransactionId(transactionId).subscribe((data:BookingInfo[]) => {
      this.bookingInfos = data;

      console.log(this.bookingInfos);

      this.facilityAPI.getFacilityInfoByFacilityId(this.bookingInfos.facilityId).subscribe((data:FacilityInfo[]) => {
        this.facilityInfos = data;

        console.log(this.facilityInfos);

        this.userApi.getUserById(this.facilityInfos.userId).subscribe((data:Users[]) => {
          this.hostData = data;
        })
      })
    })

    this.getUserViewing();
  }
  public getSnapshot(): void {
    this.trigger.next(void 0);

  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  getUserViewing(){
    let userData:any;
    this.userApi.getUserById(sessionStorage.getItem('userId')!).subscribe((data:Users[]) => {
      userData = data;

      this.userViewing = `${userData.firstName} ${userData.lastName}`;
    })
  }
}
