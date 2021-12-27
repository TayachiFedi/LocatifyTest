import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UpdateUserComponent } from '../update-user/update-user.component';
import {MatCardModule} from '@angular/material/card';


const MaterialModules =[
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule
]

@NgModule({
  declarations: [
    UserComponent,
    UpdateUserComponent
  ],
  imports: [
    MaterialModules,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  entryComponents:[UpdateUserComponent],
  providers: [],
  bootstrap: []
})
export class UserModule { }
