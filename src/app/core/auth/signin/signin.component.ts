import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        SpinnerComponent,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        RouterLink,
        MatIconModule,
    ],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private dialog = inject(MatDialog);

    signinForm!: FormGroup;
    loading = false;
    role = '';
    hidePassword = true;

    ngOnInit() {
        this.initializeForm();
        this.checkRole();
    }

    initializeForm(): void {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
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
                        this.router.navigate([`/${this.role}`]);
                    }),
                    catchError((error) => {
                        this.loading = false;
                        showMessageDialog(this.dialog, error.error.message, 'close');
                        console.error(error);
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
}
