import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { LearningComponent } from 'src/app/modules/learning/learning.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AccountComponent } from 'src/app/modules/account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommunityThreadsComponent } from 'src/app/modules/community/community-threads/community-threads.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommunityThreadComponent } from '../../modules/community/community-thread/community-thread.component';
import { CreateThreadDialogComponent } from 'src/app/modules/community/create-thread-dialog/create-thread-dialog.component';
import { UploadVideoDialogComponent } from '../../modules/learning/upload-video-dialog/upload-video-dialog.component';
import { VideoListComponent } from '../../modules/learning/learning-videos/learning-videos.component';
import { LearningVideoComponent } from '../../modules/learning/learning-video/learning-video.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CompaniesComponent } from '../../modules/companies/companies.component';
import { RegisterCompanyDialogComponent } from '../../modules/companies/register-company-dialog/register-company-dialog.component';
import { ConferencesComponent } from '../../modules/conferences/conference-list/conferences.component';
import { CreateConferenceDialogComponent } from 'src/app/modules/conferences/create-conference-dialog/create-conference-dialog.component';

@NgModule({
  declarations: [
    DefaultComponent,
    LearningComponent,
    HomeComponent,
    CommunityThreadsComponent,
    AccountComponent,
    CommunityThreadComponent,
    CreateThreadDialogComponent,
    UploadVideoDialogComponent,
    VideoListComponent,
    LearningVideoComponent,
    CompaniesComponent,
    RegisterCompanyDialogComponent,
    ConferencesComponent,
    CreateConferenceDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class DefaultModule { }
