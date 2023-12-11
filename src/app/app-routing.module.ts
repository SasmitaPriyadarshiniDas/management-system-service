import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'sign-up', component:SignUpComponent},
  { path:'dashboard', component:DashboardComponent },
  { path:'viewprofile', component:ViewProfileComponent },
  { path:'editprofile', component:EditProfileComponent },
  { path:'', component:LoginComponent, pathMatch:'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
