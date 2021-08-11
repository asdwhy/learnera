import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../classes/user/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggingInUser = new User("","", "", "", "", "", "", { line1: "", city: "", province: "", postalCode: "", country: "" }, "", "", "", "");

  constructor(
    private _userService: UserService,
    private routerService: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this._userService.login(this.loggingInUser).subscribe((data: any) => {
      if(data.status == 200) {
        this.toastr.clear();
        this.routerService.navigateByUrl("");
      } else {
        this.toastr.clear();
        this.toastr.error("Login failed", "ERROR");
      }
    });

    
  }
}
