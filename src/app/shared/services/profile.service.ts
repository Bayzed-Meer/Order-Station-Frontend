import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../features/models/user-profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private http = inject(HttpClient);
    private API = environment.apiUrl;

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
