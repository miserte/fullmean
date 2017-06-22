import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommunicateService } from './communicate.service';
import { HttpService } from './http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user;
  errormessage;

  constructor(private _communicateService: CommunicateService, private _http: HttpService, private _router: Router) {
    _communicateService.observedUser.subscribe(
      (updatedUsers) => { this.user = updatedUsers; },
      (err) => { },
      () => { }
    )
  }

  updateUser(username) {
    //Update user of this component
    this.user = {username: username };

    //Store user in db and get id back
    this._http.addUser(this.user)
      .then(
      data => {
        //Update Observable with id and username
        this._communicateService.updateUser(data);
        //Redirect to dashboard
        this._router.navigate(['/dashboard']);

      }
      )
      .catch(
      err => {
        this.errormessage = 'Problem adding user';
        console.log('error found', err);
      }
      )
  }
}
