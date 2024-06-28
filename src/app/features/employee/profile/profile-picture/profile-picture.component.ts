import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../../../shared/utils/dialog-utils';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { EmployeeService } from '../../../services/employee.service';

@Component({
    selector: 'app-profile-picture',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, SpinnerComponent],
    templateUrl: './profile-picture.component.html',
    styleUrl: './profile-picture.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePictureComponent {
    private employeeService = inject(EmployeeService);
    private dialog = inject(MatDialog);
    private cdr = inject(ChangeDetectorRef);

    @Input() image!: string;
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
            this.employeeService
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
        if (this.image) {
            return `http://localhost:3000/${this.image}`;
        }
        return '';
    }
}
