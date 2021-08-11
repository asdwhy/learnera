import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  sideBarRoutes = [
    {
      path: "..",
      text: "Home"
    },
    {
      path: "./learning",
      text: "Learning"
    },
    {
      path: "./community",
      text: "Community"
    },
    {
      path: "./conferences",
      text: "Conferences"
    }
  ];

  ngOnInit(): void {
  }
}
