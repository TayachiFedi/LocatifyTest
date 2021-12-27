import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  form = new FormGroup({});
  loading = false;
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
		private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User

  ) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.data)
  }

  initForm(){
    this.form=this.fb.group({
      id:[this.data.id],
      name:[this.data.name,Validators.required],
      email:[this.data.email,Validators.required],
      gender:[this.data.gender,Validators.required],
      status:[this.data.status,Validators.required]
    })
  }

  updateUser(){
    if(this.form.valid){
      this.loading=true;
      this.userService.updateUser(<User>this.form.value).subscribe((res)=>{
        this.toastr.success("User updated successfully ");
        this.dialogRef.close(true);
      });
    }
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
