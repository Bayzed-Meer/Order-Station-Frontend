import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../employee/models/user-details.model';

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
}
