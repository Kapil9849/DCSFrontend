import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path: "userLanding",
    component: UserLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
