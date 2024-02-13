import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AlbumDataComponent } from './components/album/album-data/album-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreateAlbumComponent } from './components/album/create-album/create-album.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AlbumDetailsComponent } from './components/album/album-details/album-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AlbumSliderComponent } from './components/album/album-slider/album-slider.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CreateImageComponent } from './components/image/create-image/create-image.component';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    AlbumDataComponent,
    CreateAlbumComponent,
    AlbumDetailsComponent,
    HomeComponent,
    AlbumSliderComponent,
    CreateImageComponent,
    RegisterComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    ImageModule,
    GalleriaModule,
    KeyFilterModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
