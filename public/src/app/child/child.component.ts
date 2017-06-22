import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommunicateService } from './../communicate.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

 users = [];

  constructor(private _communicateService: CommunicateService) {
    //Update own users when construct
    //_communicateService.updateUsers(this.users)

    //Susbcribe to changes in users
    _communicateService.observedUser.subscribe(
			(updatedUsers) => {  this.users = updatedUsers; },
			(err) => { },
			() => { }
		)
  }

  ngOnInit() {
  }

}
