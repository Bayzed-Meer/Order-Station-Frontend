import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
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

@Component({
    selector: 'app-change-password',
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
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);

    changePasswordForm!: FormGroup;
    loading = false;
    role = '';
    hideCurrentPassword = true;
    hideNewPassword = true;

    ngOnInit() {
        this.checkRole();
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
        this.changePasswordForm = this.formBuilder.group({
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
        this.changePasswordForm.markAllAsTouched();

        if (this.changePasswordForm.valid) {
            this.loading = true;
            const formData = { ...this.changePasswordForm.value };

            this.authService
                .changePassword(formData)
                .pipe(
                    tap((response) => {
                        this.loading = false;
                        showMessageDialog(this.dialog, response.message, 'close');
                        this.changePasswordForm.reset();
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

    toggleCurrentPasswordVisibility() {
        this.hideCurrentPassword = !this.hideCurrentPassword;
    }
    toggleNewPasswordVisibility() {
        this.hideNewPassword = !this.hideNewPassword;
    }
}
