import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { VeiwcartComponent } from './veiwcart/veiwcart.component';


@NgModule({
  declarations: [
    UserprofileComponent,
    VeiwcartComponent
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule
  ]
})
export class UserprofileModule { }
