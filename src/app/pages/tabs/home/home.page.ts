import { Component, OnInit } from '@angular/core';
import { SearchbarInputEventDetail } from '@ionic/angular';
import { IAnnouncement } from 'src/app/interfaces/iannouncement';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  announcements: IAnnouncement[] = [];
  copyAnnouncements: IAnnouncement[] = [];
  query: string = '';
  selectedCategory: string = 'all';

  constructor(private announcementService: AnnouncementService) {}

  async ngOnInit() {
    try {
      this.announcements = await this.announcementService.getAnnouncements();
      this.copyAnnouncements = [...this.announcements];
    } catch (error) {
      console.log('Error loading announcements', error);
    }
  }

  onSearchChange(event: CustomEvent<SearchbarInputEventDetail>) {
    const searchTerm: string = event.detail.value?.toLowerCase() || '';
    this.query = searchTerm;
    this.filterAnnouncements();
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedCategory = event.detail.value || 'all';
    this.filterAnnouncements();
  }

  filterAnnouncements() {
    if (this.query.length > 0) {
      this.copyAnnouncements = this.announcements.filter(
        (element: IAnnouncement) => {
          return (
            element.title.toLowerCase().includes(this.query) &&
            (this.selectedCategory === 'all' ||
              element.category === this.selectedCategory)
          );
        },
      );
    } else {
      this.copyAnnouncements =
        this.selectedCategory === 'all'
          ? [...this.announcements]
          : this.announcements.filter((element: IAnnouncement) => {
              return element.category === this.selectedCategory;
            });
    }
  }
}
