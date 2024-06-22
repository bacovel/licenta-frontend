import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Input() model: any;
  otp: string;
  length: number;
  flag: number;

  constructor(
    private modalCtrl: ModalController,
    private global: GlobalService,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  onOtpChange(otp: string) {
    this.otp = otp;
    console.log(this.otp);
  }

  getOtpLength(length: number) {
    this.length = length;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getData() {
    let data: any = {};
    if (this.model?.email === '' && this.model?.otp === '') {
      data = {
        title: 'Forgot Password',
        subTitle: 'Please enter email address!',
        button: 'SEND CODE',
      };
      this.otp = '';
      this.flag = 1;
    } else if (this.model?.email !== '' && this.model?.otp === '') {
      data = {
        title: 'Verify your email',
        subTitle: 'Please enter the verification code!',
        button: 'VERIFY',
      };
      this.flag = 2;
    } else {
      data = {
        title: 'Reset Password',
        subTitle: 'Please enter new password, minimum 8 characters!',
        button: 'SAVE',
      };
      this.flag = 3;
    }

    return data;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) return;
    if (this.flag === 1) {
      this.sendEmailOtp(form.value.email);
    } else if (this.flag === 2) {
      this.verifyOtp(this.otp);
    } else if (this.flag === 3) {
      this.resetPassword(form.value.new_password);
    }
  }

  sendEmailOtp(email: any) {
    this.authService
      .sendResetPasswordOtp(email)
      .then((data) => {
        console.log(data);
        this.model = { ...this.model, email };
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
    this.authService
      .verifyResetPasswordOtp(this.model.email, otp)
      .then((data) => {
        console.log(data);
        this.model = { ...this.model, otp };
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

  resetPassword(new_password: any) {
    this.model = { ...this.model, new_password };
    console.log('data sent: ', this.model);
    this.authService
      .resetPassword(this.model)
      .then((data) => {
        console.log(data);
        this.modalCtrl.dismiss(null, 'cancel');
        this.global.successToast(
          'Password reset successfully. Please login with new password',
        );
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
}
