import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { EnvironmentService } from 'src/app/environment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Register!: FormGroup;
  LoginForm!:FormGroup
  

  constructor(private fb: FormBuilder, private toastr: ToastrService, private Service: AuthService,
    private envir: EnvironmentService,private Router:Router ) {

    this.Register = this.fb.group({
      UserName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

     this.LoginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  Login:boolean = true
  onSubmit() {
    if (this.Register.valid) {
      const json = {
        UserName: this.Register.controls['UserName'].value,
        Email: this.Register.controls['Email'].value,
        password: this.encrypt(this.Register.controls['password'].value,this.envir.getsecretkey()),
        RollId: 3
      }

      this.Service.PostLogin(json).subscribe({
        next: (data) => {
          this.toastr.success(data.message, 'Foody')
        },
        error: (error) => {
          debugger
          this.toastr.error(error.message, 'Foody')
        },
        complete: () => {

        }
      }
      );
    } else {
      this.toastr.error('Fill in the blanks', 'Foody')
    }
  }

  onSubmitLogin(){
    debugger
    if (this.LoginForm.valid) {
      const json = {
        Email: this.LoginForm.controls['Email'].value,
        password: this.encrypt(this.LoginForm.controls['password'].value,this.envir.getsecretkey()),
      }

      this.Service.Login(json).subscribe({
        next: (data) => {
          debugger
          if(data.token){
            this.toastr.success('Login Successfully', 'Foody');
            this.Router.navigateByUrl('/home')
          }
        },
        error: (error) => {
          this.toastr.error(error.message, 'Foody')
        },
        complete: () => {

        }
      }
      );
    } else {
      this.toastr.error('Fill in the blanks', 'Foody')
    }

  }

  encrypt(text:any, key:any) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result); 
  }

}
