import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  selectedCategory: string = 'item';
  announcement = {
    title: '',
    description: '',
    price: null as number | null,
    image: '',
  };
  selectedImage: File | null = null;

  constructor(
    private navCtrl: NavController,
    private global: GlobalService,
    private announcementService: AnnouncementService,
  ) {}

  ngOnInit() {}

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  async submitAnnouncement() {
    const formData = new FormData();
    formData.append('user', 'user_id');
    formData.append('title', this.announcement.title);
    formData.append('description', this.announcement.description);
    formData.append('category', this.selectedCategory);
    if (this.selectedCategory !== 'need' && this.announcement.price !== null) {
      formData.append('price', this.announcement.price.toString());
    }
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    try {
      const response =
        await this.announcementService.createAnnouncement(formData);
      console.log('Announcement', response);
      this.navCtrl.navigateRoot('/tabs/home');
      this.global.successToast(
        'Announcement created successfully. Refresh the page!',
      );
    } catch (e) {
      console.log(e);
      let msg = 'Something went wrong. Please try again.';
      if ((e as any)?.error?.message) {
        msg = (e as any).error.message;
      }
      this.global.showAlert(msg);
    }
  }
}
