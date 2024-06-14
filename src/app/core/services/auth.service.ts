import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private API = 'http://localhost:3000';

    private isLoggedIn$ = new BehaviorSubject<boolean>(false);
    private role$ = new Subject<string>();

    constructor(private http: HttpClient) {}

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
                    this.role$.next(response.role);
                }),
            );
    }

    signOut(): Observable<void> {
        return this.http.post<void>(`${this.API}/auth/signout`, {}, { withCredentials: true });
    }

    refreshToken(): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.API}/auth/refresh-token`, {})
            .pipe(
                tap((response: AuthResponse) =>
                    localStorage.setItem('accessToken', response.accessToken),
                ),
            );
    }

    isLoggedIn(): Observable<boolean> {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) this.isLoggedIn$.next(true);
        return this.isLoggedIn$.asObservable();
    }

    clearAccessToken(): void {
        localStorage.removeItem('accessToken');
        this.isLoggedIn$.next(false);
        this.role$.next('');
    }

    getRole(): Observable<string> {
        return this.role$.asObservable();
    }
}
