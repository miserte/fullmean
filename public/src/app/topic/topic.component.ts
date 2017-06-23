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
  user;
  //hardcoded user
  /*user: Object = {
    id: '594c0b7ac342fb203bc87548',
    username: '4',
  };*/
  param;
  info;
  post;

  constructor(private _communicateService: CommunicateService, private _route: ActivatedRoute, private _http: HttpService) {
    // for hardcoded user 
    //_communicateService.updateUser(this.user);
    
    _communicateService.observedUser.subscribe(
      (updatedUsers) => { this.user = updatedUsers; },
      (err) => { },
      () => { }
    )
    this._route.params.subscribe((param) => {
      this.param = param;
      this.getTopic()
    })
  }

  getTopic() {
    this._http.getTopic(this.param)
      .then(
      data => {
        this.topic = data
      })
      .catch(
      err => {
        console.log('Error retriving topic');
        this.errormessage = err;
      })

  }

  addPost(post) {
    this.post = {
      text: post
    }
    this.info = {
      post: this.post,
      topic: this.topic
    }
    this._http.addPost(this.info)
      .then(
      data => {
        this.getTopic()
      })
      .catch(
      err => {
        this.errormessage = 'Problem addming topic';
        console.log('error found', err);
      })
  }

  vote(id, vote) {
    this.info = {
      id: id,
      vote: vote
    }
    console.log(vote);
    this._http.vote(this.info)
    .then(
      data =>{
        this.getTopic();
      }
    )
    .catch(
      err => {
        console.log('error upvoting');
        this.errormessage = err;
      }
    )
  }



  ngOnInit() {
  }


}
