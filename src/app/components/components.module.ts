import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpInputComponent } from './otp-input/otp-input.component';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [AnnouncementComponent, OtpInputComponent],
  imports: [CommonModule, IonicModule, NgOtpInputModule],
  exports: [AnnouncementComponent, OtpInputComponent],
})
export class ComponentsModule {}
