import {
    Component,
    DestroyRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    inject,
} from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../utils/dialog-utils';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-general-info',
    standalone: true,
    imports: [ReactiveFormsModule, SpinnerComponent, MatSelectModule],
    templateUrl: './general-info.component.html',
    styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit, OnChanges {
    private userService = inject(UserService);
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
            this.updateFormFields();
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
            mealPreferences: ['', Validators.required],
        });
        if (this.userProfile) this.updateFormFields();
    }

    updateFormFields(): void {
        this.generalInfoForm.patchValue({
            username: this.userProfile.username,
            email: this.userProfile.email,
            id: this.userProfile.id,
            contactNumber: this.userProfile.contactNumber,
            SBU: this.userProfile.SBU,
            jobTitle: this.userProfile.jobTitle,
            mealPreferences: this.userProfile.mealPreferences,
        });
    }

    onSubmit() {
        this.generalInfoForm.markAllAsTouched();

        if (this.generalInfoForm.valid) {
            this.loading = true;
            const formData = { ...this.generalInfoForm.value };

            this.userService
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
