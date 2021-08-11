import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private routerService: Router
  ) { }

  ngOnInit(): void {
  }

  onSeeVideoCategories(): void {
    this.routerService.navigate(["learning/"]);
  }

  onSeeAllVideos(): void {
    this.routerService.navigate(["learning/all/"]);
  }

  onSeeAllThreads(): void {
    this.routerService.navigate(["community/"]);
  }

  onEditProfile(): void {
    this.routerService.navigate(["account/"]);
  }

}
