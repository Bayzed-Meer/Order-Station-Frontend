import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
    }
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (
                error.status === 401 &&
                error.error.message === 'TokenExpiredError' &&
                !req.url.includes('/auth/refresh-token')
            ) {
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        const newAccessToken = localStorage.getItem('accessToken');
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                            withCredentials: true,
                        });
                        return next(req);
                    }),
                    catchError((refreshError) => {
                        authService
                            .signOut()
                            .pipe(
                                tap(() => {
                                    router.navigate(['signin']);
                                }),
                                catchError((error) => {
                                    console.error('Error during signout', error);
                                    return of(null);
                                }),
                            )
                            .subscribe();
                        return throwError(() => refreshError);
                    }),
                );
            }
            return throwError(() => error);
        }),
    );
};
