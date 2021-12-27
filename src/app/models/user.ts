export interface User{
    id?:number;
    name:string;
    email:string;
    gender:string;
    status:'active'|'inactive';

}

export interface UserAddResponse{
    data:User;
    meta:any;
}

export interface UserGetResponse{
    meta:any;
    data:User[];    
}