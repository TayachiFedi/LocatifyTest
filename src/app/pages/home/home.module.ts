import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
      HomeRoutingModule,
      CommonModule,
  ],
  providers: [
    NewsService,
    UserService
  ],
  bootstrap: []
})
export class HomeModule { }
