import { Component, OnInit, inject } from '@angular/core';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../../features/models/user-profile.model';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ProfilePictureComponent, GeneralInfoComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    private profileService = inject(ProfileService);
    private dialog = inject(MatDialog);

    userProfile!: UserProfile;

    ngOnInit(): void {
        this.profileService
            .getUserProfile()
            .pipe(
                tap((profile: UserProfile) => {
                    this.userProfile = profile;
                }),
                catchError((error) => {
                    console.error('Error fetching profile', error);
                    showMessageDialog(this.dialog, error.error.message, 'close');
                    return of(error);
                }),
            )
            .subscribe();
    }

    getProfilePicture(): string {
        return this.userProfile && this.userProfile.profilePicture
            ? this.userProfile.profilePicture
            : '';
    }
}
