/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {ApiCallService} from '../api-call.service'
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { MapsAPILoader} from '@agm/core';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('1.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('1.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
result:any;


@ViewChild('search')
public searchElementRef : ElementRef;
public zoom: number=18;
public latitude: number;
public longitude: number;
public latlongs: any = [];
public latlong: any = {};
public searchControl: FormControl;
public placeID : String;
public location: any;
public name: any;
public locationnames: any;
public a;
public b;
  constructor(private mapsAPILoader : MapsAPILoader, private ngZone: NgZone,private api : ApiCallService) {

   }
 
  ngOnInit() {
    this.zoom=18;
    this.latitude ;
    this.longitude;
    this.searchControl=new FormControl();
    this.setCurrentPosition() ;
    
    this.mapsAPILoader.load().then( () => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
        types: [],
    
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run( () => {
          
          const place:google.maps.places.PlaceResult = autocomplete.getPlace();
          this.placeID = place.place_id;
          if(place.geometry === undefined || place.geometry === null){
            return;
          }
          const latlong={
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          };
          console.log(latlong)
          this.latlongs = [];
          this.latlongs.push(latlong);
          console.log(this.latlongs);
        

          this.setCurrentPosition()
          
        });
      });
    });
    this.items.length ? this.hideItems() : this.showItems();
    
  }
 check(locationnames){
   console.log('checking purpose');
   this.api.getPhotos(locationnames).subscribe(res=>{
   var value = res['response']
    const prefix = value.photos.items[0].prefix;
    const suffix = value.photos.items[0].suffix;
    const photo =prefix+"300x300"+suffix;
    console.log(photo);
   })
 }
  setCurrentPosition(){
    
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) =>{

   if(this.latlongs.length == 0){
    this.latitude=position.coords.latitude;
    this.longitude=position.coords.longitude;
    console.log("==============>>>> in if");
    this.api.getApi(this.latitude, this.longitude).subscribe(result => {
      
      const api1 = result.response.groups.map(res => res.items)
      this.location = api1.map(res => res.map(res1 => res1.venue.location ))[0];
      this.locationnames = api1.map(res => res.map(res1 => res1.venue))[0];
// console.log(this.locationnames)
console.log(this.locationnames)
// this.nameOfRes=[Object.assign({},this.name)]
// console.log(  this.nameOfRes)  
this.check(this.locationnames)
    })
   }
   else{
     console.log("======>>>>>>.....in else");
     
    //  this.latitude=this.latlongs[]
    console.log(this.latlongs,"==============================================>>>>>>>>>>>>>>>....");
    
      this.latlongs.map(element => {

        this.latitude=element.latitude;
        this.longitude=element.longitude;
        console.log(this.latitude,this.longitude);
       
        this.api.getApi(this.latitude, this.longitude).subscribe(result => {
          const api1 = result.response.groups.map(res => res.items)
          this.location = api1.map(res => res.map(res1 => res1.venue.location ))[0];
          this.locationnames = api1.map(res => res.map(res1 => res1.venue))[0];
    // console.log(this.locationnames)
    console.log(this.locationnames)
    // this.nameOfRes=[Object.assign({},this.name)]
    // console.log(  this.nameOfRes)   
    this.check(this.locationnames)
        });
      });
   }
      this.zoom=8;
      });
    }
  }
  circleOut(label) {
    // marker.fillColor = "#EC407A";
    console.log(label);
    
  }
  
  circleOver(label) {
    // marker.fillColor = "#ff0057";
    console.log(label);

  }

  lat: number = 13.37999359999999; 
  lng: number =74.739712;
  //zoom: number = 14;
  items = [];
  // logAnimation(_event) {
  //   console.log(_event)
  // }
  showItems() {
    [0, 1, 2, 3, 4, 6, 7, 8, 9, 10].map((i) => {
      this.items.push("User Number - " + i)
    })

  }

  hideItems() {
    this.items = [];
  }
}
