import { Component, OnInit } from '@angular/core';
import { CommunicateService } from './../communicate.service';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;
  //hardcoded user
  /*user:Object = {
    id: '594c0b7ac342fb203bc87548',
    username: '4',
  };*/
  topics: Array<Object>;
  errormessage;
  topic;
  info;

  // text: { type: String, required: true },
  // description: { type: String, required: true },
  // category: { type: String, required: true },

  constructor(private _communicateService: CommunicateService, private _http: HttpService) {
    _communicateService.updateUser(this.user);
    _communicateService.observedUser.subscribe(
			(updatedUsers) => {  this.user = updatedUsers; },
			(err) => { },
			() => { }
		)
    this.getTopics();
  }

  updateUser(){
    this._communicateService.updateUser(this.user);
  }

  getTopics(){
    console.log('getting topics');
    this._http.getTopics()
    .then(
      data =>{
        console.log('data from topics:',data);
        this.topics = data;
      }
    )
    .catch
    (
      error => {
        this.errormessage = error;
        console.log('Error fetching topics');
      }
    )}


  addTopic(text, description, category){
    //Set this topic
    this.topic = {
      text: text,
      description: description,
      category: category
    }
    this.info = {
      topic: this.topic,
      user: this.user
    }
    //Add to DB
    this._http.addTopic(this.info)
    .then(
      data => {
        //Refresh topics
        this.getTopics();
      }
    )
    .catch(
      error => {
        console.log('error adding topic');
        this.errormessage = error;
      }
    )


  }



  ngOnInit() {
  }

}
