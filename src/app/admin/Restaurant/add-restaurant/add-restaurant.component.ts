import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RestaurantServiceService } from '../../restaurant-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss'],
})
export class AddRestaurantComponent {
  constructor(
    private restaurantService: RestaurantServiceService,
    private _sanitizer: DomSanitizer
  ) {}

  restaurantList: any[] = [];
  catEncode: any = '';
  imagePath: any = '';
  restaurantStaus = 'Add';
  updateimgsource : any = '';
  nextValueLength: number | undefined;
  restaurantimgDisable = false;
  updateIdValue : number | undefined;
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
      this.updateimgsource = this.catEncode;
    };
    reader.readAsDataURL(FileSource);
    
  }

  saveRestFormData() {
    const restauranntData = {
      restaurantName: this.RestaurantForm.controls.restaurantName.value,
      cuisineType: this.RestaurantForm.controls.cuisineType.value,
      address: this.RestaurantForm.controls.companyAddress.value,
      phoneNumber: this.RestaurantForm.controls.phoneNumber.value,
      restaurantUrl: this.updateimgsource,
      email: this.RestaurantForm.controls.email.value,
    };
    console.log(restauranntData);
    if (this.restaurantStaus=='Add'){
       this.restaurantService.saveRestaurantData(restauranntData).subscribe({
         next: (next: any) => {
           debugger;
           if (next.status == true) {
             alert(next.message);
             this.RestaurantForm.reset();
             this.restaurantList = [];
             this.getRestaurantList();
             const clearfile = document.getElementById(
               'user_avatar'
             ) as HTMLInputElement;
             clearfile.value = '';
             this.updateimgsource = '';
           }
         },
         error: (error: any) => {
           console.log(error);
         },
       });
    }else if (this.restaurantStaus == 'Edit') {
      alert("updated")
       console.log(restauranntData);
        this.restaurantService.updateRestaurant(restauranntData, this.updateIdValue).subscribe({
          next:(next:any)=>{
            if (next.status == true) {
             alert(next.message);
             this.RestaurantForm.reset();
             this.restaurantList = [];
             this.getRestaurantList();
             const clearfile = document.getElementById(
               'user_avatar'
             ) as HTMLInputElement;
             clearfile.value = '';
             this.updateimgsource = '';
           }
         },
         error: (error: any) => {
           console.log(error);
         },
          
        })
     
    }
     
  }

  getRestaurantList() {
    this.restaurantService.getRestaurantList().subscribe({
      next: (response: any) => {
        debugger;
        const restaurantimgTag = document.getElementById(
          'restaurant_img'
        ) as HTMLDivElement;

        for (let i = 0; i < response.length; i++) {
          debugger;

          this.restaurantList.push({
            restaurantId: response[i].restaurantId,
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

  restaurantEdit(index: any) {
    debugger;
    this.RestaurantForm.controls['restaurantName'].setValue(
      this.restaurantList[index].restaurantName
    );
    this.RestaurantForm.controls['cuisineType'].setValue(
      this.restaurantList[index].cuisineType
    );
    this.RestaurantForm.controls['companyAddress'].setValue(
      this.restaurantList[index].address
    );
    this.RestaurantForm.controls['phoneNumber'].setValue(
      this.restaurantList[index].phoneNumber
    );
    this.RestaurantForm.controls['email'].setValue(
      this.restaurantList[index].email
    );
    this.restaurantimgDisable = false;
    this.updateimgsource = this.restaurantList[index].restaurant_url;
    this.restaurantStaus='Edit';
    this.updateIdValue = this.restaurantList[index].restaurantId;
  }

  deleteRest(index: any) {
    debugger;
    this.restaurantService
      .deleteRestaurant(this.restaurantList[index].restaurantId)
      .subscribe({
        next: (next: any) => {
          if (next.status == true) {
            alert(next.message);
            this.restaurantList = [];
            this.getRestaurantList();
            this.updateimgsource='';  
          } else {
            alert(next.error);
          }
        },
      });
  }
}
