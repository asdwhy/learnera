import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateConferenceDialogComponent } from '../create-conference-dialog/create-conference-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConferenceService } from 'src/app/services/conference/conference.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Conference } from 'src/app/classes/conference/conference';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  conferences: Conference[] = [];
  constructor(private _conferenceService: ConferenceService,
              private _searchService: SearchService,
              public dialog: MatDialog,
              private routerService: Router,
              private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._searchService.getConferenceSearchResults$().subscribe((data: any) => {

      data.forEach((element: any) => {
        if (element.body?.length > 500) {
          element.body = element.body.substring(0, 500) + "...";
        }
      });
      this.conferences = data;
    });
    this.getConferences();
  }

  onSelect(conference: Conference) {
    this.routerService.navigate(['/zoom'], { queryParams: {conId: conference.conId} });
  }

  showCreateConferenceForm() {
    const dialogRef = this.dialog.open(CreateConferenceDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this._conferenceService.postConference(new Conference(result.title, result.zoomLink, this.parseDate(result.date), result.meetingId, result.passcode, "")).subscribe((data: any) => {
          if(data.status == 200) {
            this.toastrService.success("Succesfully posted conference", "Success", {positionClass: "toast-bottom-right"});
          } else {
            this.toastrService.error("Could not post conference", "ERROR", {positionClass: "toast-bottom-right"});
          }
          this.getConferences();
        });
      }

    });
  }

  parseDate(str: string): Date {
    var splitStr = str.split("-");
    var date = new Date();
    date.setFullYear(splitStr[0] as unknown as number);
    date.setMonth((splitStr[1] as unknown as number) - 1);
    date.setDate(splitStr[2] as unknown as number);
    date.setHours(splitStr[3] as unknown as number, splitStr[4] as unknown as number);
    return date;
  }

  getConferences(): void {
    this._searchService.searchConference("");
  }

}
