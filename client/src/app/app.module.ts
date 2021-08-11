import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestApiService } from './services/rest-api/rest-api.service';
import { DefaultModule } from './layouts/default/default.module';
import { FullscreenModule } from './layouts/fullscreen/fullscreen.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    DefaultModule,
    FullscreenModule,
    ToastrModule.forRoot()
  ],
  providers: [
    RestApiService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: "BASE_API_URL", useValue: environment.server_host },
    { provide: "BASE_WEB_URL", useValue: environment.webserver_host }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }