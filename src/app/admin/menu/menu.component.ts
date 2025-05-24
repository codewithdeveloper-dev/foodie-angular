import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestaurantServiceService } from '../restaurant-service.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(
    private restaurantService: RestaurantServiceService,
    private _sanitizer: DomSanitizer
  ) {}

  restaurantList: any[] = [];
  catEncode: any = '';
  imagePath : any ='';
  nextValueLength: number | undefined;

  ngOnInit(): void {
    this.getRestaurantList();
  }

  RestaurantForm = new FormGroup({
    restaurantName: new FormControl(''),
    cuisineType: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    companyAddress: new FormControl(''),
  });

  getFile(event: any) {
    debugger;
    const FileSource: File = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.catEncode = reader.result;
      console.log(this.catEncode);
    };
    reader.readAsDataURL(FileSource);
  }

  saveRestFormData() {
    const restauranntData = {
      restaurantName: this.RestaurantForm.controls.restaurantName.value,
      cuisineType: this.RestaurantForm.controls.cuisineType.value,
      address: this.RestaurantForm.controls.companyAddress.value,
      phoneNumber: this.RestaurantForm.controls.phoneNumber.value,
      restaurantUrl: this.catEncode,
      email: this.RestaurantForm.controls.email.value,
    };
    console.log(restauranntData);

    this.restaurantService.saveRestaurantData(restauranntData).subscribe({
      next: (next: any) => {
        debugger;
        alert(next.message);
        this.RestaurantForm.reset();
        this.restaurantList = [];
        this.getRestaurantList();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getRestaurantList() {
    this.restaurantService.getRestaurantList().subscribe({
      next: (response: any) => {
        debugger;

        for (let i = 0; i < response.length; i++) {
          debugger;
           
             this.restaurantList.push({
               restaurantName: response[i].restaurantName,
               cuisineType: response[i].cuisineType,
               address: response[i].address,
               phoneNumber: response[i].phoneNumber,
               restaurant_url: response[i].restaurant_url,
               email: response[i].email,
             });
        }
      },
    });
  }
}
