import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);

    signinForm!: FormGroup;
    errorMessage = '';
    loading = false;

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm(): void {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.signinForm.markAllAsTouched();
        if (this.signinForm.valid) {
            this.loading = true;
            const formData = { ...this.signinForm.value };

            this.authService
                .signin(formData)
                .pipe(
                    tap(() => {
                        this.loading = false;
                        this.router.navigate([`/dashboard`]);
                    }),
                    catchError((error) => {
                        this.loading = false;
                        this.errorMessage = error.error.message;
                        console.error(error);
                        return of(error);
                    }),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
    }
}
