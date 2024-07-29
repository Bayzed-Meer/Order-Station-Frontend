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
import { showMessageDialog } from '../../utils/dialog-utils';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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

    resetPasswordForm!: FormGroup;
    loading = false;
    role = '';

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
                        showMessageDialog(this.dialog, response.message, 'close');
                        this.resetPasswordForm.reset();
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
