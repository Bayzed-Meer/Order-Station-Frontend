import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from './models/auth-response.model';
import { jwtDecode } from 'jwt-decode';
import { Token } from './models/token.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private API = 'http://localhost:3000';

    private isLoggedIn$ = new BehaviorSubject<boolean>(false);
    private role$ = new BehaviorSubject<string>('');

    signup(formData: FormData): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.API}/auth/signup`, formData);
    }

    signin(formData: FormData): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.API}/auth/signin`, formData, { withCredentials: true })
            .pipe(
                tap((response) => {
                    localStorage.setItem('accessToken', response.accessToken);
                    this.isLoggedIn$.next(true);
                    this.setRole(response.accessToken);
                }),
            );
    }

    signOut(): Observable<void> {
        return this.http.post<void>(`${this.API}/auth/signout`, {}, { withCredentials: true }).pipe(
            tap(() => {
                this.clearUserInfo();
            }),
        );
    }

    resetPassword(formData: FormData): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.API}/auth/reset-password`, formData);
    }

    refreshToken(): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.API}/auth/refresh-token`, {}, { withCredentials: true })
            .pipe(
                tap((response: AuthResponse) => {
                    localStorage.setItem('accessToken', response.accessToken);
                    this.setRole(response.accessToken);
                }),
            );
    }

    isLoggedIn(): Observable<boolean> {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) this.isLoggedIn$.next(true);
        return this.isLoggedIn$.asObservable();
    }

    clearUserInfo(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        this.isLoggedIn$.next(false);
        this.role$.next('');
    }

    getRole(): Observable<string> {
        const role = localStorage.getItem('role');
        this.role$.next(role || '');
        return this.role$.asObservable();
    }

    private setRole(token: string): void {
        const decodedToken: Token = jwtDecode(token);
        const role = decodedToken?.role || '';
        localStorage.setItem('role', role);
        this.role$.next(role);
    }
}
