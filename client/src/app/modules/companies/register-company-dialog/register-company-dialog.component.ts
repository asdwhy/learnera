import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/classes/user/user';
import { UserType } from 'src/app/enums/UserType';

@Component({
  selector: 'app-register-company-dialog',
  templateUrl: './register-company-dialog.component.html',
  styleUrls: ['./register-company-dialog.component.scss']
})
export class RegisterCompanyDialogComponent implements OnInit {

  content = {
    "username": "", 
    "password": "", 
    "companyName": "", 
    "address": {
      "line1": "",
      "city": "",
      "province": "",
      "postalCode": "",
      "country": ""
    },
    "phone": "",
    "website": "",
    "type": UserType.Company
  };

  constructor(
    public dialogRef: MatDialogRef<RegisterCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
