import { AuthService } from './../auth.service';
import { RegisterUser } from './../RegisterUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = { userName: '', password: '', password2: '' };
  warning: string;
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.registerUser.userName === '' ||
      this.registerUser.password === '' ||
      this.registerUser.password2 === ''
    ) {
      this.success = false;
      this.loading = false;
      this.warning = "Fields can't be empty";
    } else {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        () => {
          this.success = true;
          this.loading = false;
          this.warning = null;
        },
        (err) => {
          this.success = false;
          this.loading = false;
          this.warning = err.error.message;
        }
      );
    }
  }
}
