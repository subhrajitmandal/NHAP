import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { take } from 'rxjs/operators';

export interface ProfileDatatype {
  name: string,
  phone: string,
  email: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  profileDetails: ProfileDatatype;


  constructor(private profileService: ProfileService) { 
    this.profileDetails = {name: '', phone: '', email: ''};
  }

  ngOnInit(): void {

    this.profileService.getUserProfile()
    .pipe(
      take(1)
    )
    .subscribe( (profileData: ProfileDatatype) => {
      this.profileDetails.name = profileData.name;
      this.profileDetails.phone = profileData.phone;
      this.profileDetails.email = profileData.email;

    });
  }


}
