import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Thread } from 'src/app/classes/thread/thread';

@Component({
  selector: 'app-create-thread-dialog',
  templateUrl: './create-thread-dialog.component.html',
  styleUrls: ['./create-thread-dialog.component.scss']
})
export class CreateThreadDialogComponent implements OnInit {

  content = {"title":"", "body":""};

  constructor(
    public dialogRef: MatDialogRef<CreateThreadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Thread) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
