import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm!: FormGroup;
    errorMessage!: string;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private destroyRef: DestroyRef,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm(): void {
        this.resetPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            currentPassword: ['', Validators.required],
            newPassword: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(32),
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                    ),
                ],
            ],
        });
    }

    onSubmit() {
        this.resetPasswordForm.markAllAsTouched();

        if (this.resetPasswordForm.valid) {
            this.loading = true;
            const formData = { ...this.resetPasswordForm.value };

            this.authService
                .resetPassword(formData)
                .pipe(
                    tap((response) => {
                        this.loading = false;
                        this.showSnackbar(response.message);
                        this.resetPasswordForm.reset();
                    }),
                    catchError((error) => {
                        this.loading = false;
                        this.errorMessage = error.error.message;
                        this.showSnackbar('Error reseting password');
                        console.log(error);
                        return of(error);
                    }),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
    }

    showSnackbar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
        });
    }
}
