import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmurfViewComponent } from './pages/smurf-view/smurf-view.component';
import { SmurfVillageComponent } from './pages/smurf-village/smurf-village.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SmurfViewComponent,
    SmurfVillageComponent,
    NewUserComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
