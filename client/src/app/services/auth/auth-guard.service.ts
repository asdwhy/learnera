import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, 
    public _userService:UserService) {}  
  
  canActivate(): boolean {
    this._userService.me().toPromise().then(
      (res:any) => {
        if(res.ok) {
          return true;
        } else {
          this.router.navigateByUrl("auth/login");
          return false;
        }
      }, err => {
        this.router.navigateByUrl("auth/login");
        return false;
      }
    )
    return true;
  }
}
