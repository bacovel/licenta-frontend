import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin: boolean = false;
  reset_pwd_model = {
    email: '',
    otp: '',
    new_password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private global: GlobalService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    // this.isLoggedIn();
  }

  async isLoggedIn() {
    try {
      const idVal = await this.authService.getToken();
      if (idVal) this.navigate();
    } catch (e) {
      console.log(e);
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) return;
    this.login(form);
  }

  login(form: NgForm) {
    console.log(form.value);
    this.isLogin = true;
    this.authService
      .login(form.value.email, form.value.password)
      .then((data) => {
        console.log(data);
        this.navigate();
        this.isLogin = false;
        form.reset();
      })
      .catch((e) => {
        console.log(e);
        this.isLogin = false;
        let msg = 'Could not sign you in, please try again';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }

  navigate() {
    this.router.navigate(['/tabs/home']);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ResetPasswordComponent,
      componentProps: {
        model: this.reset_pwd_model,
      },
    });
    modal.present();
  }

  sendEmailOtp(email: any) {
    this.authService
      .sendResetPasswordOtp(email)
      .then((data) => {
        console.log(data);
        this.reset_pwd_model = { ...this.reset_pwd_model, email };
      })
      .catch((e) => {
        console.log(e);
        let msg = 'Something went wrong, please try again';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }

  verifyOtp(otp: any) {
    this.reset_pwd_model = { ...this.reset_pwd_model, otp };
  }

  resetPassword(new_password: any) {
    this.reset_pwd_model = { ...this.reset_pwd_model, new_password };
  }
}
