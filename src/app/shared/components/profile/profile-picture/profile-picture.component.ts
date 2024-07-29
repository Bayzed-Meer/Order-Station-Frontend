import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../../../shared/utils/dialog-utils';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../../features/models/user-profile.model';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-profile-picture',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, SpinnerComponent, CommonModule],
    templateUrl: './profile-picture.component.html',
    styleUrl: './profile-picture.component.scss',
})
export class ProfilePictureComponent {
    private profileService = inject(ProfileService);
    private dialog = inject(MatDialog);
    private cdr = inject(ChangeDetectorRef);

    @Input() image?: string;
    @Input() userProfile?: UserProfile;

    profilePicture: string | ArrayBuffer = '';
    selectedFile: File | null = null;
    loading = false;

    onFileSelected(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            const file: File = inputElement.files[0];
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    this.profilePicture = e.target.result as string;
                    this.cdr.detectChanges();
                }
            };
            reader.readAsDataURL(file);
        }
    }

    upload(): void {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('profilePicture', this.selectedFile);
            this.profileService
                .uploadProfilePicture(formData)
                .pipe(
                    tap((response) => {
                        showMessageDialog(this.dialog, response.message, 'close');
                        console.log('Profile picture uploaded successfully', response);
                    }),
                    catchError((error) => {
                        console.error('Error uploading profile picture', error);
                        showMessageDialog(this.dialog, error.error.message, 'close');
                        return of(error);
                    }),
                )
                .subscribe();
        } else showMessageDialog(this.dialog, 'Please select a image first!', 'close');
    }

    getUserProfilePicture(): string {
        if (this.image) return `${environment.apiUrl}/${this.image}`;
        return '';
    }
}
