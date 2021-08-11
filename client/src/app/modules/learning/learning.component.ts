import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Video } from 'src/app/classes/video/video';
import { VideoService } from 'src/app/services/video/video.service';
import { UploadVideoDialogComponent } from './upload-video-dialog/upload-video-dialog.component';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {
  categories: any[] = [];
  constructor(
    private _videoService: VideoService, 
    public dialog: MatDialog, 
    private routerService: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._videoService.getCategories().subscribe((data: any) => {
      if(data.status == 200) {
        this.categories = data.body.categories;
      }
    });
  }

  showUploadVideoForm() {
    const dialogRef = this.dialog.open(UploadVideoDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this._videoService.upload(new Video("", "", result.title, result.body, result.url, result.categories, new Date(), 0)).subscribe((data: any) => {
          if(data.status == 200) {
            this.toastrService.success("Succesfully uploaded video", "Success", {positionClass: "toast-bottom-right"});
          } else {
            this.toastrService.error("Could not upload video", "ERROR", {positionClass: "toast-bottom-right"});
          }
        });
      }
    });
  }

  selectCategory(category: any){
    if(category == "All"){
      this.routerService.navigate(['learning/', category.toLowerCase()]);
    }else{
      this.routerService.navigate(['learning/', category.display_name]);
    }
    
  }
}