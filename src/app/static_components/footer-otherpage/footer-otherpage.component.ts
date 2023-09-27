import { Component, OnInit } from '@angular/core';
import { OtherServiceService } from 'src/app/services/other-service.service';

@Component({
  selector: 'app-footer-otherpage',
  templateUrl: './footer-otherpage.component.html',
  styleUrls: ['./footer-otherpage.component.css']
})
export class FooterOtherpageComponent implements OnInit {
  imageLinks: string[] = [
    "../assets/logos/Facebook_Logo_(2019).png",
    "../assets/logos/Google__G__Logo.png",
    "../assets/logos/Twitter_Logo.png"];
  footerOpt: string = '';

  termsAndConditions: string = "invisible";

  constructor(private otherService: OtherServiceService) {
    otherService.getAction().subscribe(event => {
      console.log(event);
      this.termsAndConditions = event;
    })
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem("page"));
    if(localStorage.getItem("page") == "UsermainpageComponent"){
      this.footerOpt = 'mobile';
    }
  }

  // mobileView(a:any){
  //   console.log(a);
  // }

}
