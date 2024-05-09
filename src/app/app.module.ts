import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';
import { LoginComponent } from './login/login.component';

import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { GlobalService } from './global.service';
import { UserLandingComponent } from './user-landing/user-landing.component';
import {DropdownModule} from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {BadgeModule} from 'primeng/badge';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    ChipModule,
    TableModule,
    TabViewModule,
    BadgeModule
  ],
  providers: [WebsocketService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
