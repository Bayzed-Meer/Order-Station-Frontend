import { Component, DestroyRef, OnInit } from '@angular/core';
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
    signinForm!: FormGroup;
    errorMessage = '';
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private destroyRef: DestroyRef,
    ) {}

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
                        const role = localStorage.getItem('role');
                        this.router.navigate([`${role}-dashboard/dashboard`]);
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
