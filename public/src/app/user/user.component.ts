import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../http.service';
import { CommunicateService } from './../communicate.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userinfo;
  user;
  errormessage;
  //hardcoded user
  /*user:Object = {
    id: '594c0b7ac342fb203bc87548',
    username: '4',
  };*/

  constructor(private _communicateService: CommunicateService, private _route: ActivatedRoute, private _http: HttpService) {
     // for hardcoded user 
    //_communicateService.updateUser(this.user);
    _communicateService.observedUser.subscribe(
      (updatedUsers) => { this.user = updatedUsers; },
      (err) => { },
      () => { }
    )
    this._route.params.subscribe((param) => {
      _http.getUser(param)
        .then(
        data => {
          this.userinfo = data
        }
        )
        .catch(
        err => {
          console.log('Error retriving user');
          this.errormessage = err;
        }
        )
    }
    )
  }

  ngOnInit() {
  }

}
