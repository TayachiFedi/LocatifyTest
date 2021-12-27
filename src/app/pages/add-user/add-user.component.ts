import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form = new FormGroup({});
  loading =false;
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form=this.fb.group({
      name:[null,Validators.required],
      email:[null,Validators.required],
      gender:[null,Validators.required],
      status:[null,Validators.required]
    })
  }

  addUser(){
    if(this.form.valid){
      this.loading=true;
      this.userService.addUser(<User>this.form.value).subscribe((res)=>{
        this.router.navigate(['users'])
      });
    }
  }
}
