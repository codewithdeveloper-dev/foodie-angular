import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ItemsComponent } from './order/items/items.component';
import { AddRestaurantComponent } from './admin/Restaurant/add-restaurant/add-restaurant.component';
import { AddRestaurantItemComponent } from './admin/Restaurant/add-restaurant-item/add-restaurant-item.component';
import { NavbarComponent } from './foody-common/navbar/navbar.component';
import { DashComponent } from './foody-common/dash/dash.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path:'admin/menu',component: MenuComponent},
  {path:"order/items",component:ItemsComponent},
  { path: 'admin/RestaurantAdd', component: AddRestaurantComponent },
  {path:'admin/RestaurantItemAdd',component:AddRestaurantItemComponent},
  { path: 'admin/menu', component: MenuComponent },
  { path: "order/items", component: ItemsComponent },
  { path: "home", component: NavbarComponent },
  {path:"dash",component:DashComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
