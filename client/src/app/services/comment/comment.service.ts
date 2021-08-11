import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RestApiService } from '../rest-api/rest-api.service';
import { Comment } from 'src/app/classes/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient,
    private _restApiService: RestApiService) { }

  post(comment: Comment): Observable<{}> {
    var url = "/api/comment/post";

    return this.http.post(url, comment, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }

  getComments(id: String): Observable<{}> {
    var url = "/api/comment/get-comments";

    return this.http.post(url, {"id": id}, {observe: 'response'}).pipe(
      map(this._restApiService.getData),
      catchError(err => this._restApiService.handleError(err))
    );
  }
}
