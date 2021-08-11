import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningVideoComponent } from './learning-video.component';

describe('LearningVideoComponent', () => {
  let component: LearningVideoComponent;
  let fixture: ComponentFixture<LearningVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
