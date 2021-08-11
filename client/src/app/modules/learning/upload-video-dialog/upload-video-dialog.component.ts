import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Video } from 'src/app/classes/video/video';
import { VideoService } from 'src/app/services/video/video.service';


interface Content{
  title: string;
  body: string;
  url: string;
  validUrl: boolean;
  categories: string[];
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-upload-video-dialog',
  templateUrl: './upload-video-dialog.component.html',
  styleUrls: ['./upload-video-dialog.component.scss']
})
export class UploadVideoDialogComponent implements OnInit {
  
  content : Content = {"title":"", "body":"", "url":"", "categories": [], "validUrl": false};
  categoriesList: any[] = [];
  // form: FormGroup = this.fb.group({
  //   title: ['', Validators.required],
  //   description: ['', Validators.required],
  //   youtubelink: ['', [Validators.required, Validators.pattern('[A-Za-z]{5}')]]
  // });
  
  youtubelinkFormControl = new FormControl('', [
    Validators.required, 
    Validators.pattern('^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$'), 
  ]);

  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<UploadVideoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Video, 
    private _videoService: VideoService) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCategoryChange(ob: MatCheckboxChange, category: any) {
    if(ob.checked){
      this.content.categories.push(category.name);
    } else {
      let index = this.content.categories.indexOf(category.name);
      if (index > -1) {
        this.content.categories.splice(index, 1);
      }
    }
 } 

 ngOnInit(): void {
  this._videoService.getCategories().subscribe((data: any) => {
    if(data.status == 200) {
      this.categoriesList = data.body.categories;
      let index = this.categoriesList.indexOf("All");
      if (index > -1) {
        this.categoriesList.splice(index, 1);
      }
    }
    
  });
}

}
