import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnnouncementComponent } from './announcement/announcement.component';

@NgModule({
  declarations: [AnnouncementComponent],
  imports: [CommonModule, IonicModule],
  exports: [AnnouncementComponent],
})
export class ComponentsModule {}
