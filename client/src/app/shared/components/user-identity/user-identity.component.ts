import {Component, Input, OnInit} from '@angular/core';
//should be used in a matcard
@Component({
  selector: 'app-user-identity',
  templateUrl: './user-identity.component.html',
  styleUrls: ['./user-identity.component.scss']
})
export class UserIdentityComponent implements OnInit {
  @Input()
  title: String = "";
  @Input()
  userName: String = "";
  @Input()
  date: Date | null = null;
  @Input()
  profileImageUrl: String ="";

  constructor() { }


  ngOnInit(): void {
  }

}