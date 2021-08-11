import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommentsComponent } from './components/comments/comments.component';
import { RequiredLabelComponent } from './components/required-label/required-label.component';
import { UserIdentityComponent } from './components/user-identity/user-identity.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    CommentsComponent,
    RequiredLabelComponent,
    UserIdentityComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    CommentsComponent,
    RequiredLabelComponent,
    UserIdentityComponent
  ]
})
export class SharedModule { }
