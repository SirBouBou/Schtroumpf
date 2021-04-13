import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { SmurfViewComponent } from './pages/smurf-view/smurf-view.component';
import { SmurfVillageComponent } from './pages/smurf-village/smurf-village.component';

const routes: Routes = [
  { path: 'app/smurf', component: SmurfVillageComponent },
  { path: 'app/smurf/:smurfId', component: SmurfViewComponent },
  { path: 'app/newUser', component: NewUserComponent},
  { path: 'app/login', component: LoginUserComponent},
  { path: 'app/profiles', component: SmurfViewComponent},
  { path: '', redirectTo: 'app/smurf', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
