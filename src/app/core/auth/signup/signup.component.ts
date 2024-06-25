import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, MatSelectModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);

    signupForm!: FormGroup;
    loading = false;

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm(): void {
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            id: ['', Validators.required],
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
        this.signupForm.markAllAsTouched();

        if (this.signupForm.valid) {
            this.loading = true;
            const formData = { ...this.signupForm.value };

            this.authService
                .signup(formData)
                .pipe(
                    tap((response) => {
                        this.loading = false;
                        showMessageDialog(this.dialog, response.message, 'close');
                        this.signupForm.reset();
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
