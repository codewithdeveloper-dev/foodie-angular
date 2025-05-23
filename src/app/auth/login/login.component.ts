import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { EnvironmentService } from 'src/app/environment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup

  constructor(private fb: FormBuilder, private toastr: ToastrService, private Service: AuthService,
    private envir: EnvironmentService ) {

    this.LoginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  Login:boolean = true
  onSubmit() {
    if (this.LoginForm.valid) {
      const json = {
        UserName: this.LoginForm.controls['UserName'].value,
        Email: this.LoginForm.controls['Email'].value,
        password: this.encrypt(this.LoginForm.controls['password'].value,this.envir.getsecretkey()),
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

  encrypt(text:any, key:any) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result); 
  }

}
