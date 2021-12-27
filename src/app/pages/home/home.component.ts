import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs:Array<{
    author:string,
    content:string,
    date:string,
    imageUrl:string,
    readMoreUrl:string,
    time:string,
    title:string,
    url:string
  }> = [];

  users:Array<{
    email:string,
    gender:"male",
    id:number,
    name:string,
    status:string
  }> = []

  constructor(
    private newsService : NewsService,
    private userService : UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((blogsList:any)=>{
      this.blogs = blogsList.data.slice(0,3);
    });

    this.userService.getUsers().subscribe((usersList:any)=>{
      this.users = usersList.data.slice(0,6);
    })
  }

  addNewUser(){
    this.router.navigate(['add-user'])
  }

}
