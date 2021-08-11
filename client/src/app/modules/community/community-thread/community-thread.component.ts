import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Thread } from 'src/app/classes/thread/thread';
import { UserType } from 'src/app/enums/UserType';
import { LikeService } from 'src/app/services/like/like.service';
import { ThreadService } from 'src/app/services/thread/thread.service';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-community-thread',
  templateUrl: './community-thread.component.html',
  styleUrls: ['./community-thread.component.scss']
})
export class CommunityThreadComponent implements OnInit {

  thread: Thread | null = null;
  currColor: String = "";
  tid: String = "";
  userName = "";
  profileImageUrl = "";

  constructor(
    private routerService: Router,
    private _threadService: ThreadService,
    private _likeService: LikeService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    // router server read the url string, then find the
    let url = this.routerService.url
    this.tid = url.substring(url.lastIndexOf('/') + 1);
    this.loadThread();
    this.loadHasLiked();
  }

  loadThread(): void {
    this._threadService.getThread(this.tid).subscribe((data: any) => {
      if (data.status == 200){
        let thread_info = data.body;
        delete thread_info._id;
        this.thread = thread_info;
        this.loadUser();
      }
    });
  }

  loadHasLiked(): void {
    this._likeService.hasLiked(this.tid).subscribe((data: any) => {
      if (data.status == 200){
        if(data.body){
          this.currColor = "accent";
        }else{
          this.currColor = "";
        }
      }
    });
  }

  onLike(): void {
    this._likeService.toggleLikeThread(this.tid).subscribe((data: any) => {
      if (data.status == 200){
        this.loadThread();
        this.loadHasLiked();
      }
    });
  }

  loadUser(): void {
    this._userService.getUser(this.thread?.uid || "").subscribe( (data: any) => {
        if (data.status == 200){
          if (data.body.type == UserType.Personal){
            this.userName = data.body.firstName + " " + data.body.lastName;
          } else {
            this.userName = data.body.companyName;
          }
          this.profileImageUrl = data.body.profileImageUrl;
        }

    });
  }
}
