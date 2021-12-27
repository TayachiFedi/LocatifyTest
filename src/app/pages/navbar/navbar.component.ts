import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuContent:{
    path:string,
    icon:string,
    selected:boolean
  }[] =[];
  currentRoute:string = "";
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.currentRoute = this.router.url;
    this.menuContent = [
      {
        path: '',
        icon:'/assets/menu-icons/menu.ico' ,
        selected: !!this.currentRoute.match('') || true,
      },
      {
        path: 'home',
        icon:'/assets/menu-icons/home.ico' ,
        selected: !!this.currentRoute.match('/home') || true,
      },
      {
        path: 'add-user',
        icon:'/assets/menu-icons/plus.ico' ,
        selected: !!this.currentRoute.match('/add-user') || false,
      },
      {
        path: 'users',
        icon:'/assets/menu-icons/files.ico' ,
        selected: !!this.currentRoute.match('/users') || false,
      },
      {
        path: '',
        icon:'/assets/menu-icons/phone.ico' ,
        selected: !!this.currentRoute.match('') || false,
      },
      {
        path: '',
        icon:'/assets/menu-icons/joystick.ico' ,
        selected: !!this.currentRoute.match('') || false,
      },
      {
        path: '',
        icon:'/assets/menu-icons/headset.ico' ,
        selected: !!this.currentRoute.match('') || false,
      },
    ];
  }

  resetMenu(path:string){
    console.log(path)
    this.router.navigate([path]);
    this.menuContent.forEach((menu)=>{
      menu.path == path?menu.selected=true:menu.selected=false;
    })
  }
  

}
