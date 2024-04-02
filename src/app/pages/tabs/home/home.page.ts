import { Component, OnInit } from '@angular/core';
import { SearchbarInputEventDetail } from '@ionic/angular';
import { IAnnouncement } from 'src/app/interfaces/iannouncement';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  announcements: IAnnouncement[] = [];
  copyAnnouncements: IAnnouncement[] = this.announcements;
  query: string = '';
  selectedCategory: string = 'all'; // Default category

  constructor() {}

  ngOnInit() {
    this.announcements = [
      {
        uid: '2werd',
        image: '../../../../assets/hainaTest.jpeg',
        title: 'Haina',
        description: 'Calitate foarte buna',
        category: 'item',
        price: 20,
      },
      {
        uid: '2wer2d',
        image: '../../../../assets/hainaTest.jpeg',
        title: 'Plita',
        description: 'Am folosit o doar odata',
        category: 'item',
        price: 40,
      },
      {
        uid: '2wdferd',
        image: '../../../../assets/hainaTest.jpeg',
        title: 'Tigari',
        description: 'Dunhill negru',
        category: 'item',
        price: 15,
      },
      {
        uid: '2weghrd',
        image: '../../../../assets/hainaTest.jpeg',
        title: 'Spalat',
        description: 'Am masina de spalat rufe',
        category: 'service',
        price: 5,
      },
      {
        uid: '2wuird',
        image: '../../../../assets/hainaTest.jpeg',
        title: 'Rapid',
        description: 'Am nevoie de un tirbuson',
        category: 'need',
      },
    ];

    this.copyAnnouncements = [...this.announcements];
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
