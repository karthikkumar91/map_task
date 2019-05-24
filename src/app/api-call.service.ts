import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs"
interface Location{
  latitude;
  longitude;
  response: any;
  headerFullLocation:any
  result
}
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) { }

  private credentials = 'client_id= ERXASQWJPXQZGFA5PUBVB3FR03K012B0ADMYRAJP4VPLBBDE&client_secret= QL0WDHGJLQVZZDFWIYFV15NGV5C3KJUWXOLVK5AAX3D1DR3J'
  private map_key = 'AIzaSyBOQcBlbuSNv1F9GHCp8BAp6ZfDJoRLjXQ';
  private url = '';
  private location = "udupi";
  result:any;
  data:any;
  check:any;
  photo:any;
  private hasChanges: boolean = false;


  getApi(lat ,lng){
    return this.http.get<Location>('https://api.foursquare.com/v2/venues/explore?ll='+lat+','+lng+'&v=20181106&limit=20&radius=500&section=food&client_id=ERXASQWJPXQZGFA5PUBVB3FR03K012B0ADMYRAJP4VPLBBDE&client_secret=QL0WDHGJLQVZZDFWIYFV15NGV5C3KJUWXOLVK5AAX3D1DR3J')
}

  getdetails(callback){
    console.log("sucess")
      this.url = "https://api.foursquare.com/v2/venues/search?"+ this.credentials + '&near=' + this.location + '&query=' + 'food' + '&v=20173009&m=foursquare'
      this.result =  this.http.get(this.url)
      .subscribe((response :Response)=>{
        this.data =  response['response'];
        this.hasChanges = false;
        callback(this.data);
      })
  }
  getPhotos(locationnames){
    return this.http.get('https://api.foursquare.com/v2/venues/'+locationnames+'/photos?ll=40.7,-74&client_id=ERXASQWJPXQZGFA5PUBVB3FR03K012B0ADMYRAJP4VPLBBDE&client_secret=QL0WDHGJLQVZZDFWIYFV15NGV5C3KJUWXOLVK5AAX3D1DR3J&v=20173009')
  }
  // gethotels(lat, lng) {
  //   return this.http.get(
  //     " https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
  //       lng +
  //       "," +
  //       lat +
  //       "&key=AIzaSyBOQcBlbuSNv1F9GHCp8BAp6ZfDJoRLjXQ"
  //   );
  // }
  // getaddress(placeid) {
  //   console.log('services---->',placeid);
  //   return this.http.get<Location>(
  //     "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
  //       placeid +
  //       "&fields=name,rating,formatted_address,formatted_phone_number&key="+this.map_key
  //   );
  // }

}
