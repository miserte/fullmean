import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  addUser(user){
    console.log('usser is ', user);
    return this._http.post("/adduser", user).map(response=>response.json()).toPromise();
  }

  getTopics(){
    return this._http.get("/topics").map(response=>response.json()).toPromise();
  }

  getTopic(param){
    console.log('in getTopic',param.id)
    return this._http.get("/gettopic/"+param.id).map(response=>response.json()).toPromise();
  }

  addTopic(info){
    console.log('topic is ', info);
    return this._http.post("/addtopic", info).map(response=>response.json()).toPromise();
  }

}
