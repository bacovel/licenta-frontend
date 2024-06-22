import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProfile } from 'src/app/interfaces/iprofile';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: IProfile | undefined;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profile = this.authService.getUserProfile();
  }

  async uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // TODO: upload image
    var imageResponse: { link: string } = (await this.apiService.post(
      'user/upload',
      formData,
      true,
    )) as { link: string };
    this.profile.image = imageResponse.link;
    // this.profile.image = imageResponse.;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
