import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }
  base_api:string= "http://127.0.0.1:8000/"

  Login(loginModel:any):Observable<any>
  {
    return this.http.post(this.base_api+"login",loginModel);
  }

  getOptions()
  {
    return this.http.get(this.base_api+"getoptions");
  }

  getSubscriptionData(user_id:string)
  {
    return this.http.get(this.base_api+"subscriptiondata/"+user_id);
  }

  addSubscription(data:any)
  {
    return this.http.post(this.base_api+"addSubscription",data);
  }

  getOldNotifications(user_id:string)
  {
    return this.http.get(this.base_api+"oldNotifications/"+user_id);
  }

  markAllRead(user_id:string)
  {
    return this.http.post(this.base_api+"markallread/"+user_id,"");
  }
}

