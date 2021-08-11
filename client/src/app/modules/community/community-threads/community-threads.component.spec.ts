import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityThreadsComponent } from './community-threads.component';

describe('CommunityThreadsComponent', () => {
  let component: CommunityThreadsComponent;
  let fixture: ComponentFixture<CommunityThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityThreadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
