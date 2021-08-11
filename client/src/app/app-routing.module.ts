import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

import { DefaultComponent } from './layouts/default/default.component';
import { FullscreenComponent } from './layouts/fullscreen/fullscreen.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { LearningComponent } from './modules/learning/learning.component';
import { AccountComponent } from './modules/account/account.component';
import { RegisterComponent } from './modules/register/register.component';
import { CommunityThreadsComponent } from './modules/community/community-threads/community-threads.component';
import { CommunityThreadComponent } from './modules/community/community-thread/community-thread.component';
import { VideoListComponent } from './modules/learning/learning-videos/learning-videos.component';
import { LearningVideoComponent } from './modules/learning/learning-video/learning-video.component';
import { ZoomComponent } from './modules/zoom/zoom.component';
import { ConferencesComponent } from './modules/conferences/conference-list/conferences.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'learning',
        component: LearningComponent
      },
      {
        path: 'learning/:category',
        component: VideoListComponent
      },
      {
        path: 'learning/:category/:term',
        component: LearningVideoComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'community',
        component: CommunityThreadsComponent
      },
      {
        path: 'community/:term',
        component: CommunityThreadComponent
      },
      {
        path: 'conferences',
        component: ConferencesComponent
      }

    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth', component: FullscreenComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ],
  },
  {
    path: 'zoom', component: ZoomComponent, canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
