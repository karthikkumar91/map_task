import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './map/map.component';
import {AgmCoreModule } from '@agm/core'
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';

import { SwiperModule } from 'angular2-useful-swiper';

import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    
    MapComponent,
    DetailsComponent,

    FooterComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyBOQcBlbuSNv1F9GHCp8BAp6ZfDJoRLjXQ',
  libraries:['places']}),
    HttpClientModule,
    SwiperModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
