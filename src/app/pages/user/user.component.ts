import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { AddUserComponent } from "../add-user/add-user.component";
import { UpdateUserComponent } from "../update-user/update-user.component";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'email', 'gender', 'status', 'actions'];
  dataSource ;
  usersList = [];
  sortedUsersList = [];
  downloadFileClicked = false;
  panelOpenState = false;

  searchForm: FormGroup = this.fb.group({
    name: [null],
    email: [null],
    gender: [null],
    status: [null]
  });
  mainFilter = '';
  private activatedReloadUserList: Subscription= new Subscription();

  constructor(
    private userService:UserService,
    private router:Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.usersList);

    this.initSearchForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
 
    this.reloadList();
  }

  openDialog(dialogComponent:any) {
    // this.dialog
    //   .open(dialogComponent, {
    //     width: '70%',
    //     maxHeight: '90vh',
    //     position: {
    //       top: '5%',
    //       left: '20%',
    //     },
    //     disableClose: true,
    //   })
    //   .afterClosed()
    //   .subscribe((result) => {
    //     if (result) {
    //       this.reloadList();
    //     }
    //   });
  }

  reloadList() {
    this.userService.getUsers().subscribe(
      (res) => {
        console.log(res)
        this.usersList = <any>res.data;

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.usersList);
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = this.getFilterPredicate();
      },
      (err) => {
        this.toastr.error('Un problème interne est survenu');
      }
    );
  }

  addNew() {
    this.router.navigate(['add-user'])
  }

  update(user:any) {
    this.dialog.open(UpdateUserComponent, {
      width: '50%',
      maxHeight: '80vh',
      position: {
        top: '7.5%',
        left: '25%',
      },
      disableClose: true,
      data :  user
    }).afterClosed().subscribe((data) => {
      if(data)
        this.reloadList();
    });
    
  }

  deleteUser(user:User) {
    if (
      confirm("You are going to delete the user : "+user.name)
    ) {
      this.userService.deleteUser(user).subscribe(
        (res: any) => {
          this.toastr.success('User deleted successfully');
          this.reloadList();
        },
        (err) => {
          this.toastr.error('Internal problem..');
        }
      );
    }
  }

  /*****Filter */
  initSearchForm() {
    this.searchForm = this.fb.group({
      name: [null],
      email: [null],
      gender: [null],
      status: [null]
    });
  }
  applyFilter() {
    const mainFilter = this.mainFilter;
    const { name, email, gender, status } = this.getFilterForm();

    const { finalmainFilter, finalname, finalemail, finalgender, finalstatus } =
      this.finnalMainFilter(mainFilter, name, email, gender, status);

    const filterValue =
      finalmainFilter +
      '$' +
      finalname +
      '$' +
      finalemail +
      '$' +
      finalgender +
      '$' +
      finalstatus 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  finnalMainFilter(mainFilter: string, name: any, email: any, gender: any, status: any) {
    const finalmainFilter = mainFilter == null || mainFilter === '' ? '' : mainFilter;
    const finalname = name == null || name === '' ? '' : name;
    const finalemail = email == null || email === '' ? '' : email;
    const finalgender = gender == null || gender === '' ? '' : gender;
    const finalstatus = status == null || status === '' ? '' : status;
    return { finalmainFilter, finalname, finalemail, finalgender, finalstatus };
  }

  getFilterForm() {
    const name = this.searchForm.get('name')?.value;
    const email = this.searchForm.get('email')?.value;
    const gender = this.searchForm.get('gender')?.value;
    const status = this.searchForm.get('status')?.value;
    return { name, email, gender, status };
  }

  getFilterPredicate() {
    return (row: any, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const mainFilter = filterArray[0];
      const name = filterArray[1];
      const email = filterArray[2];
      const gender = filterArray[3];
      const status = filterArray[4];

      const matchFilter = [];
      // Fetch data from row
      const columnname = row.name;
      const columnemail = row.email;
      const columngender = row.gender;
      const columnstatus = row.status;

      // verify fetching data by our searching values
      const customMainFilter =
        columnname.toLowerCase().includes(mainFilter) ||
        columnemail.toLowerCase().includes(mainFilter) ||
        columngender.toLowerCase().includes(mainFilter) ||
        columnstatus.toLowerCase().includes(mainFilter)

      const customFiltername = columnname.toLowerCase().includes(name);
      const customFilteremail = columnemail.toLowerCase().includes(email);
      const customFiltergender = columngender.toLowerCase().includes(gender);
      const customFilterstatus = columnstatus.toLowerCase().includes(status);

      // push boolean values into array
      matchFilter.push(customMainFilter);
      matchFilter.push(customFiltername);
      matchFilter.push(customFilteremail);
      matchFilter.push(customFiltergender);
      matchFilter.push(customFilterstatus);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  back() {
    // this.gereralInfoService.selectedMenu.next(false);
    // this.router.navigate(['../../general'], { relativeTo: this.activeRoute.parent });
  }
  /******************** */
  ngOnDestroy() {
    if (this.activatedReloadUserList) {
      this.activatedReloadUserList.unsubscribe();
    }
  }
}
