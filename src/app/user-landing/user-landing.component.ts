import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.scss']
})
export class UserLandingComponent implements OnInit {

  topics:any[]=[]
  selectedTopic:string="";
  OptionsData:any={};
  subTopic:any[]=[]
  selectedSubTopic:string="";
  userId:string="";
  subscriptionData:any[]=[];
  oldMessages:any[]=[]
  newMessage:any[]=[]
  constructor(private globalService:GlobalService, public webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.getOptions();
    this.getSubscriptionData();
    this.getOldMessages();
    this.webSocketService.notificationSubject.subscribe(data => {
      data.Date=new Date(data.Date).toLocaleString()
      this.newMessage.push(data);
      this.webSocketService.notificationCount.next(this.newMessage.length)
    });
  }

  getOptions()
  {
    this.globalService.getOptions().subscribe((response:any)=>{
      console.log(Object.keys(response.data));
      this.OptionsData=response.data;
      (Object.keys(response.data)).forEach((topic:string)=>{
        var data={"key":topic,"value":topic}
        this.topics.push(data)
      })
      console.log(this.topics)
    })
  }

  OnTopicSelection()
  {
    this.subTopic=[]
    console.log(this.OptionsData)
    this.OptionsData[this.selectedTopic].subtopics.forEach((subTopic:any)=>{
      var data={"key":subTopic,"value":subTopic}
        this.subTopic.push(data)
    })
    console.log(this.subTopic)
  }

  OnSubTopicSelection()
  {
    console.log(this.selectedTopic,this.selectedSubTopic)
  }

  getSubscriptionData()
  {
    this.subscriptionData=[]
    var user=localStorage.getItem("user")
    if(user!=undefined && user!=null)
    {
      var user_data=JSON.parse(user);
      this.userId=user_data.user_id;
    }
    this.globalService.getSubscriptionData(this.userId).subscribe((response:any)=>{
      if(response.result)
      {
        Object.keys(response.data.subscription_data).forEach((key:string)=>{
          var data:any={}
          data["key"]=key;
          data["topics"]=(response.data.subscription_data)[key]["sub_topic"]
          this.subscriptionData.push(data)
        })
      }
    })
  }

  AddSubscription()
  {
    var data={
      "topic": this.selectedTopic,
      "subtopic":this.selectedSubTopic,
      "user_id":this.userId
    }
    this.globalService.addSubscription(data).subscribe((response:any)=>{
      this.getSubscriptionData()
    })
  }

  getOldMessages()
  {
    this.oldMessages=[]
    this.globalService.getOldNotifications(this.userId).subscribe((response:any)=>{
      console.log(response);
      if(response.result)
        {
          this.oldMessages=response.data;
          this.oldMessages.forEach((message:any)=>{
            message.Date=new Date(message.Date).toLocaleString()
          })
          console.log(this.oldMessages)
        }
    })
  }

  MarkAsRead()
  {
    this.globalService.markAllRead(this.userId).subscribe((response:any)=>{
      console.log(response)
      this.getOldMessages()
    })
  }
}
