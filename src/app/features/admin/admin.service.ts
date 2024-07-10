import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details.model';
import { MealSummary } from '../models/meal-summary.model';
import { BeverageSummary } from '../models/beverage-summary.model';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private http = inject(HttpClient);
    private API = 'http://localhost:3000';

    getAllEmployees(): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(`${this.API}/admin/employees/getAllEmployees`);
    }

    deleteEmployee(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(
            `${this.API}/admin/employees/deleteEmployee/${id}`,
        );
    }

    getAllStaffs(): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(`${this.API}/admin/staffs/getAllStaffs`);
    }

    deleteStaff(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.API}/admin/staffs/deleteStaff/${id}`);
    }

    getMealSummary(): Observable<MealSummary> {
        return this.http.get<MealSummary>(`${this.API}/admin/getMealSummary`);
    }

    getbeverageSummary(): Observable<BeverageSummary> {
        return this.http.get<BeverageSummary>(`${this.API}/admin/getBeverageSummary`);
    }
}
