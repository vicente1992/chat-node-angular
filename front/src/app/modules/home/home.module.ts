import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { CardUserComponent } from './components/card-user/card-user.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    CardUserComponent,
    MessagesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class HomeModule { }
