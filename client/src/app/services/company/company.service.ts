import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RestApiService } from '../rest-api/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient,
    private _restApiService: RestApiService) { }

  getCompanies(uid: String): Observable<{}> {
    var url = "/api/company/get-companies";

    return this.http.post(url, {"uid": uid}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }
}
