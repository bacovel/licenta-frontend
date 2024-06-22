import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otp: string;
  length: number;

  constructor(
    private authService: AuthService,
    private global: GlobalService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onOtpChange(otp: string) {
    this.otp = otp;
    console.log(this.otp);
  }

  getOtpLength(length: number) {
    this.length = length;
  }

  resend() {
    this.authService
      .resendOtp()
      .then((response) => {
        if (response?.success) {
          this.global.successToast(
            'OTP verification token was sent successfully to your email',
          );
        }
      })
      .catch((e) => {
        console.log(e);
        let msg = 'Your OTP expired or invalid. Please resend.';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }

  verify() {
    if (this.otp?.length != this.length) {
      return this.global.showAlert('Please enter the correct OTP');
    }
    this.authService
      .verifyEmailOtp({ verification_token: this.otp })
      .then((response) => {
        console.log(response);
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      })
      .catch((e) => {
        console.log(e);
        let msg = 'Please enter the correct OTP';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }
}
