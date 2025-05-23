import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  production() {
    return environment.production;
  }

  getauthurl(){
    return environment.AuthUrl
  }

  getsecretkey(){
    return environment.secretKey
  }

}
