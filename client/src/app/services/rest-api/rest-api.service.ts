import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor() { }


  // Extracts data from a Http response
  public getData(res: Response | any) {
    let body = res;
    return body || {};
  }

  // Error handler from http error
  public handleError(error: Response | any) {
    let msg;
    if(error instanceof Response) {
      msg = `${error.status}: ${error.statusText} ${error}`;
    } else {
      msg = error.message ? error.message : error.toString();
    }

    console.log(msg);
    
    return of(msg);
  }
}
