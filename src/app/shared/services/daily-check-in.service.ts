import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyCheckIn } from '../../features/models/daily-checkIn.model';

@Injectable({
    providedIn: 'root',
})
export class DailyCheckInService {
    private http = inject(HttpClient);
    private API = 'http://localhost:3000';

    dailyCheckIn(formData: FormData): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.API}/user/checkin`, formData);
    }

    getCheckInStatus(): Observable<DailyCheckIn> {
        return this.http.get<DailyCheckIn>(`${this.API}/user/checkIn-status`);
    }
}
