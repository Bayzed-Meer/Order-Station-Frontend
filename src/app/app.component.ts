import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { tap } from 'rxjs';
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
}
