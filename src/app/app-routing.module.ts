import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './map/map.component';
import { DetailsComponent } from './details/details.component';



const routes: Routes = [
  // {path: "" , component : HomePageComponent,children:[
  //   {path:"",component : MapComponent}]},
  {path: "" , component : MapComponent},
  {path : "details/:id/:lat/:lng", component : DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
