import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatSelectModule } from '@angular/material/select';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DailyCheckInService } from '../../services/daily-check-in.service';
import { DailyCheckIn } from '../../../features/models/daily-checkIn.model';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-daily-check-in',
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
    templateUrl: './daily-check-in.component.html',
    styleUrl: './daily-check-in.component.scss',
})
export class DailyCheckInComponent implements OnInit {
    private authService = inject(AuthService);
    private dailyCheckInService = inject(DailyCheckInService);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    checkInForm!: FormGroup;
    currentPreference!: DailyCheckIn;
    loading = false;
    role = '';

    ngOnInit(): void {
        this.checkRole();
        this.getCurrentPreference();
        this.initializeForm();
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
        this.checkInForm = this.formBuilder.group({
            workLocation: ['', Validators.required],
            meal: [{ value: '', disabled: true }, Validators.required],
            snacks: [{ value: '', disabled: true }, Validators.required],
        });

        this.checkInForm.get('workLocation')?.valueChanges.subscribe((value) => {
            this.toggleMealState(value);
        });
    }

    toggleMealState(workLocation: string): void {
        const mealControl = this.checkInForm.get('meal');
        const snacksControl = this.checkInForm.get('snacks');
        if (workLocation === 'wfh' || workLocation === 'leave') {
            mealControl?.disable();
            mealControl?.setValue('');
            snacksControl?.disable();
            snacksControl?.setValue('');
        } else {
            mealControl?.enable();
            snacksControl?.enable();
        }
    }

    getCurrentPreference(): void {
        this.dailyCheckInService
            .getCheckInStatus()
            .pipe(
                tap((response) => {
                    this.currentPreference = response;
                    if (this.currentPreference) this.updateForm();
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

    updateForm(): void {
        if (this.currentPreference) {
            this.checkInForm.patchValue({
                meal: this.currentPreference.meal,
                snacks: this.currentPreference.snacks,
                workLocation: this.currentPreference.workLocation,
            });
            this.toggleMealState(this.currentPreference.workLocation);
        }
    }

    onSubmit(): void {
        this.checkInForm.markAllAsTouched();
        if (this.checkInForm.valid) {
            const formData = { ...this.checkInForm.value };
            if (formData.workLocation === 'wfh' || formData.workLocation === 'leave')
                formData.meal = '';

            this.dailyCheckInService
                .dailyCheckIn(formData)
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
