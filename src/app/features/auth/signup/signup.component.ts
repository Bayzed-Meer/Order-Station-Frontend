import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
    signupForm!: FormGroup;
    errorMessage!: string;
    loading: boolean = false;

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
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [
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
            role: ['', Validators.required],
        });
    }

    onSubmit() {
        this.markFormGroupTouched(this.signupForm);

        if (this.signupForm.valid) {
            this.loading = true;
            const formData = { ...this.signupForm.value };

            this.authService
                .signup(formData)
                .pipe(
                    tap((response) => {
                        this.loading = false;
                        this.showSnackbar(response.message);
                        this.signupForm.reset();
                    }),
                    catchError((error) => {
                        this.loading = false;
                        this.errorMessage = error.error.message;
                        this.showSnackbar('Error creating account');
                        console.log(error);
                        return of(error);
                    }),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
    }

    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    showSnackbar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
        });
    }
}
