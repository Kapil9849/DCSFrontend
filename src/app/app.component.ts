import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  LoggedIn:boolean=false;
  isuser:boolean=false;
  username:string="";
  notificationcount:number=0;
  constructor(public webSocketService: WebsocketService, private router:Router) {

  }
  ngOnInit() {
    this.checkLogin()
    this.webSocketService.notificationCount.subscribe((response:any)=>{
      this.notificationcount=response
    })
  }

  Logout()
  {
    localStorage.clear();
    this.router.navigateByUrl("").then(()=>{
      location.reload();
    })
  }

  checkLogin()
  {
    this.isuser=false;
    var user=localStorage.getItem("user")
    if(user!=undefined && user!=null)
    {
      this.LoggedIn=true;
      var user_data=JSON.parse(user);
      this.username= user_data.first_name+" "+user_data.last_name;
      this.webSocketService.connect(user_data.user_id);
      console.log(user_data)
      console.log(this.LoggedIn)
      this.isuser=true;
    }
    else
    {
      this.LoggedIn=false;
    }
  }
}
