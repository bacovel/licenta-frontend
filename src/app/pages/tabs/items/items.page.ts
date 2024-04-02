import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IAnnouncement } from 'src/app/interfaces/iannouncement';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  id: string | null = '';
  data: any = {};
  items: IAnnouncement[] = [];

  announcements = [
    {
      uid: '2werd',
      image: '../../../assets/hainaTest.jpeg',
      title: 'Haina',
      description: 'Calitate foarte buna',
      category: 'item',
      price: 20,
    },
    {
      uid: '2wer2d',
      image: '../../../assets/hainaTest.jpeg',
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
      image: '../../../assets/hainaTest.jpeg',
      title: 'Spalat',
      description: 'Am masina de spalat rufe',
      category: 'service',
      price: 5,
    },
    {
      uid: '2wuird',
      image: '../../../assets/hainaTest.jpeg',
      title: 'Rapid',
      description: 'Am nevoie de un tirbuson',
      category: 'need',
    },
  ];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      console.log('data: ', paramMap);
      if (!paramMap.has('announcementId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('announcementId');
      console.log('id: ', this.id);

      this.getItemData();
    });
  }

  getItemData() {
    this.data = {};
    this.data = this.announcements.filter((x) => x.uid === this.id);
    console.log('announcement ', this.data);
  }
}
