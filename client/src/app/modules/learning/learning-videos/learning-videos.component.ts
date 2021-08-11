import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/classes/video/video';
import { VideoService } from 'src/app/services/video/video.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './learning-videos.component.html',
  styleUrls: ['./learning-videos.component.scss']
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];
  category: String = "";
  searchCategory = "";

  constructor(
    private _searchService: SearchService,
    private routerService: Router,
    private router: ActivatedRoute,
    private _videoService: VideoService
  ) {}

  ngOnInit(): void {
    this._searchService.getVideoSearchResults$().subscribe((data: any) => {
      this.videos = data;
    });
    let url = this.routerService.url;
    this.category = url.substring(url.lastIndexOf('/') + 1);
    if(this.category === "all"){
      this.searchVideos("");
    }
    else {
      this._videoService.getCategories().subscribe((data: any) => {
      if(data.status == 200) {
        data.body.categories.forEach((element: any) => {
          if(element.display_name === this.category){
            this.searchVideos(element.name);
          }
        });
        
      }
    });
    }
  }

  selectVideo(selection: Video) {
    this.routerService.navigate(['./', selection.vid], {relativeTo: this.router});
  }

  private searchVideos(category: string): void{
    this._searchService.searchVideo("", category);
  }
}
