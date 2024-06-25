import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './core/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoggedIn = false;

    role = '';

    ngOnInit(): void {
        this.checkRole();
        this.checkLoggedInStatus();
        if (!this.isLoggedIn) this.router.navigate(['/signin']);
        else if (this.role === 'admin') this.router.navigate([`/admin`]);
        else this.router.navigate(['/employee']);
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
    checkLoggedInStatus(): void {
        this.authService
            .isLoggedIn()
            .pipe(
                tap((status) => (this.isLoggedIn = status)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }
}
