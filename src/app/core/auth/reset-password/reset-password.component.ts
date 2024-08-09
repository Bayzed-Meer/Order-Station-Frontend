import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerComponent,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    resetPasswordForm!: FormGroup;
    loading = false;
    token = '';
    hidePassword = true;
    hideConfirmPassword = true;

    ngOnInit() {
        this.initializeForm();
        this.extractTokenFromUrl();
    }

    initializeForm(): void {
        this.resetPasswordForm = this.formBuilder.group(
            {
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
                confirmPassword: ['', Validators.required],
            },
            { validators: this.passwordMatchValidator() },
        );
    }

    passwordMatchValidator(): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const password = group.get('password')?.value;
            const confirmPassword = group.get('confirmPassword')?.value;

            return password && confirmPassword && password !== confirmPassword
                ? { passwordMismatch: true }
                : null;
        };
    }

    extractTokenFromUrl(): void {
        this.route.queryParams.subscribe((params) => {
            this.token = params['token'];
        });
    }

    onSubmit() {
        this.resetPasswordForm.markAllAsTouched();

        if (this.resetPasswordForm.valid) {
            this.loading = true;
            const formData = { ...this.resetPasswordForm.value, token: this.token };

            delete formData.confirmPassword;

            this.authService
                .resetPassword(formData)
                .pipe(
                    tap(() => {
                        this.loading = false;
                        this.router.navigate(['/signin']);
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

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }
    toggleConfirmPasswordVisibility() {
        this.hideConfirmPassword = !this.hideConfirmPassword;
    }
}
