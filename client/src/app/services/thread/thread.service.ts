import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Thread } from 'src/app/classes/thread/thread';
import { RestApiService } from '../rest-api/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private http: HttpClient,
    private _restApiService: RestApiService) { }

  search(query: string): Observable<{}> {
    var url = "/api/thread/search";

    return this.http.post(url, { "query": query }, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  post(thread: Thread): Observable<{}> {
    var url = "/api/thread/post";

    return this.http.post(url, thread, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  getThread(tid: String): Observable<{}> {
    var url = "/api/thread/get-thread";

    return this.http.post(url, {"tid": tid}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

}
