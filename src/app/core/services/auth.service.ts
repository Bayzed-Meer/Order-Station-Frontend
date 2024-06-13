import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private API: string = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    signup(formData: FormData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API}/auth/signup`, formData);
    }
}
