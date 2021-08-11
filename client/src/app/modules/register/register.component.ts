import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../classes/user/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUser = new User("","", "", "", "", "", "", { line1: "", city: "", province: "", postalCode: "", country: "" }, "", "", "", "");

  constructor(
    private _userService: UserService,
    private routerService: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this._userService.register(this.registerUser).subscribe((data: any) => {
      if(data.status == 200) {
        this.toastr.clear();
        this._userService.login(this.registerUser).subscribe((data2: any) => {
          if(data2.status == 200) {
            this.routerService.navigateByUrl("/");
          } else {
            this.toastr.error("Login failed", "ERROR");
          }
        });
      } else {
        this.toastr.clear();
        this.toastr.error("Register failed", "ERROR");
      }
    });
  }

}
