import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { User, UserAddResponse, UserGetResponse } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService{

    api:string = "https://gorest.co.in/public/v1/users";

    constructor(
        private http:HttpClient
    ){
    }

    getUsers(){
        return this.http.get<UserGetResponse>(this.api);
    }

    addUser(form:User){
        console.log(form)
        return this.http.post<UserAddResponse>(this.api,form);
    }

    updateUser(user:User){
        return this.http.patch(this.api+"/"+user.id,user)
    }

    deleteUser(user:User){
        return this.http.delete(this.api+"/"+user.id);
    }
}

