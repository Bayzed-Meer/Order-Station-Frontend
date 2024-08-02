import {
    Component,
    DestroyRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    inject,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { showMessageDialog } from '../../../../shared/utils/dialog-utils';
import { ProfileService } from '../../../services/profile.service';
import { UserProfile } from '../../../../features/models/user-profile.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/auth.service';

@Component({
    selector: 'app-general-info',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit, OnChanges {
    private profileService = inject(ProfileService);
    private authService = inject(AuthService);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    @Input() userProfile!: UserProfile;
    generalInfoForm!: FormGroup;
    role = '';
    loading = false;

    ngOnInit(): void {
        this.initializeForm();
        this.checkRole();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userProfile'] && changes['userProfile'].currentValue) this.updateForm();
    }

    checkRole(): void {
        this.authService
            .getRole()
            .pipe(
                tap((role) => (this.role = role)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    initializeForm(): void {
        this.generalInfoForm = this.formBuilder.group({
            username: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            contactNumber: ['', Validators.required],
            id: [{ value: '', disabled: true }],
            SBU: ['', Validators.required],
            jobTitle: ['', Validators.required],
            clientInfo: ['', Validators.required],
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
            clientInfo: this.userProfile.clientInfo,
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
