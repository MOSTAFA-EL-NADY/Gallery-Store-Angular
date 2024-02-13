import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlbumDetailsComponent } from './components/album/album-details/album-details.component';
import { CreateImageComponent } from './components/image/create-image/create-image.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CreateAlbumComponent } from './components/album/create-album/create-album.component';

const routes:Routes=[
{
  path:'home',
  component:HomeComponent,
  canActivate: [AuthGuardService],

},

{
  path:'album/:id',
  component:AlbumDetailsComponent,
  canActivate: [AuthGuardService],

},
{
  path:'album/create',
  component:CreateAlbumComponent,
  canActivate: [AuthGuardService],

},

{
  path:'auth',
  component:LoginComponent
},
{
  path:'',
  component:HomeComponent
  
},
{
  path:'newImage/:id',
  component:CreateImageComponent,
  canActivate: [AuthGuardService],
 
},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
