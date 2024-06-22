import { Component, Input, OnInit } from '@angular/core';
import { IAnnouncement } from 'src/app/interfaces/iannouncement';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  @Input() announcement: IAnnouncement | undefined;

  constructor() {}

  ngOnInit() {
    console.log(this.announcement.image, typeof this.announcement.image);
    this.announcement.imageUrl = `${environment.serverBaseUrl}announcement/image/${this.announcement._id}`;
    console.log(this.announcement.imageUrl);
  }
}
