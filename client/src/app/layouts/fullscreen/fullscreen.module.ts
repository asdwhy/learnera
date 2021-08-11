import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenComponent } from './fullscreen.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { UserService } from 'src/app/services/user/user.service';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';
import { ZoomComponent } from '../../modules/zoom/zoom.component';

@NgModule({
  declarations: [
    FullscreenComponent,
    LoginComponent,
    RegisterComponent,
    ZoomComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    UserService, 
    RestApiService
  ],
})
export class FullscreenModule { }
