import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../classes/user/user';
import { RestApiService } from '../rest-api/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
    private _restApiService: RestApiService) { }

  login(user: User): Observable<{}> {
    var url = "/api/user/login";

    return this.http.post(url, user, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  logout(): Observable<{}> {
    var url = "/api/user/logout";

    return this.http.post(url, {}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }


  register(user: User): Observable<{}> {
    var url = "/api/user/register";

    return this.http.post(url, user, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  updateUser(user: User): Observable<{}> {
    var url = "/api/user/updateuser";

    return this.http.put(url, user, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  me(): Observable<{}> {
    var url = "/api/user/me";

    return this.http.get(url, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  getUser(uid: string): Observable<{}> {
    var url = "/api/user/get-user";

    return this.http.post(url, {"uid": uid}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }
}
