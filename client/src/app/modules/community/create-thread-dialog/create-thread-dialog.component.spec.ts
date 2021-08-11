import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThreadDialogComponent } from './create-thread-dialog.component';

describe('CreateThreadDialogComponent', () => {
  let component: CreateThreadDialogComponent;
  let fixture: ComponentFixture<CreateThreadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateThreadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateThreadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
