import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../http.service';
import { CommunicateService } from './../communicate.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  topic;
  errormessage;
  //user;
  //hardcoded user
  user:Object = {
    id: '594c0b7ac342fb203bc87548',
    username: '4',
  };

  constructor(private _communicateService: CommunicateService, private _route: ActivatedRoute, private _http: HttpService) {
    _communicateService.updateUser(this.user);
    _communicateService.observedUser.subscribe(
      (updatedUsers) => { this.user = updatedUsers; },
      (err) => { },
      () => { }
    )
    this._route.params.subscribe((param) => {
      _http.getTopic(param)
        .then(
        data => {
          this.topic = data
        }
        )
        .catch(
        err => {
          console.log('Error retriving topic');
          this.errormessage = err;
        }
        )
    })

  }

  ngOnInit() {
  }


}
