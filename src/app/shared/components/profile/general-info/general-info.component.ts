import {
    Component,
    DestroyRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    inject,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { showMessageDialog } from '../../../../shared/utils/dialog-utils';
import { ProfileService } from '../../../services/profile.service';
import { UserProfile } from '../../../../features/models/user-profile.model';

@Component({
    selector: 'app-general-info',
    standalone: true,
    imports: [ReactiveFormsModule, SpinnerComponent, MatSelectModule],
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit, OnChanges {
    private profileService = inject(ProfileService);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    @Input() userProfile!: UserProfile;
    generalInfoForm!: FormGroup;
    loading = false;

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userProfile'] && changes['userProfile'].currentValue) {
            this.updateForm();
        }
    }

    initializeForm(): void {
        this.generalInfoForm = this.formBuilder.group({
            username: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            contactNumber: ['', Validators.required],
            id: [{ value: '', disabled: true }],
            SBU: ['', Validators.required],
            jobTitle: ['', Validators.required],
            meal: ['', Validators.required],
        });
        if (this.userProfile) this.updateForm();
    }

    updateForm(): void {
        this.generalInfoForm.patchValue({
            username: this.userProfile.username,
            email: this.userProfile.email,
            id: this.userProfile.id,
            contactNumber: this.userProfile.contactNumber,
            SBU: this.userProfile.SBU,
            jobTitle: this.userProfile.jobTitle,
            meal: this.userProfile.meal,
        });
    }

    onSubmit() {
        this.generalInfoForm.markAllAsTouched();

        if (this.generalInfoForm.valid) {
            this.loading = true;
            const formData = { ...this.generalInfoForm.value };

            this.profileService
                .updateUserProfile(formData)
                .pipe(
                    tap((response) => {
                        this.loading = false;
                        showMessageDialog(this.dialog, response.message, 'close');
                    }),
                    catchError((error) => {
                        this.loading = false;
                        showMessageDialog(this.dialog, error.error.message, 'close');
                        console.log(error);
                        return of(error);
                    }),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
    }
}
