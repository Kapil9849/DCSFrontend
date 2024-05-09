import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel:any={
    username:"",
    password:""
  }
  login_message="";
  invalid_form:boolean=false;
  constructor(private router:Router, private globalService:GlobalService) { }

  ngOnInit(): void {
  }

  Login()
  {
    this.login_message="";
    this.invalid_form=false;
    console.log(this.loginModel);
    if(this.loginModel.username=="" || this.loginModel.password=="")
    {
      this.login_message="Please fill the credentials";
      this.invalid_form=true;
    }
    else{
      this.globalService.Login(this.loginModel).subscribe((response:any)=>{
        if(response.result){
          console.log(response)
          localStorage.setItem("user",JSON.stringify(response.data));
          this.router.navigateByUrl("/userLanding").then(()=>{location.reload()});
        }
      })
    }

  }
}
