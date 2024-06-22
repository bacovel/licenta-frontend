import { Injectable } from '@angular/core';
import {
  AlertButton,
  AlertController,
  AlertInput,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isLoading: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {}

  setLoader() {
    this.isLoading = !this.isLoading;
  }

  showAlert(
    message: string,
    header?: string | undefined,
    buttonArray?: (string | AlertButton)[] | undefined,
    inputs?: AlertInput[] | undefined,
  ) {
    this.alertCtrl
      .create({
        header: header ? header : 'Authentication failed',
        message: message,
        inputs: inputs ? inputs : [],
        buttons: buttonArray ? buttonArray : ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }

  async showToast(msg: any, color: string, duration = 3000) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
      color: color,
    });
    toast.present();
  }

  async toastDismiss(data?: boolean) {
    await this.toastCtrl.dismiss(data);
  }

  async showButtonToast(msg: any, position?: any) {
    const toast = await this.toastCtrl.create({
      header: 'Alert',
      message: msg,
      color: 'danger',
      position: position || 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'VERIFY',
          handler: () => {
            this.toastDismiss(true);
          },
        },
        {
          side: 'start',
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();
    const { data } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', data);
    if (data) return data;
  }

  errorToast(msg?: any, duration = 4000) {
    this.showToast(msg ? msg : 'No Internet Connection', 'danger', duration);
  }

  successToast(msg: any) {
    this.showToast(msg, 'success');
  }

  hideLoader() {
    // this.isLoading = false;
    if (this.isLoading) this.setLoader();
    return this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'))
      .catch((e) => console.log('error hide loader: ', e));
  }
}
