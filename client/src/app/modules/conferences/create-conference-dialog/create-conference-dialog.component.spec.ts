import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConferenceDialogComponent } from './create-conference-dialog.component';

describe('CreateThreadDialogComponent', () => {
  let component: CreateConferenceDialogComponent;
  let fixture: ComponentFixture<CreateConferenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConferenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
