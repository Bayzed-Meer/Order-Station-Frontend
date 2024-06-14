import { Component, DestroyRef, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    isLoggedIn = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.checkLoggedInStatus();
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

    signOut(): void {
        this.authService
            .signOut()
            .pipe(
                tap(() => {
                    this.authService.clearAccessToken();
                    this.router.navigate(['signin']);
                }),
                catchError((error) => {
                    console.error('Error during signout', error);
                    return of(null);
                }),
            )
            .subscribe();
    }
}
