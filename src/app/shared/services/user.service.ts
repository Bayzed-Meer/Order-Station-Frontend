import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
    private API = 'http://localhost:3000';

    getUserProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.API}/user/profile`);
    }

    uploadProfilePicture(formData: FormData): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(
            `${this.API}/user/upload/profile-picture`,
            formData,
        );
    }

    updateUserProfile(formData: FormData): Observable<{ message: string }> {
        return this.http.patch<{ message: string }>(`${this.API}/user/updateProfile`, formData);
    }
}
