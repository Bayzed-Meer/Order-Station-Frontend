import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MealSummary } from '../models/meal-summary.model';
import { BeverageSummary } from '../models/beverage-summary.model';
import { UserProfile } from '../models/user-profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private http = inject(HttpClient);
    private API = environment.apiUrl;

    getAllEmployees(): Observable<UserProfile[]> {
        return this.http.get<UserProfile[]>(`${this.API}/admin/employees/getAllEmployees`);
    }

    deleteEmployee(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(
            `${this.API}/admin/employees/deleteEmployee/${id}`,
        );
    }

    getAllStaffs(): Observable<UserProfile[]> {
        return this.http.get<UserProfile[]>(`${this.API}/admin/staffs/getAllStaffs`);
    }

    deleteStaff(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.API}/admin/staffs/deleteStaff/${id}`);
    }

    getMealSummary(startDate: Date, endDate: Date): Observable<MealSummary[]> {
        const params = new HttpParams()
            .set('startDate', startDate.toISOString())
            .set('endDate', endDate.toISOString());
        return this.http.get<MealSummary[]>(`${this.API}/admin/getMealSummary`, { params });
    }

    getbeverageSummary(startDate: Date, endDate: Date): Observable<BeverageSummary[]> {
        const params = new HttpParams()
            .set('startDate', startDate.toISOString())
            .set('endDate', endDate.toISOString());
        return this.http.get<BeverageSummary[]>(`${this.API}/admin/getBeverageSummary`, { params });
    }
}
