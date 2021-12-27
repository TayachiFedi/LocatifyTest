import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddUserComponent } from './add-user.component';
import { AddUserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    AddUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: []
})
export class AddUserModule { }
