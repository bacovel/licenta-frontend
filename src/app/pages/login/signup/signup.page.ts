import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isLoading: boolean = false;
  isNameValid: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private global: GlobalService,
  ) {}

  ngOnInit() {}

  validateName(name: string) {
    const namePattern = /^[A-Za-z]{2,}(?: [A-Za-z]+)*$/;
    this.isNameValid = namePattern.test(name);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.register(form);
  }

  register(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    this.authService
      .register(form.value)
      .then((data) => {
        this.router.navigateByUrl('/tabs/otp');
        this.isLoading = false;
        console.log(data);
        form.reset();
        this.global.successToast(
          'OTP verification token was sent successfully to your email',
        );
      })
      .catch((e) => {
        console.log(e);
        this.isLoading = false;
        let msg = 'Could not sign you up, please try again';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }
}
