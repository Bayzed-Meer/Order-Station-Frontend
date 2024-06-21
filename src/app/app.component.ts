import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './core/services/auth.service';

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

    ngOnInit(): void {
        this.checkLoggedInStatus();
        if (!this.isLoggedIn) this.router.navigate(['/signin']);
        else this.router.navigate([`/dashboard`]);
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
