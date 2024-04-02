import { Component, Input, OnInit } from '@angular/core';
import { IAnnouncement } from 'src/app/interfaces/iannouncement';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  @Input() announcement: IAnnouncement | undefined;

  constructor() {}

  ngOnInit() {}
}
