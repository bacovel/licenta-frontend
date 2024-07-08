import { Component, Input, OnInit, enableProdMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IAnnouncement } from 'src/app/interfaces/iannouncement';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  id: string | null = '';
  data: IAnnouncement | undefined;
  currentUser: any;
  isLoading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private authService: AuthService,
    private global: GlobalService,
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(async (paramMap) => {
      if (!paramMap.has('announcementId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('announcementId');
      await this.getItemData();
      this.isLoading = false;
    });
    this.currentUser = this.authService.getCurrentUser();
  }

  async getItemData() {
    if (this.id) {
      try {
        const announcement = await this.announcementService.getAnnouncementById(
          this.id,
        );
        this.data = announcement;
        this.data.imageUrl = `${environment.serverBaseUrl}announcement/image/${this.data._id}`;
        console.log(this.data);
      } catch (error) {
        console.error('Error fetching announcement:', error);
      }
    }
  }

  callUser(phone: string | undefined) {
    if (phone) {
      window.open(`tel:${phone}`, '_system');
    }
  }

  async reserveAnnouncement() {
    if (this.id) {
      try {
        await this.announcementService.reserveAnnouncement(this.id);
        await this.getItemData();
      } catch (e) {
        console.log('Error reserving announcement:', e);
        let msg = 'Could not reserve the announcement, please try again later!';
        let header = 'Reservation failed';
        if ((e as any)?.error?.message) {
          msg = (e as any).error.message;
        }
        this.global.showAlert(msg, header);
      }
    }
  }

  async releaseAnnouncement() {
    if (this.id) {
      try {
        await this.announcementService.releaseAnnouncement(this.id);
        await this.getItemData();
      } catch (error) {
        console.error('Error releasing announcement:', error);
      }
    }
  }

  async deleteAnnouncement() {
    if (this.id) {
      try {
        await this.announcementService.deleteAnnouncement(this.id);
        this.navCtrl.back();
        this.global.successToast(
          'Announcement deleted successfully! Please refresh the page.',
        );
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  }
}
