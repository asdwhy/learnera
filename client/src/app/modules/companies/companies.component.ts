import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/classes/user/user';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';
import { RegisterCompanyDialogComponent } from './register-company-dialog/register-company-dialog.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies : User[] = [];

  constructor(
    private _userService: UserService,
    private _companyService: CompanyService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  onRegisterNewCompany(): void {
    const dialogRef = this.dialog.open(RegisterCompanyDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this._userService.register(result).subscribe((data: any) => {
          if(data.status == 200) {
            this.toastrService.success("Succesfully registered company account", "Success", {positionClass: "toast-bottom-right"});
            this.getCompanies();
          } else {
            this.toastrService.error("Could not register company account", "ERROR", {positionClass: "toast-bottom-right"});
          }
        });
      }
    });
  }

  getCompanies(): void{
    this._userService.me().subscribe((data: any) => {
      if(data.status == 200) {
        this._companyService.getCompanies(data.body.uid).subscribe((data: any) => {
          if(data.status == 200) {
            this.companies = data.body;
          } else {
            this.companies = [];
          }
        });
      }
    });
  }
}
