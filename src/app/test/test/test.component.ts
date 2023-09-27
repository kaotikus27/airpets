import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UserapiService } from 'src/app/services/userapi.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test = {};
  users!:Users[];

  constructor(private userApi: UserapiService) { }

  ngOnInit(): void {
    this.userApi.getAllUser().subscribe((data:Users[]) => {
      console.log(data);
      this.users = data;
    })
    
  }

}
