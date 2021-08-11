import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserType } from 'src/app/enums/UserType';
import { User } from '../../classes/user/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currentUser: User | any;
  isCompanyUser : boolean = false;
  profileImageUrl : String = "";

  constructor(
    private _userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._userService.me().subscribe((data: any) => {
      if(data.status == 200) {
        delete data.body._id;
        this.currentUser = data.body;
        if(data.body.type === UserType.Company) {
          this.isCompanyUser = true;
        }
        this.profileImageUrl = this.currentUser.profileImageUrl;
      }
    });
  }

  onClickUpdate() {
    if(this.currentUser != null) {
      
      this._userService.updateUser(this.currentUser).subscribe((data: any) => {
        if(data.status != 200) {
          this.toastrService.clear();
          this.toastrService.error("Could not update user", "ERROR", {positionClass: "toast-bottom-right"});
        } else {
          this.toastrService.clear();
          this.toastrService.success("Succesfully updated user", "Success", {positionClass: "toast-bottom-right"});
          this.profileImageUrl = this.currentUser.profileImageUrl;
        }
      });
    }
  }
}
