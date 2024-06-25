import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { DashboardComponent } from '../../../features/admin/dashboard/dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        DashboardComponent,
        MatExpansionModule,
        RouterLink,
        RouterOutlet,
        ConfirmDialogComponent,
    ],
})
export class NavigationComponent implements OnInit {
    private breakpointObserver = inject(BreakpointObserver);
    private authService = inject(AuthService);
    private router = inject(Router);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    role = '';

    ngOnInit(): void {
        this.checkRole();
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

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay(),
    );

    signout(): void {
        this.authService
            .signOut()
            .pipe(
                tap(() => {
                    this.router.navigate(['/signin']);
                }),
                catchError((error) => {
                    console.error('Error during signout', error);
                    return of(null);
                }),
            )
            .subscribe();
    }

    confirmSignoutPopUp(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: 'Are you sure you want to sign out?',
                confirmButtonLabel: 'Sign Out',
                cancelButtonLabel: 'Cancel',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirm') {
                this.signout();
            }
        });
    }
}
