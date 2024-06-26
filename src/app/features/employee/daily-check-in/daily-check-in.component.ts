import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DailyCheckIn } from '../models/daily-checkIn.model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatSelectModule } from '@angular/material/select';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-daily-check-in',
    standalone: true,
    imports: [ReactiveFormsModule, SpinnerComponent, MatSelectModule],
    templateUrl: './daily-check-in.component.html',
    styleUrl: './daily-check-in.component.scss',
})
export class DailyCheckInComponent implements OnInit {
    private employeeService = inject(EmployeeService);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    checkInForm!: FormGroup;
    loading = false;
    currentPreference!: DailyCheckIn;

    ngOnInit(): void {
        this.getCurrentPreference();
        this.initializeForm();
    }

    initializeForm(): void {
        this.checkInForm = this.formBuilder.group({
            workLocation: ['', Validators.required],
            mealPreference: [{ value: '', disabled: true }, Validators.required],
        });

        this.checkInForm.get('workLocation')?.valueChanges.subscribe((value) => {
            this.toggleMealPreferenceState(value);
        });
    }

    toggleMealPreferenceState(workLocation: string): void {
        const mealPreferenceControl = this.checkInForm.get('mealPreference');
        if (workLocation === 'wfh' || workLocation === 'leave') {
            mealPreferenceControl?.disable();
            mealPreferenceControl?.setValue('');
        } else {
            mealPreferenceControl?.enable();
        }
    }

    getCurrentPreference(): void {
        this.employeeService
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
                mealPreference: this.currentPreference.mealPreference,
                workLocation: this.currentPreference.workLocation,
            });
            this.toggleMealPreferenceState(this.currentPreference.workLocation);
        }
    }

    onSubmit(): void {
        if (this.checkInForm.valid) {
            const formData = { ...this.checkInForm.value };
            if (formData.workLocation === 'wfh' || formData.workLocation === 'leave')
                formData.mealPreference = '';

            this.employeeService
                .checkIn(formData)
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
