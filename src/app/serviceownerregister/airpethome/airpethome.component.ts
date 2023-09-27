import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airpethome',
  templateUrl: './airpethome.component.html',
  styleUrls: ['./airpethome.component.css']
})
export class AirpethomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickSetup(){
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if(isLoggedIn){
      this.router.navigate(['become-a-host']);
    } else{
      alert('You need to have a account first!');
      // this.router.navigate(['/']);
    }
  }
}
