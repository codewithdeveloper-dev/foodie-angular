import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
@Injectable({
  providedIn: 'root',
})
export class RestaurantServiceService {
  // public baseUrl = 'http://localhost:9090/';

  constructor(private http: HttpClient, private ResUrl: EnvironmentService) {}

  httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  saveRestaurantData(RestaurantData: any) {
    console.log(RestaurantData);
    return this.http.post(
      this.ResUrl.getResUrl() + 'saveRestaurant',
      RestaurantData
    );
  }

  getRestaurantList() {
    return this.http.get(this.ResUrl.getResUrl() + 'getRestaurant');
  }
  updateRestaurant(restauranntData: any, updateIdValue: any) {
    return this.http.put(
      this.ResUrl.getResUrl() + 'updateResaurant/' + updateIdValue,
      restauranntData
    );
  }

  deleteRestaurant(id: any) {
    debugger;
    return this.http.delete(this.ResUrl.getResUrl() + 'deleteResaurant/' + id);
  }
}
