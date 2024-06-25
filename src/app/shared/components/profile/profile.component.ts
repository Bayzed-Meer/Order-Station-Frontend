import { Component, OnInit, inject } from '@angular/core';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user-profile.model';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../utils/dialog-utils';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ProfilePictureComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    private userService = inject(UserService);
    private dialog = inject(MatDialog);

    userProfile!: UserProfile;

    ngOnInit(): void {
        this.userService
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
