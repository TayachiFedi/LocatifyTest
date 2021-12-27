import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService{

    api:string = "https://inshortsapi.vercel.app/news?category=science";

    constructor(
        private http:HttpClient
    ){
    }

    getNews(){
        return this.http.get(this.api);
    }
}
