import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import {ActivatedRoute} from '@angular/router'
import {ApiCallService} from'../api-call.service'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private router : ActivatedRoute,private api :ApiCallService) { }
id:any;
photo:any
lat: number; 
lng: number;
location:any;
name:string;
catagories:string;
cross:string
address:string
placeresult;
tempobj;
placeid1;
finalresult;

  ngOnInit() {
    this.router.params.subscribe((data)=>{
      this.id=data.id;
      this.lat=parseFloat(data.lat);
      this.lng=parseFloat(data.lng);
      // console.log(data.id);
      this.api.getPhotos(this.id).subscribe(res=>{
        var value = res['response']
        console.log(value)
        const prefix = value.photos.items[0].prefix;
        const suffix = value.photos.items[0].suffix;
        this.photo =prefix+"324x190"+suffix;
        console.log(this.photo);
      })
    })
    this.api.getApi(this.lat,this.lng).subscribe(res=>{
      var headerFullLocation = res['response']
      this.location = headerFullLocation.headerFullLocation
      this.name=headerFullLocation.groups[0].items[0].venue.name
      this.catagories = headerFullLocation.groups[0].items[0].venue.categories[0].name
      this.address = headerFullLocation.groups[0].items[0].venue.location.address
      this.cross = headerFullLocation.groups[0].items[0].venue.location.crossStreet
    
    })
  }

}




// this.api.gethotels(this.lat,this.lng).subscribe(res=>{
//   this.tempobj = res;
//     console.log("@@@@@@@@@@@@@@", this.tempobj.results[0].place_id);

//     this.placeid1 = this.tempobj.results[0].place_id;
//     console.log("final placeid--->", this.placeid1);
//     this.api.getaddress(this.placeid1).subscribe(res=>{
//       console.log('#333333333333333333',res);
//     console.log("---------------->>>",res.result);
//     this.finalresult=res.result;
//     })
// })