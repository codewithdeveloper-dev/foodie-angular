import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from 'src/app/environment.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private Url:EnvironmentService ) { }

  PostLogin(json:any):Observable<any> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' },
    };
    return this.http.post(this.Url.getauthurl() + 'register', json,httpOptions);
  }

}
