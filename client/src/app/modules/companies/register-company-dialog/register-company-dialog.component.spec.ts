import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyDialogComponent } from './register-company-dialog.component';

describe('RegisterCompanyDialogComponent', () => {
  let component: RegisterCompanyDialogComponent;
  let fixture: ComponentFixture<RegisterCompanyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
