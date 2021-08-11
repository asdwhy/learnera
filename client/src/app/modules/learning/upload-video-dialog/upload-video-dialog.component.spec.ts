import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVideoDialogComponent } from './upload-video-dialog.component';

describe('UploadVideoDialogComponent', () => {
  let component: UploadVideoDialogComponent;
  let fixture: ComponentFixture<UploadVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadVideoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
