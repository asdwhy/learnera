import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Conference } from 'src/app/classes/conference/conference';
import { User } from 'src/app/classes/user/user';
import { ConferenceService } from '../conference/conference.service';
import { ThreadService } from '../thread/thread.service';
import { VideoService } from '../video/video.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  threadSearchResults: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  videoSearchResults: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  conferenceSearchResults: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(
    private _threadService: ThreadService, 
    private _videoService: VideoService,
    private _conferenceService: ConferenceService
  ) {}

  public getVideoSearchResults$() {
    return this.videoSearchResults.asObservable();
  }
  
  public searchVideo(params: any, category: string) {
    this._videoService.searchVideo(params, category).subscribe((res: any) => {
      if(res.body === undefined) {
        this.videoSearchResults.next([]);
        return;
      }
      
      res?.body.forEach((element: any) => {
        delete element._id;
      });

      this.videoSearchResults.next(res?.body);
    });
  }  

  public getThreadSearchResults$() {
    return this.threadSearchResults.asObservable();
  }
  
  public searchThread(params: any) {
    this._threadService.search(params).subscribe((res: any) => {
      if(res.body === undefined) {
        this.threadSearchResults.next([]);
        return;
      }
      
      res?.body.forEach((element: any) => {
        delete element._id;
      });

      this.threadSearchResults.next(res?.body);
    });
  }  



  public getConferenceSearchResults$() {
    return this.conferenceSearchResults.asObservable();
  }
  
  public searchConference(params: any) {
    this._conferenceService.searchConference(params).subscribe((res: any) => {
      if(res.body === undefined) {
        this.conferenceSearchResults.next([]);
        return;
      }
      
      res?.body.forEach((element: any) => {
        delete element._id;
      });

      this.conferenceSearchResults.next(res?.body);
    });
  }  
}


  

