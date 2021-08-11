import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RestApiService } from '../rest-api/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private http: HttpClient,
    private _restApiService: RestApiService) { }

  hasLiked(target: String): Observable<{}> {
    var url = "/api/like/hasLiked";

    return this.http.post(url, {"target": target}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  toggleLikeThread(tid: String): Observable<{}> {
    var url = "/api/like/thread";

    return this.http.post(url, {"target": tid}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  toggleLikeVideo(vid: String): Observable<{}> {
    var url = "/api/like/video";

    return this.http.post(url, {"target": vid}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  toggleLikeComment(cid: String): Observable<{}> {
    var url = "/api/like/comment";

    return this.http.post(url, {"tid": cid}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

}
