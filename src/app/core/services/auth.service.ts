import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private API = 'http://localhost:3000';

    private isLoggedIn$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {}

    signup(formData: FormData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API}/auth/signup`, formData);
    }

    signin(formData: FormData): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.API}/auth/signin`, formData, { withCredentials: true })
            .pipe(
                tap((response) => {
                    this.setAccessToken(response.accessToken);
                    this.isLoggedIn$.next(true);
                }),
            );
    }

    refreshToken(): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API}/auth/refresh-token`, {}).pipe(
            tap((response: AuthResponse) => {
                this.setAccessToken(response.accessToken);
            }),
        );
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedIn$.asObservable();
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    private setAccessToken(accessToken: string): void {
        localStorage.setItem('accessToken', accessToken);
    }
}
