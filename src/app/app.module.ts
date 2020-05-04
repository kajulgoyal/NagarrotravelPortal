import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService, StorageServiceModule} from 'angular-webstorage-service';
import { UserModule } from './user/user.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
    ], 
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    UserModule,
    AdminModule,
    FormsModule
  ], 
  providers: [LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
  constructor() {   }

}
