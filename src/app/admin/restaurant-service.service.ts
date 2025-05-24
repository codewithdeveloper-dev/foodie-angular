import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RestaurantServiceService {
  public baseUrl = 'http://localhost:9090/';

  constructor(private http: HttpClient) {}

  saveRestaurantData(RestaurantData: any) {
    console.log(RestaurantData);
    return this.http.post(this.baseUrl + 'saveRestaurant', RestaurantData);
  }

  getRestaurantList() {
    return this.http.get(this.baseUrl + 'getRestaurant');
  }

  deleteRestaurant(id : any){
    debugger
    return this.http.delete(this.baseUrl + 'deleteResaurant/'+id);
  }
}
