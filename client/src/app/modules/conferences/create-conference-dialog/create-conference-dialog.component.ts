import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Thread } from 'src/app/classes/thread/thread';

@Component({
  selector: 'app-create-conference-dialog',
  templateUrl: './create-conference-dialog.component.html',
  styleUrls: ['./create-conference-dialog.component.scss']
})
export class CreateConferenceDialogComponent implements OnInit {

  content = {"title":"", "meetingId":"", "zoomLink": "", "passcode": "", "date": ""};
  datePickerConfig = {
    format: "YYYY-MM-DD-HH-mm"
  };

  constructor(
    public dialogRef: MatDialogRef<CreateConferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Thread) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
