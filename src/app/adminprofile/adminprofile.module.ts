import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminprofileRoutingModule } from './adminprofile-routing.module';
import { AdminprofileComponent } from './adminprofile.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminprofileComponent
  ],
  imports: [
    CommonModule,
    AdminprofileRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminprofileModule { }
