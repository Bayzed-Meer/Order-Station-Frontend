import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const accessToken = authService.getAccessToken();

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
                (error.status === 401 || error.status === 403) &&
                !req.url.includes('/auth/refresh-token')
            ) {
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        const newAccessToken = authService.getAccessToken();
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                            withCredentials: true,
                        });
                        return next(req);
                    }),
                    catchError((refreshError) => {
                        authService.signOut();
                        return throwError(() => refreshError);
                    }),
                );
            }
            return throwError(() => error);
        }),
    );
};
