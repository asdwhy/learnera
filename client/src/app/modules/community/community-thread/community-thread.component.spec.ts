import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityThreadComponent } from './community-thread.component';

describe('CommunityThreadComponent', () => {
  let component: CommunityThreadComponent;
  let fixture: ComponentFixture<CommunityThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
